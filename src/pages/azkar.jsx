import React from 'react';
import Zker from './../components/zker';
import { useNavigate } from 'react-router-dom';

const Azkar = () => {

  const navigate = useNavigate();

  const azkarList = [
    { name: 'أذكار الصباح', icon: 'https://img.icons8.com/bubbles/sun.png', value: 'أذكار الصباح'},
    { name: 'أذكار المساء', icon: 'https://img.icons8.com/plasticine/partly-cloudy-night.png', value: 'أذكار المساء' },
    { name: 'أذكار بعد الصلاة', icon: 'https://img.icons8.com/external-others-ghozy-muhtarom/external-praying-ramadan-filled-line-others-ghozy-muhtarom.png', value: 'أذكار بعد السلام من الصلاة المفروضة'},
    { name: 'تسابيح', icon: 'https://img.icons8.com/emoji/prayer-beads.png', value: 'تسابيح' },
    { name: 'أذكار النوم', icon: 'https://img.icons8.com/emoji/bed-emoji.png', value: 'أذكار النوم' },
    { name: 'أذكار الاستيقاظ', icon: 'https://img.icons8.com/external-wanicon-flat-wanicon/external-wake-up-daily-routine-wanicon-flat-wanicon.png', value: 'أذكار الاستيقاظ'},
    {name: 'أدعية الأنبياء', icon: 'https://img.icons8.com/arcade/star-crescent.png', value: 'أدعية الأنبياء'},
    {name: 'أدعية قرآنية', icon: 'https://img.icons8.com/arcade/koran.png', value: 'أدعية قرآنية'},
    
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