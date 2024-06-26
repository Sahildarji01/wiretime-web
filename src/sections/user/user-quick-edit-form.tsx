import axios from 'axios'; 
import * as Yup from 'yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import { IUserItem } from 'src/types/user';

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentUser?: IUserItem;
  editable?: boolean;
};

export default function UserQuickEditForm({ currentUser, open, onClose, editable = false }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    taskName: Yup.string().required('Task Name is required'),
    description: Yup.string().required('Description is required'),
    note: Yup.string().required('Note is required'),
    estimatedTime: Yup.string().required('Estimated Time is required'),
    startDate: Yup.string().required('Start Date is required'),
    startTime: Yup.string().required('Start Time is required'),
    endDate: Yup.string().required('End Date is required'),
    endTime: Yup.string().required('End Time is required'),
    createdBy: Yup.string().required('Creator is required'),
    ownedBy: Yup.string().required('Owner is required'),
    managedBy: Yup.string().required('Manager is required'),
    executedBy: Yup.string().required('Executer is required'),
  });

  const defaultValues = useMemo(
    () => ({
      taskName: currentUser?.name || '',
      description: currentUser?.description || '',
      note: currentUser?.note || '',
      estimatedTime: currentUser?.estimatedTime || '',
      startDate: currentUser?.startDate ? new Date(currentUser.startDate).toISOString().split('T')[0] : '',
      startTime: currentUser?.startTime || '',
      endDate: currentUser?.endDate ? new Date(currentUser.endDate).toISOString().split('T')[0] : '',
      endTime: currentUser?.endTime || '',
      createdBy: currentUser?.createdBy || '',
      ownedBy: currentUser?.ownedBy || '',
      managedBy: currentUser?.managedBy || '',
      executedBy: currentUser?.executedBy || '',
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!currentUser || !currentUser.aiId) {
        throw new Error('Task ID is missing or invalid');
      }

      const { aiId } = currentUser;

      await axios.patch(`https://wiretime-api-drimossgwq-uc.a.run.app/planned-ai/action-item/update/${aiId}`, {
        ...data,
      });

      reset();
      onClose();
      enqueueSnackbar('Update success!');
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Update failed!', { variant: 'error' });
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>{editable ? 'Edit Task' : 'View Task'}</DialogTitle>

        <DialogContent>
        <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
            sx={{
              '& .MuiTextField-root': { mt: 2 }
            }}
          >
            <RHFTextField name="taskName" label="Task Name" InputProps={{ readOnly: !editable }} />
            <RHFTextField name="description" label="Description" InputProps={{ readOnly: !editable }} />
            <RHFTextField name="note" label="Notes" InputProps={{ readOnly: !editable }} />
            <RHFTextField name="estimatedTime" label="Estimated Time" InputProps={{ readOnly: !editable }} />
            <RHFTextField
              name="startDate"
              label="Start Date"
              type="date"
              InputProps={{ readOnly: !editable }}
            />
            <RHFTextField
              name="endDate"
              label="End Date"
              type="date"
              InputProps={{ readOnly: !editable }}
            />
            <RHFTextField
              name="startTime"
              label="Start Time"
              type="time"
              InputProps={{ readOnly: !editable }}
            />
            <RHFTextField
              name="endTime"
              label="End Time"
              type="time"
              InputProps={{ readOnly: !editable }}
            />
            <RHFTextField name="createdBy" label="Creator" InputProps={{ readOnly: !editable }} />
            <RHFTextField name="ownedBy" label="Owner" InputProps={{ readOnly: !editable }} />
            <RHFTextField name="managedBy" label="Manager" InputProps={{ readOnly: !editable }} />
            <RHFTextField name="executedBy" label="Executer" InputProps={{ readOnly: !editable }} />
          </Box>
        </DialogContent>

        <DialogActions>
          {editable ? (
            <>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" onClick={onSubmit}>
                {isSubmitting ? <CircularProgress size={24} /> : 'Save Changes'}
              </Button>
            </>
          ) : (
            <Button variant="outlined" onClick={onClose}>
              Exit
            </Button>
          )}
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
