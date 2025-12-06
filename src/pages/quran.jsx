import React, { useEffect, useState } from 'react';
import Surah from '../components/surah';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Quran = () => {

  const [surahs, setSurahs] = useState([]);
  const revelationTypeInAr = {Meccan: 'مكية', Medinan: 'مدنية'};

  useEffect(() => {
    async function fetchSurahs() {
      let response = await axios.get('https://api.alquran.cloud/v1/surah');
      setSurahs(response.data.data)
    }

    fetchSurahs();
  },[])


  const navigate = useNavigate();

  return (
    <section className='quran'>
      <div className='container quran-container'>
        {surahs.map((s) =>
          <Surah key={s.number} name={s.name} revelationType={revelationTypeInAr[s.revelationType]} totalAyah={s.numberOfAyahs} onClick={() => navigate(`surah/${s.number}`)}/>
        )}

      </div>
    </section>

  );
}

export default Quran;