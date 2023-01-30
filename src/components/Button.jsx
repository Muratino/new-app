import React from 'react';

const Button = ({ className, title, disabled = false, type = 'button', ...other }) => {
    return <button {...other} disabled={disabled} type={type} className={className}>{title}</button>;
};

export default Button;