import React from 'react';

const CircleProgress = ({percentage, circleWidth}) => {

  const radius = 120;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return ( 
    <svg width={circleWidth} hanging={circleWidth} viewBox={'0 0 260 260'}>
      <circle cx='130' cy='130' strokeWidth='20px' r={radius} className='circle-background'/>
      <circle cx='130' cy='130' strokeWidth='20px' r={radius} className='circle-progress' style={{
        strokeDasharray: dashArray,
        strokeDashoffset: dashOffset,
      }}
      transform='rotate(-90 130 130)'
      />
    </svg>
  );
}

export default CircleProgress;