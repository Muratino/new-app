import React from 'react';

const ErrorComponent = ({ error }) => {
  return (
    <div className='flex items-center justify-center'>
      <h2 className='text-red-500 p-0 m-0'>{error}</h2>
    </div>
  );
};

export default ErrorComponent;