// import * as React from 'react';

import Container from '@mui/material/Container';

// import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import UserNewEditForm from '../create-task';

// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';

export default function TaskView() {
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create Task"
        links={[
        //   {
        //     name: 'Dashboard',
        //     href: paths.dashboard.root,
        //   },
          {
            name: 'Task',
            // href: paths.dashboard.user.root,
          },
          { name: 'Create Task' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <UserNewEditForm />
      
    </Container>
  );
}
