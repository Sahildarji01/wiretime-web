// import React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
// import ListItemText from '@mui/material/ListItemText';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import { IUserItem } from 'src/types/user';

import TaskStatusButtons from './status-button';
import UserQuickEditForm from './user-quick-edit-form';

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  row: IUserItem;
  onSelectRow: VoidFunction;
};

// interface UserTableData {
//   aiId: string;
//   name: string;
//   description: string;
//   note: string;
//   estimatedTime: string;
//   // startDate: string;
//   // startTime: string;
//   // endDate: string;
//   // endTime: string;
//   createdBy: string;
//   ownedBy: string;
//   // executedBy: string;
//   managedBy: string;
// }

export default function UserTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
}: Props) {
  // const { name , aiId,description,startDate,startTime,endDate,endTime,note,estimatedTime,createdBy,executedBy,ownedBy,managedBy} = row;
  const {name,description,aiId} = row;
  const confirm = useBoolean();
  const quickEdit = useBoolean();
  // const editTask = useBoolean();
  const popover = usePopover();

  // const handleEditTask = () => {
  //   editTask.onTrue();
  //   onEditRow();
  // };

  return (
    <>
      <TableRow hover selected={selected}>
      <TableCell>{name}</TableCell>
      <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{description}</TableCell>
        {/* <TableCell>{ownedBy}</TableCell> */}
        {/* <TableCell>{createdBy}</TableCell> */}
        {/* <TableCell colSpan={5}>
          <TaskStatusButtons />
        </TableCell> */}
        {/* <TableCell>{endDate}</TableCell>
        <TableCell>{endTime}</TableCell>
        <TableCell>{startDate}</TableCell>
        <TableCell>{startTime}</TableCell>
        <TableCell>{estimatedTime}</TableCell>
        <TableCell>{startTime}</TableCell>
        <TableCell>{createdBy}</TableCell>
        <TableCell>{managedBy}</TableCell>
        <TableCell>{ownedBy}</TableCell> */}
        {/* <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <ListItemText
            // primary={name}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </TableCell> */}
        <TableCell colSpan={5}>
          <TaskStatusButtons aiId={aiId} />
        </TableCell>
        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="View Task" placement="top" arrow >
            <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
              {/* <Iconify icon="solar:pen-bold" /> */}
              <VisibilityIcon />
            </IconButton>
          </Tooltip>

          {/* <Tooltip title="Edit Task" placement="top" arrow>
            <IconButton color={editTask.value ? 'inherit' : 'default'} onClick={editTask.onTrue}>
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete Task" placement="top" arrow>
            <IconButton color="error" onClick={confirm.onTrue}>
              <DeleteIcon />
            </IconButton>
          </Tooltip> */}

          {/* <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton> */}
        </TableCell>
      </TableRow>

      {/* <UserQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} /> */}
      <UserQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} editable={false} />
      {/* <UserQuickEditForm currentUser={row} open={editTask.value} onClose={editTask.onFalse} editable={true} /> */}
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error">
            Delete
          </Button>
        }
      />
    </>
  );
}
