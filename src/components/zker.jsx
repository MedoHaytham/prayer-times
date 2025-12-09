import React from 'react';

const Zker = ({name, icon, onClickHandler}) => {
  return ( 
    <div className='zker' onClick={onClickHandler}>
      <img src={icon} className='zker-icon' alt=""/>
      <h3 className='zker-name'>{name}</h3>
    </div>
  );
}

export default Zker;