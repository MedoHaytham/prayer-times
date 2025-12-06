import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AudioBar from '../components/audioBar';
import { toast } from 'react-toastify';

const SurahPage = () => {

  const { num } = useParams();
  const navigate = useNavigate();

  const [ayat, setAyat] = useState([]);
  const [audio, setAudio] = useState('');


  useEffect(() => {
    async function fetchAyat() {
      try{
        let response = await axios.get(`https://quranapi.pages.dev/api/${num}.json`);
        setAyat(response.data.arabic1);
        setAudio(response.data.audio["1"].url);
      } catch(error) {
        toast.error('Erro on fetchAyat: ' + error);
      }
    }

    fetchAyat();
  },[num]);

  return (
    <section className='surah'>
      <AudioBar audio={audio} />
      <div className='container next-prev'>
        { num > 1 && <button className='btn prev-btn' onClick={() => navigate(`../quran/surah/${+num - 1}`)}>السابق</button>}
        { num < 114 && <button className='btn next-btn' onClick={() => navigate(`../quran/surah/${+num + 1}`)} >التالي</button>}
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