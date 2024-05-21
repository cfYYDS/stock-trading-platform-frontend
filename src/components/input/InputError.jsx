const InputError = ({ error }) => {
  return (
    error && (
      <small style={{ color: '#e24c4c' }}>
        <i
          className='pi pi-exclamation-triangle'
          style={{ fontSize: '0.6rem' }}
        ></i>
        &nbsp;
        {error.message}
      </small>
    )
  );
};

export default InputError;
