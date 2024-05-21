import { useEffect, useState } from 'react';
import axios from '../interceptors/auth.interceptor';

import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Skeleton } from 'primereact/skeleton';

import formatCurrency from '../utils/currencyFormat';

const CashBalanceTable = ({ accountId }) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});
  const [pagination, setPagination] = useState({
    pageSize: 5,
    pageNumber: 0,
  });

  useEffect(() => {
    setLoading(true);
    axios
      .post(`/api/account/detail/${accountId}/cash-balance`, pagination)
      .then((response) => {
        const balances = response.data.data.balances;
        response.data.data.balances = balances.map((balance) => {
          balance.amount = formatCurrency(balance);
          return balance;
        });
        setResponse(response.data.data);
      })
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
      <h3 style={{ textAlign: 'start', marginBottom: '1rem' }}>Cash Balance</h3>
      <DataTable value={response.balances}>
        <Column
          header='Currency'
          style={{ width: '40%' }}
          body={(data) =>
            loading ? <Skeleton height='1.2rem' /> : data.currency
          }
        ></Column>
        <Column
          header='Amount'
          style={{ width: '60%' }}
          body={(data) =>
            loading ? <Skeleton height='1.2rem' /> : data.amount
          }
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

export default CashBalanceTable;
