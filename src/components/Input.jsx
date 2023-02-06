import React, { useState } from 'react';

const Input = ({ type = 'text', className = '', placeholder = '', defaultValue = '', ...other }) => {
    const [value, setValue] = useState(defaultValue)

    return <input
        value={value}
        onChange={e => setValue(e.target.value)}
        type={type}
        className={className}
        placeholder={placeholder}
        {...other}
    />
};

export default Input;