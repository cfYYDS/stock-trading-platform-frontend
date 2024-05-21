import { useEffect, useState } from 'react';
import axios from '../interceptors/auth.interceptor';

import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Skeleton } from 'primereact/skeleton';

const SecurityBalanceTable = ({ accountId }) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});
  const [pagination, setPagination] = useState({
    pageSize: 5,
    pageNumber: 0,
  });

  useEffect(() => {
    setLoading(true);
    axios;
    axios
      .post(`/api/account/detail/${accountId}/security-balance`, pagination)
      .then((response) => setResponse(response.data.data))
      .then(() => setLoading(false))
      .catch(console.error);
  }, [accountId, pagination]);

  const onPageChange = (event) => {
    setPagination({
      pageNumber: event.page,
      pageSize: event.rows,
    });
  };

  return (
    <Card>
      <h3 style={{ textAlign: 'start', marginBottom: '1rem' }}>
        Security Balance
      </h3>
      <DataTable value={response.balances}>
        <Column
          header='Quantity'
          style={{ width: '40%' }}
          body={(data) =>
            loading ? <Skeleton height='1.2rem' /> : data.quantity
          }
        ></Column>
        <Column
          header='Instrument Name'
          style={{ width: '60%' }}
          body={(data) => (loading ? <Skeleton height='1.2rem' /> : data.stock)}
        ></Column>
      </DataTable>
      {response.totalFound > 5 && (
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Paginator
            first={pagination.pageNumber * pagination.pageSize}
            rows={pagination.pageSize}
            totalRecords={response.totalFound ?? 0}
            rowsPerPageOptions={[5, 10, 20]}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </Card>
  );
};

export default SecurityBalanceTable;
