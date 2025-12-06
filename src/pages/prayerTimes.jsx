import React, { useEffect, useState, useRef } from 'react';
import Prayer from '../components/prayer';
import axios from 'axios';
import { toast } from 'react-toastify';

const PrayerTimes = () => {

  const cities = [
    {name: 'القاهرة', value: 'Cairo'},
    {name: 'الاسكندرية', value: 'Alexandria'},
    {name: 'الجيزة', value: 'Giza'},
    {name: 'المنصورة', value: 'Mansoura'},
    {name: 'أسوان', value: 'Aswan'},
    {name: 'الأقصر', value: 'Luxor'},
    {name: 'سوهاج', value: 'Sohag'},
    {name: 'قنا', value: 'Qena'},
    {name: 'المنيا', value: 'Minya'},
    {name: 'الفيوم', value: 'Fayoum'},
    {name: 'بني سويف', value: 'Beni Suef'},
    {name: 'الاسماعيلية', value: 'Ismailia'},
    {name: 'بورسعيد', value: 'Port Said'},
    {name: 'دمياط', value: 'Damietta'},
    {name: 'الشرقية', value: 'Sharqia'},
    {name: 'الغربية', value: 'Gharbia'},
    {name: 'كفر الشيخ', value: 'Kafr El Sheikh'},
    {name: 'الدقهلية', value: 'Dakahlia'},
    {name: 'مطروح', value: 'Matrouh'},
    {name: 'البحر الأحمر', value: 'Red Sea'},
    {name: 'جنوب سيناء', value: 'South Sinai'},
    {name: 'شمال سيناء', value: 'North Sinai'},
    {name: 'البحيرة', value: 'Beheira'},
    {name: 'السويس', value: 'Suez'},
    {name: 'أسيوط', value: 'Assiut'}
  ]

  const [date, setDate] = useState('');
  const [city, setCity] = useState('Cairo');
  const [timings, setTimings] = useState({});
  const [higri, setHigri] = useState('');
  const [nextPrayer, setNextPrayer] = useState('');
  const [countdown, setCountdown] = useState('');
  const adhanAudio = useRef(null);


  function getDateToday() {
    const date = new Date();
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = String(date.getFullYear());

    return `${day}-${month}-${year}`;
  }

  function getDatetomorrow() {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  useEffect(() => {

    async function fetchingTimingsPrayers() {
      try {
        let result = await axios.get(`https://api.aladhan.com/v1/timingsByAddress/${getDateToday()}?address=${city},Eg&method=8`);
        setTimings(result.data.data.timings);
        setDate(getDateToday());
        setHigri(result.data.data.date.hijri.date);
      } catch(error) {
        toast.error('Error fetching timings:' + error);
      }
    }
    fetchingTimingsPrayers();
  },[city]);


  useEffect(() => {
    if(!timings.Fajr) return;

    const interval = setInterval(() => {
      
      const now = new Date();
      const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
      let found = false;

      for(let p of prayers) {
        const [hour, minutes] = timings[p].split(':');
        const prayerTime = new Date();
        prayerTime.setHours(+hour, +minutes, 0, 0);

        if (prayerTime > now) {
          found = true;
          const prayerInArabic  = {
            Fajr: 'الفجر',
            Dhuhr: 'الظهر',
            Asr: 'العصر',
            Maghrib: 'المغرب',
            Isha: 'العشاء',
          }
          setNextPrayer(prayerInArabic[p]);

          const diff = (prayerTime - now ) / 1000;
          
          let h = parseInt(diff / 3600) < 10 ? `0${parseInt(diff / 3600)}` : parseInt(diff / 3600);
          let m = parseInt((diff % 3600) / 60) < 10? `0${parseInt((diff % 3600) / 60)}` : parseInt((diff % 3600) / 60);
          let s = parseInt(diff % 60) < 10 ? `0${parseInt(diff % 60)}` : parseInt(diff % 60);

          setCountdown(`${h}h : ${m}m : ${s}s`);

          if(diff < 1 && adhanAudio.current) {
            adhanAudio.current.play().catch((error) => toast.error(error));
          }
          return;
        }
      }

      if(!found) {
        const [ishaH, ishaM] = timings.Isha.split(':');
        const ishaTime = new Date();
        ishaTime.setHours(+ishaH, +ishaM, 0, 0);

        if (now > ishaTime) {
          async function fetchingTimingsPrayers() {
            try {
              let result = await axios.get(`https://api.aladhan.com/v1/timingsByAddress/${getDatetomorrow()}?address=${city},Eg&method=8`);
              setTimings(result.data.data.timings);
            } catch(error) {
              toast.error('Error fetching timings:' + error);
            }
          }
          fetchingTimingsPrayers();
        }

        const [fh, mh] = timings.Fajr.split(':');
        const tomorrowfajrTime = new Date();
        tomorrowfajrTime.setDate(tomorrowfajrTime.getDate() + 1);
        tomorrowfajrTime.setHours(+fh, +mh, 0, 0);

        setNextPrayer('الفجر (غدا)');

        const diff = (tomorrowfajrTime - now) /1000;

        let h = parseInt(diff / 3600) < 10 ? `0${parseInt(diff / 3600)}` : parseInt(diff / 3600);
        let m = parseInt((diff % 3600) / 60) < 10? `0${parseInt((diff % 3600) / 60)}` : parseInt((diff % 3600) / 60);
        let s = parseInt(diff % 60) < 10 ? `0${parseInt(diff % 60)}` : parseInt(diff % 60);

        setCountdown(`${h}h : ${m}m : ${s}s`);

        if(diff < 1 && adhanAudio.current) {
          adhanAudio.current.play().catch((error) => toast.error(error));
        }
      }

    },1000);

    return () => clearInterval(interval);

  },[timings, city]);

  function convertTo12(time24) {
    if(!time24)
      return '00:00';

    const date = new Date(`1970-01-01T${time24}:00`);
    return (date.toLocaleString(`en-US`,{
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }));
  }

  return ( 
    <section className='prayertimes'>
      <div className="container prayer-times-container">
        <div className="top_sec">
          <div className="city">
            <h3>المدينة</h3>
            <select name="city" id="city" onChange={(e) => setCity(e.target.value)}>
              {cities.map((c) => (<option key={c.value} value={c.value}>{c.name}</option>))}
            </select>
          </div>
          <div className="date">
            <div></div>
            <h3>التاريخ</h3>
            <h4 className='fw-bold'>الميلادى : {!date ? '00-00-0000' : date}</h4>
            <h4 className='fw-bold'>الهجرى : {!higri ? '00-00-0000' : higri}</h4>
          </div>
        </div>
        <div className="countdown">
          <h5>الصلاة القادمة </h5>
          <h5>{nextPrayer}</h5>
          <h5>الوقت المتبقي </h5>
          <h5>{countdown}</h5>
        </div>
        <div className='times'>
          <Prayer name={'الفجر'} time={convertTo12(timings.Fajr)}/>
          <Prayer name={'الشروق'} time={convertTo12(timings.Sunrise)}/>
          <Prayer name={'الظهر'} time={convertTo12(timings.Dhuhr)}/>
          <Prayer name={'العصر'} time={convertTo12(timings.Asr)}/>
          <Prayer name={'المغرب'} time={convertTo12(timings.Maghrib)}/>
          <Prayer name={'العشاء'} time={convertTo12(timings.Isha)}/>
        </div>
        <audio ref={adhanAudio} src="/sounds/adhan.mp3" />
      </div>
    </section>
  );
}

export default PrayerTimes;