import { Button } from 'primereact/button';

const DialogButtons = ({ hideDialog }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'end',
        gap: '2rem',
        marginTop: '1rem',
      }}
    >
      <Button
        rounded
        style={{
          backgroundColor: '#f3f2f2',
          color: 'black',
        }}
        onClick={hideDialog}
      >
        Cancel
      </Button>
      <Button
        rounded
        type='submit'
      >
        Create
      </Button>
    </div>
  );
};

export default DialogButtons;
