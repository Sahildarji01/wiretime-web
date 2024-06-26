import { Helmet } from 'react-helmet-async';

import { ShowProjectView } from 'src/sections/CreateProject/view';

// ----------------------------------------------------------------------

export default function ShowProjectPage() {
  return (
    <>
      <Helmet>
        <title> View Project: Project</title>
      </Helmet>

      <ShowProjectView />
    </>
  );
}