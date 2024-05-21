import { useState, useEffect } from 'react';
import axios from '../../../interceptors/auth.interceptor';
import { useDebounce } from 'primereact/hooks';

import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Skeleton } from 'primereact/skeleton';
import { Paginator } from 'primereact/paginator';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Sidebar } from 'primereact/sidebar';

import formatDate from '../../../utils/dateFormat';

import CreateAccountDialog from './CreateAccountDialog';
import ActionMenu from './ActionMenu';
import BalancesSidebar from './BalancesSidebar';

const options = [{ value: 'Active' }, { value: 'Suspended' }];

const AccountTable = () => {
  const [response, setResponse] = useState({});
  const [sortCriteria, setSortCriteria] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    pageSize: 5,
    pageNumber: 0,
  });
  const [search, debouncedSearch, setSearch] = useDebounce('', 400);
  const [accountStatus, setAccountStatus] = useState(null);
  const [createAccountShow, setCreateAccountShow] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .post('/api/account/search', {
        searchContent: debouncedSearch,
        accountStatus,
        sortCriteria,
        ...pagination,
      })
      .then((response) => {
        const accounts = response.data.data.accounts;
        response.data.data.accounts = accounts.map((account) => {
          account.createdDate = formatDate(account.createdDate);
          return account;
        });
        setResponse(response.data.data);
      })
      .then(() => setLoading(false))
      .catch(console.error);
  }, [sortCriteria, pagination, debouncedSearch, accountStatus, refetch]);

  const handleSort = (event) => {
    const { sortField, sortOrder } = event;
    setSortCriteria(
      sortField ? { field: sortField, isAsc: sortOrder === 1 } : null,
    );
  };

  const onPageChange = (event) => {
    setPagination({
      pageNumber: event.page,
      pageSize: event.rows,
    });
  };

  return (
    <>
      <Card>
        <div
          style={{
            display: 'flex',
            marginBottom: '2rem',
            gap: '3rem',
          }}
        >
          <IconField>
            <InputIcon className='pi pi-search' />
            <InputText
              placeholder='Account Nickname'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '16rem', textAlign: 'start' }}
            />
          </IconField>
          <Dropdown
            placeholder='Account Status'
            options={options}
            optionLabel='value'
            showClear
            checkmark={true}
            value={accountStatus}
            onChange={(e) => setAccountStatus(e.value)}
            style={{ width: '16rem', textAlign: 'start' }}
          />
          <Button
            rounded
            onClick={() => setCreateAccountShow(true)}
            style={{ marginLeft: 'auto' }}
          >
            Create Account
          </Button>
        </div>
        <DataTable
          value={response.accounts}
          removableSort
          sortField={sortCriteria?.field}
          sortOrder={sortCriteria?.isAsc ? 1 : -1}
          onSort={handleSort}
          selectionMode='single'
          selection={selectedAccount}
          onSelectionChange={(e) => setSelectedAccount(e.value)}
        >
          <Column
            header='Account ID'
            field='accountId'
            sortable
            bodyStyle={{
              maxWidth: '8rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            body={(data) =>
              loading ? <Skeleton height='1.2rem' /> : data.accountId
            }
          ></Column>
          <Column
            header='Account Number'
            field='accountNumber'
            sortable
            body={(data) =>
              loading ? <Skeleton height='1.2rem' /> : data.accountNumber
            }
          ></Column>
          <Column
            header='Account Nickname'
            field='nickname'
            sortable
            body={(data) =>
              loading ? <Skeleton height='1.2rem' /> : data.nickname
            }
          ></Column>
          <Column
            header='User Full Name'
            field='userFullName'
            body={(data) =>
              loading ? <Skeleton height='1.2rem' /> : data.userFullName
            }
          ></Column>
          <Column
            header='User Email'
            field='userEmail'
            body={(data) =>
              loading ? <Skeleton height='1.2rem' /> : data.userEmail
            }
          ></Column>
          <Column
            header='Account Status'
            field='accountStatus'
            body={(data) =>
              loading ? <Skeleton height='1.2rem' /> : data.accountStatus
            }
          ></Column>
          <Column
            header='Created Date'
            field='createdDate'
            body={(data) =>
              loading ? <Skeleton height='1.2rem' /> : data.createdDate
            }
          ></Column>
          <Column
            header='Action'
            body={(data) => (
              <ActionMenu
                status={data.accountStatus}
                accountId={data.accountId}
                refetchData={() => setRefetch(!refetch)}
              />
            )}
          ></Column>
        </DataTable>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Paginator
            first={pagination.pageNumber * pagination.pageSize}
            rows={pagination.pageSize}
            totalRecords={response.totalFound ?? 0}
            rowsPerPageOptions={[5, 10, 20]}
            onPageChange={onPageChange}
          />
        </div>
      </Card>
      <Dialog
        visible={createAccountShow}
        content={
          <CreateAccountDialog hideDialog={() => setCreateAccountShow(false)} />
        }
      />
      <Sidebar
        visible={!!selectedAccount}
        position='right'
        onHide={() => setSelectedAccount(null)}
        content={
          <BalancesSidebar
            accountId={selectedAccount?.accountId}
            hideSidebar={() => setSelectedAccount(null)}
          />
        }
        style={{ width: '40vw' }}
      />
    </>
  );
};

export default AccountTable;
