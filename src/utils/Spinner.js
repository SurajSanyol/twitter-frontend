import React from 'react';

const Spinner = () => {
  const spinnerStyle = {
    position: 'relative',
    width: '15.7px',
    height: '15.7px',
  };

  const commonDivStyle = {
    animation: 'spinner-4t3wzl 1.875s infinite backwards',
    backgroundColor: 'rgba(189, 189, 186, 0.07)',
    borderRadius: '50%',
    height: '100%',
    position: 'absolute',
    width: '100%',
  };

  const keyframesStyle = `
    @keyframes spinner-4t3wzl {
      0% {
        transform: rotate(0deg) translateY(-200%);
      }
      60%, 100% {
        transform: rotate(360deg) translateY(-200%);
      }
    }
  `;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div style={spinnerStyle} className="spinner">
        <div style={{ ...commonDivStyle, animationDelay: '0.15s', backgroundColor: 'rgba(189,189,186,0.9)' }}></div>
        <div style={{ ...commonDivStyle, animationDelay: '0.3s', backgroundColor: 'rgba(189,189,186,0.8)' }}></div>
        <div style={{ ...commonDivStyle, animationDelay: '0.45s', backgroundColor: 'rgba(189,189,186,0.7)' }}></div>
        <div style={{ ...commonDivStyle, animationDelay: '0.6s', backgroundColor: 'rgba(189,189,186,0.6)' }}></div>
        <div style={{ ...commonDivStyle, animationDelay: '0.75s', backgroundColor: 'rgba(189,189,186,0.5)' }}></div>
      </div>
    </>
  );
}

export default Spinner;
