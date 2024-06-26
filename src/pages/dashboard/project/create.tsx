import { Helmet } from 'react-helmet-async';

import { CreateProjectView } from 'src/sections/CreateProject/view';

// ----------------------------------------------------------------------

export default function CreateProjectPage() {
  return (
    <>
      <Helmet>
        <title> Create Project: Project</title>
      </Helmet>

      <CreateProjectView />
    </>
  );
}