import React from 'react';
import './Button.css';

const Button = ({ children, onClick, buttonType = 'primary' }) => {
  const buttonClass = buttonType === 'primary' ? 'btn-primary' : 'btn-secondary';

  return (
    <button className={`btn ${buttonClass}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
