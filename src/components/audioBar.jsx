import React, { useRef, useState } from 'react';

const AudioBar = (props) => {

    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);

    const handleTimeUpdate = () => {
      if (audioRef.current) {
        const current = audioRef.current.currentTime;
        const duration = audioRef.current.duration || 1;
        setProgress((current / duration) * 100);
      }
    };
  
    const handleSeek = (e) => {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const width = rect.width;
  
      const clickedPercent = Math.max(0, Math.min(1, offsetX / width));
  
      if (audioRef.current && audioRef.current.duration) {
        audioRef.current.currentTime = clickedPercent * audioRef.current.duration;
      }
    };

  return ( 
    <div className='container aduoi-cont'>
        {props.audio && (
          <>
            <audio ref={audioRef} src={props.audio} onTimeUpdate={handleTimeUpdate} />
            <div className="progress-container"  onClick={handleSeek}>
              <div className="progress-fill" style={{ width: `${progress}%` }}/>
            </div>
            <div className="play-pause-btn" onClick={() => {audioRef.current.paused ? audioRef.current.play() : audioRef.current.pause();}}>
              {audioRef.current?.paused ? <i className="fa-solid fa-play"></i> : <i className="fa-solid fa-pause"></i>}
            </div>
          </>
        )}
    </div>
  );
}

export default AudioBar;