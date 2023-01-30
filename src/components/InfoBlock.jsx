import React from 'react';

const InfoBlock = ({ title }) => {
  return (
    <div style={{ width: '1400px' }} className='py-8 px-7 ml-16 text-xl border border-black'>
      <span style={{ letterSpacing: '13px', fontFamily: 'Lato-bold' }}>
        {title}
      </span>
    </div>
  );
};

export default InfoBlock;