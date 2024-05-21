import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        height: '80vh',
        width: '100vw',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ position: 'relative', width: '700px', height: '500px' }}>
        <div style={{ position: 'absolute', left: 0, bottom: 0 }}>
          <img src='/403.svg' />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '4rem',
            position: 'absolute',
            right: 0,
            top: 0,
          }}
        >
          <h1 style={{ fontSize: '6rem' }}>403</h1>
          <h2 style={{ fontSize: '3rem' }}>Access Denied</h2>
          <Button
            rounded
            onClick={() => navigate('/')}
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
