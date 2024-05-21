import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

import CashBalanceTable from '../../../components/CashBalanceTable';
import SecurityBalanceTable from '../../../components/SecurityBalanceTable';

const BalancesSidebar = ({ accountId, hideSidebar }) => {
  return (
    <div
      style={{
        backgroundColor: '#e6e9f2',
        minHeight: '100vh',
        overflowY: 'auto',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Card
        style={{
          textAlign: 'start',
          color: 'var(--primary-color)',
        }}
      >
        <h2 style={{ fontWeight: '400' }}>DETAIL</h2>
        <p>{accountId}</p>
      </Card>
      <CashBalanceTable accountId={accountId} />
      <SecurityBalanceTable accountId={accountId} />
      <Button
        rounded
        style={{
          width: 'fit-content',
          marginTop: 'auto',
          padding: '1rem',
        }}
        onClick={hideSidebar}
      >
        Close Tab
      </Button>
    </div>
  );
};

export default BalancesSidebar;
