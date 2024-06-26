import { Helmet } from 'react-helmet-async';

import { UserListView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function UserListPage() {
  return (
    <>
      <Helmet>
        <title> View Task</title>
      </Helmet>

      <UserListView />
    </>
  );
}
  