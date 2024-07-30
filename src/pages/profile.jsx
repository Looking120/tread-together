import { Helmet } from 'react-helmet-async';

import { ProfilesView } from '../sections/profile/view';

// ----------------------------------------------------------------------

export default function ProfilePage() {
  return (
    <>
      <Helmet>
        <title> Profile  </title>
      </Helmet>

      <ProfilesView />
    </>
  );
}
