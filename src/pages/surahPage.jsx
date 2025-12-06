import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SurahPage = () => {

  const { num } = useParams();

  const [ayat, setAyat] = useState([]);

  useEffect(() => {
    async function fetchAyat() {
      let response = await axios.get(`https://quranapi.pages.dev/api/${num}.json`);
      setAyat(response.data.arabic1);
    }

    fetchAyat();
  },[num])

  return (
    <section className='surah'>
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