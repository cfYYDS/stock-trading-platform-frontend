import { Card } from 'primereact/card';

const DialogHeader = ({ hideDialog, title }) => {
  return (
    <Card style={{ marginBottom: '1rem' }}>
      <div className='dialog-header'>
        <h1 style={{ fontWeight: '400' }}>{title}</h1>
        <i
          className='pi pi-times'
          style={{ fontSize: '1.5rem' }}
          onClick={hideDialog}
        ></i>
      </div>
    </Card>
  );
};

export default DialogHeader;
