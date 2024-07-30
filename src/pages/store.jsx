import { Helmet } from 'react-helmet-async';

import { StoreView } from '../sections/store/view';

// ----------------------------------------------------------------------

export default function StorePage() {
  return (
    <>
      <Helmet>
        <title> Store </title>
      </Helmet>

      <StoreView />
    </>
  );
}
