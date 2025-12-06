import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const SurahPage = () => {

  const { num } = useParams();

  const [ayat, setAyat] = useState([]);
  const [audio, setAudio] = useState('');
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    async function fetchAyat() {
      let response = await axios.get(`https://quranapi.pages.dev/api/${num}.json`);
      setAyat(response.data.arabic1);
      setAudio(response.data.audio["1"].url);
    }

    fetchAyat();
  },[num])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration || 1;
      setProgress((current / duration) * 100);
    }
  };

  return (
    <section className='surah'>
      <div className='container aduoi-cont'>
        {audio && (
          <>
            {/* الـ Audio الحقيقي (مخفي تحت الـ progress) */}
            <audio
              ref={audioRef}
              src={audio}
              autoPlay
              onTimeUpdate={handleTimeUpdate}
              style={{ display: 'none' }} // نخفيه
            />

            {/* الـ Progress Bar البديل الجميل */}
              <div className="progress-container">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="play-pause-btn" onClick={() => {
                audioRef.current.paused ? audioRef.current.play() : audioRef.current.pause();
              }}>
                {audioRef.current?.paused ? <i className="fa-solid fa-play"></i> : <i className="fa-solid fa-pause"></i>}
              </div>
          </>
        )}

      </div>
      <div className='container ayat-container'>
        <h1 className='ayaText'>بسم الله الرحمن الرحيم</h1>
        <div className='ayat'>
          {
            ayat.map((a, index) => (
              <h2 className='ayaText' key={index}>{a}<span className='aya-num'>{index + 1}</span></h2>
            ))
          }
        </div>
      </div>    
    </section>
  );
}

export default SurahPage;