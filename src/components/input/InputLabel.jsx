const InputLabel = ({ property, title }) => {
  return (
    <label htmlFor={property}>
      <h2 style={{ fontWeight: '400' }}>
        {title}
        <span style={{ color: 'var(--primary-color)' }}>*</span>
      </h2>
    </label>
  );
};

export default InputLabel;
