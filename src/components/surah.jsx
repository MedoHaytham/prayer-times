import React from 'react';

const Surah = (props) => {
  
  return ( 
    <div className='card' onClick={props.onClick}>
      <h4>{props.name}</h4>
      <i class="fa-regular fa-circle-play fs-4"></i>
      <div className='sura-info'>
        <p>{props.revelationType}</p>
        <p><span>{props.totalAyah} </span>أيات</p>
      </div>
    </div>
  );
}

export default Surah;