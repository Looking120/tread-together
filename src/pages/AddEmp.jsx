import { Helmet } from 'react-helmet-async';

import { AddEmployeeView} from '../sections/employeeAdd';

// ----------------------------------------------------------------------

export default function AddEmployeePage() {
  return (
    <>
      <Helmet>
        <title> AddEmployee </title>
      </Helmet>

      <AddEmployeeView />
    </>
  );
}
