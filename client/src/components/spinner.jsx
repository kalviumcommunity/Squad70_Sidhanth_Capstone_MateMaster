import React from 'react';

const Spinner = () => {
  const spinnerStyle = {
    height: '48px',
    width: '48px',
    border: '6px solid #cbd5e0',
    borderTop: '6px solid #3182ce',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '150px'
    }}>
      <div style={spinnerStyle}></div>
    </div>
  );
};

export default Spinner;