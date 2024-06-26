import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

interface FormData {
  title: string;
  description: string;
  notes: string;
  estimatedtime: string;
  executor: string;
  manager: string;
  creator: string;
  owner: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

const UserNewEditForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [users, setUsers] = useState([]);

  const NewUserSchema = Yup.object().shape({
    title: Yup.string().required('Task title is required'),
    description: Yup.string().required('Task description is required'),
    notes: Yup.string().required('Notes are required'),
    estimatedtime: Yup.string().required('Estimated time is required'),
    executor: Yup.string().required('Executor is required'),
    manager: Yup.string().required('Manager is required'),
    creator: Yup.string().required('Creator is required'),
    owner: Yup.string().required('Owner is required'),
    startDate: Yup.string().nullable().required('Start date is required'),
    endDate: Yup.string().nullable().required('End date is required'),
    startTime: Yup.string().nullable().required('Start time is required'),
    endTime: Yup.string().nullable().required('End time is required'),
  });

  const defaultValues = useMemo<FormData>(
    () => ({
      title: '',
      notes: '',
      description: '',
      estimatedtime: '',
      executor: '',
      manager: '',
      creator: sessionStorage.getItem('userEmail') || '',
      owner: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
    }),
    []
  );

  const methods = useForm<FormData>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const { reset, handleSubmit, register, setValue, formState: { isSubmitting } } = methods;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://wiretime-api-drimossgwq-uc.a.run.app/account/get-user', {
          headers: {
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
          },
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        enqueueSnackbar(`Failed to fetch users: ${error.message}`, { variant: 'error' });
      }
    };

    fetchUsers();
  }, [enqueueSnackbar]);

  const onSubmit = handleSubmit(async (data: FormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const postData = {
        clientId: '',
        aiId: 0,
        name: data.title,
        description: data.description,
        note: data.notes,
        estimatedTime: data.estimatedtime,
        startDate: data.startDate,
        startTime: `${data.startTime}:00`,
        endDate: data.endDate,
        endTime: `${data.endTime}:00`,
        createdBy: data.creator,
        ownedBy: data.owner,
        executedBy: data.executor,
        managedBy: data.manager,
        state: 'NOT_STARTED',
        status: null,
      };

      console.log('Request Data:', JSON.stringify(postData, null, 2));

      const response = await fetch(
        'https://wiretime-api-drimossgwq-uc.a.run.app/planned-ai/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
          },
          body: JSON.stringify(postData),
        }
      );

      const contentType = response.headers.get('content-type');

      if (response.ok) {
        const responseData = contentType && contentType.includes('application/json')
          ? await response.json()
          : await response.text();

        console.log('API Response:', responseData);

        reset();
        enqueueSnackbar('Task created successfully', { variant: 'success' });
      } else {
        const errorData = contentType && contentType.includes('application/json')
          ? await response.json()
          : await response.text();

        console.error('API Response Error:', errorData);
        enqueueSnackbar(`Failed to create task: ${errorData}`, { variant: 'error' });
      }
    } catch (error) {
      console.error('API Error:', error.message);
      enqueueSnackbar(`Failed to create task: ${error.message}`, { variant: 'error' });
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <TextField {...register('title')} label="Title" required />
              <TextField {...register('estimatedtime')} label="Estimated Time in Minutes" inputMode='numeric' inputProps={{ maxLength: 3 }} required />
              <TextField {...register('description')} label="Description" rows={5} multiline required />
              <TextField {...register('notes')} label="Notes" rows={5} multiline required />
              <TextField {...register('startDate')} label="Start Date" type="date" InputLabelProps={{ shrink: true }} required />
              <TextField {...register('endDate')} label="End Date" type="date" InputLabelProps={{ shrink: true }} required />
              <TextField {...register('startTime')} label="Start Time" type="time" InputLabelProps={{ shrink: true }} required />
              <TextField {...register('endTime')} label="End Time" type="time" InputLabelProps={{ shrink: true }} required />
              
              {(['owner', 'manager', 'executor'] as Array<keyof FormData>).map(field => (
  <FormControl key={field} fullWidth required>
    <InputLabel>{field.charAt(0).toUpperCase() + field.slice(1)}</InputLabel>
    <Select
      {...register(field)}
      label={field.charAt(0).toUpperCase() + field.slice(1)}
      defaultValue=""
    >
      {users.map((user: any) => (
        <MenuItem key={user.userId} value={user.userId}>{user.userName}</MenuItem>
      ))}
    </Select>
  </FormControl>
))}

            </Box>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <Button variant="outlined" type="submit" disabled={isSubmitting}>
                Create Task
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserNewEditForm;

