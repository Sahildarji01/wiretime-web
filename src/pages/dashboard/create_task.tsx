import { Helmet } from 'react-helmet-async';

import { TaskView } from '../../sections/CreateTask/view';

// ----------------------------------------------------------------------

export default function CreateTaskPage() {
  return (
    <>
      <Helmet>
        <title> Create Task</title>
      </Helmet>

      <TaskView />
    </>
  );
}
