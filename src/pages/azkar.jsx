import React from 'react';
import Zker from './../components/zker';
import { useNavigate } from 'react-router-dom';

const Azkar = () => {

  const navigate = useNavigate();

  const azkarList = [
    { name: 'أذكار الصباح', icon: 'https://img.icons8.com/bubbles/sun.png', value: 'أذكار الصباح'},
    { name: 'أذكار المساء', icon: 'https://img.icons8.com/plasticine/partly-cloudy-night.png', value: 'أذكار المساء' },
    { name: 'أذكار بعد الصلاة', icon: 'https://img.icons8.com/external-others-ghozy-muhtarom/external-praying-ramadan-filled-line-others-ghozy-muhtarom.png', value: 'أذكار بعد السلام من الصلاة المفروضة'},
    { name: 'تسابيح', icon: 'https://img.icons8.com/external-others-ghozy-muhtarom/external-prayer-ramadan-filled-line-others-ghozy-muhtarom.png', value: 'تسابيح' },
    { name: 'أذكار النوم', icon: 'https://img.icons8.com/emoji/bed-emoji.png', value: 'أذكار النوم' },
    { name: 'أذكار الاستيقاظ', icon: 'https://img.icons8.com/external-filled-outline-wichaiwi/external-morning-good-life-filled-outline-wichaiwi.png', value: 'أذكار الاستيقاظ'}
  ];
  
  return ( 
    <section className='azkar'>
      <div className='container azkar-container'>
        {azkarList.map((a , index) => <Zker key={index} name={a.name} icon={a.icon} onClickHandler={() => navigate(`zker/${a.value}`)}/>) }
      </div>
    </section>
  );
}

export default Azkar;