// import axios from 'axios';
// import * as Yup from 'yup';
// import { useMemo } from 'react';
// import { useSnackbar } from 'notistack';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';

// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Grid from '@mui/material/Unstable_Grid2';
// import TextField from '@mui/material/TextField';

// import { paths } from 'src/routes/paths';
// import { useRouter } from 'src/routes/hooks';


// interface UserNewEditFormProps {
//   levelId: string;
// }

// // Disable ESLint prop-types check because we are using TypeScript
// // eslint-disable-next-line react/prop-types
// const UserNewEditForm: React.FC<UserNewEditFormProps> = ({ levelId}) => {
//   const { enqueueSnackbar } = useSnackbar();
//   const router = useRouter();

//   const NewUserSchema = Yup.object().shape({
//     label: Yup.string().required('Label Name is required'),
//     title: Yup.string().required('Title is required'),
//     description: Yup.string().required('Description is required'),
//     notes: Yup.string().required('Notes are required'),
//     estimatedTime: Yup.string().required('Estimated Time is required'),
//     startDate: Yup.string().required('Start Date is required'),
//     endDate: Yup.string().required('End Date is required'),
//     startTime: Yup.string().required('Start Time is required'),
//     endTime: Yup.string().required('End Time is required'),
//     owner: Yup.string().required('Owner is required'),
//     manager: Yup.string().required('Manager is required'),
//     executor: Yup.string().required('Executor is required'),
//     creator: Yup.string().required('Creator is required'),
//   });

//   const defaultValues = useMemo(
//     () => ({
//       label: '',
//       title: '',
//       description: '',
//       notes: '',
//       estimatedTime: '',
//       startDate: '',
//       endDate: '',
//       startTime: '',
//       endTime: '',
//       owner: '',
//       manager: '',
//       executor: '',
//       creator: '',
//     }),
//     []
//   );

//   const methods = useForm({
//     resolver: yupResolver(NewUserSchema),
//     defaultValues,
//   });

//   const { reset, handleSubmit, register, formState: { isSubmitting } } = methods;

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 500));

//       const postData = {
//         levelId: 0,
//         clientId: 'string',
//         name: data.title,
//         description: data.description,
//         note: data.notes,
//         status: null,
//         state: null,
//         depth: 0,
//         rootActionItemId: levelId,
//         parentActionItemId: levelId,
//         actionItemLabel: data.label,
//         estimatedTimeTaken: data.estimatedTime,
//         estimatedStartDate: data.startDate,
//         estimatedStartTime: data.startTime,
//         estimatedEndDate: data.endDate,
//         estimatedEndTime: data.endTime,
//         ownedBy: data.owner,
//         executedBy: data.executor,
//         managedBy: data.manager,
//         createdBy: data.creator
//       };

//       console.log('Request Data:', postData);

//       const response = await axios.post(
//         'https://wiretime-api-drimossgwq-uc.a.run.app/project/',
//         postData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer YOUR_ACCESS_TOKEN'  // Replace with actual token
//           },
//         }
//       );

//       console.log('API Response:', response.data);

//       reset();
//       enqueueSnackbar('Project created successfully', { variant: 'success' });
//       router.push(`${paths.dashboard.project.view}`);

//     } catch (error) {
//       console.error('API Error:', error.response ? error.response.data : error.message);
//       if (error.response && error.response.status === 403) {
//         enqueueSnackbar('You do not have permission to create a project. Please check your credentials and permissions.', { variant: 'error' });
//       } else {
//         enqueueSnackbar('Failed to create project', { variant: 'error' });
//       }
//     }
//   });
//   return (
//     <form onSubmit={onSubmit} >
//       <Grid container spacing={2}>
//         <Grid xs={12} md={12}>
//           <Card sx={{ p: 3 }}>
//             <Box
//               rowGap={3}
//               columnGap={2}
//               display="grid"
//               gridTemplateColumns={{
//                 xs: 'repeat(1, 1fr)',
//                 sm: 'repeat(2, 1fr)',
//               }}
//             >
//               <TextField {...register('label')} label="Label name" required />
//               <TextField {...register('title')} label="Title" required />
//               <TextField {...register('description')} label="Description" rows={5} multiline required />
//               <TextField {...register('notes')} label="Notes" rows={5} multiline required />
//               <TextField {...register('estimatedTime')} label="Estimated Time in Minutes" inputMode='numeric' required />
//               <TextField {...register('startDate')} label="Start Date" type="date" InputLabelProps={{ shrink: true }} required />
//               <TextField {...register('endDate')} label="End Date" type="date" InputLabelProps={{ shrink: true }} required />
//               <TextField {...register('startTime')} label="Start Time" type="time" InputLabelProps={{ shrink: true }} required />
//               <TextField {...register('endTime')} label="End Time" type="time" InputLabelProps={{ shrink: true }} required />
//               <TextField {...register('owner')} label="Owner" required />
//               <TextField {...register('manager')} label="Manager" required />
//               <TextField {...register('executor')} label="Executor" required />
//               <TextField {...register('creator')} label="Creator" required />
           
//             </Box>
//             <Stack alignItems="flex-end" sx={{ mt: 3 }}>
//               <Button variant="outlined" type="submit" disabled={isSubmitting}>
//                 Create Project
//               </Button>
//             </Stack>
//           </Card>
//         </Grid>
//       </Grid>
//     </form>
//   );
// };

// export default UserNewEditForm;
import axios from 'axios';
import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { FieldName, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

interface UserNewEditFormProps {
  levelId: string;
}

// Disable ESLint prop-types check because we are using TypeScript
// eslint-disable-next-line react/prop-types
const UserNewEditForm: React.FC<UserNewEditFormProps> = ({ levelId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [users, setUsers] = useState([]);

  const NewUserSchema = Yup.object().shape({
    label: Yup.string().required('Label Name is required'),
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    notes: Yup.string().required('Notes are required'),
    estimatedTime: Yup.string().required('Estimated Time is required'),
    startDate: Yup.string().required('Start Date is required'),
    endDate: Yup.string().required('End Date is required'),
    startTime: Yup.string().required('Start Time is required'),
    endTime: Yup.string().required('End Time is required'),
    owner: Yup.string().required('Owner is required'),
    manager: Yup.string().required('Manager is required'),
    executor: Yup.string().required('Executor is required'),
    creator: Yup.string().required('Creator is required'),
  });

  const defaultValues = useMemo(
    () => ({
      label: '',
      title: '',
      description: '',
      notes: '',
      estimatedTime: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      owner: '',
      manager: '',
      executor: '',
      creator: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const { reset, handleSubmit, register, setValue, formState: { isSubmitting } } = methods;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://wiretime-api-drimossgwq-uc.a.run.app/account/get-user', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN',  // Replace with actual token
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        enqueueSnackbar(`Failed to fetch users: ${error.message}`, { variant: 'error' });
      }
    };

    fetchUsers();
  }, [enqueueSnackbar]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const postData = {
        levelId: 0,
        clientId: 'string',
        name: data.title,
        description: data.description,
        note: data.notes,
        status: null,
        state: null,
        depth: 0,
        rootActionItemId: levelId,
        parentActionItemId: levelId,
        actionItemLabel: data.label,
        estimatedTimeTaken: data.estimatedTime,
        estimatedStartDate: data.startDate,
        estimatedStartTime: data.startTime,
        estimatedEndDate: data.endDate,
        estimatedEndTime: data.endTime,
        ownedBy: data.owner,
        executedBy: data.executor,
        managedBy: data.manager,
        createdBy: data.creator
      };

      console.log('Request Data:', postData);

      const response = await axios.post(
        'https://wiretime-api-drimossgwq-uc.a.run.app/project/',
        postData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN'  // Replace with actual token
        },
      });

      console.log('API Response:', response.data);

      reset();
      enqueueSnackbar('Project created successfully', { variant: 'success' });
      router.push(`${paths.dashboard.project.view}`);

    } catch (error) {
      console.error('API Error:', error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 403) {
        enqueueSnackbar('You do not have permission to create a project. Please check your credentials and permissions.', { variant: 'error' });
      } else {
        enqueueSnackbar('Failed to create project', { variant: 'error' });
      }
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
              <TextField {...register('label')} label="Label name" required />
              <TextField {...register('title')} label="Title" required />
              <TextField {...register('description')} label="Description" rows={5} multiline required />
              <TextField {...register('notes')} label="Notes" rows={5} multiline required />
              <TextField {...register('estimatedTime')} label="Estimated Time in Minutes" inputMode='numeric' inputProps={{ maxLength: 3 }} required />
              <TextField {...register('startDate')} label="Start Date" type="date" InputLabelProps={{ shrink: true }} required />
              <TextField {...register('endDate')} label="End Date" type="date" InputLabelProps={{ shrink: true }} required />
              <TextField {...register('startTime')} label="Start Time" type="time" InputLabelProps={{ shrink: true }} required />
              <TextField {...register('endTime')} label="End Time" type="time" InputLabelProps={{ shrink: true }} required />
              
               {['owner', 'manager', 'executor', 'creator'].map((field: FieldName) => (
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
                Create Project
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserNewEditForm;




