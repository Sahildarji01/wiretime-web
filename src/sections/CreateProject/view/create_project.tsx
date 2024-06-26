import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import UserNewEditForm from '../project-new-edit-form';

export default function CreateProjectView() {
  const LevelId=new URLSearchParams(window.location.search).get('LevelId')||'';
      const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
    <CustomBreadcrumbs
      heading="Create Project"
      links={[
        {
          name: 'Project',
          href: paths.dashboard.project.root,
        },
        {
          name: 'Create Project',
          href: paths.dashboard.project.create,
        },
        // { name: 'New' },
      ]}
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    />

    <UserNewEditForm levelId={LevelId} />
  
  </Container>
  );
}





