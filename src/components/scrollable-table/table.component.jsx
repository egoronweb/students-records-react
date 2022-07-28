import React from 'react';
import { MDBDatatable } from 'mdb-react-ui-kit';

export default function App() {
  const basicData = {
    columns: ['Full Name', 'Subject', 'Semester', 'Batch Year', 'Year Level', 'Final Grade'],
    rows: [
      ['Tiger Nixon', 'System Architect', 'Edinburgh', '61', '2011/04/25', '$320,800'],
    ],
  };

  return (
    <MDBDatatable maxHeight='520px' maxWidth='520px' data={basicData} />
  );
}