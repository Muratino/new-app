import React from 'react';

const InfoBlock = ({ title }) => {
  return (
    <div className='row text-xl' style={{margin: "65px 55px"}}>
      <span style={{ letterSpacing: '13px', fontFamily: 'Lato-bold' }} className={"main-info"}>
        {title}
      </span>
    </div>
  );
};

export default InfoBlock;