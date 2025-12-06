import React from 'react';

const Surah = (props) => {
  
  return ( 
    <div className='card' onClick={props.onClick}>
      <h4>{props.name}</h4>
      <div className='sura-info'>
        <p>{props.revelationType}</p>
        <p><span>{props.totalAyah} </span>أيات</p>
      </div>
    </div>
  );
}

export default Surah;