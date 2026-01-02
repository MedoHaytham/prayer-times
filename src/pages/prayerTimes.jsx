import React, { useEffect, useState, useRef } from 'react';
import Prayer from '../components/prayer';
import axios from 'axios';
import { toast } from 'react-toastify';

const PrayerTimes = () => {

  const cities = [
    {name: 'القاهرة', value: 'Cairo'},
    {name: 'الجيزة', value: 'Giza'},
    {name: 'الاسكندرية', value: 'Alexandria'},
    {name: 'أسوان', value: 'Aswan'},
    {name: 'أسيوط', value: 'Assiut'},
    {name: 'الأقصر', value: 'Luxor'},
    {name: 'الإسماعيلية', value: 'Ismailia'},
    {name: 'البحيرة', value: 'Beheira'},
    {name: 'الدقهلية', value: 'Dakahlia'},
    {name: 'السويس', value: 'Suez'},
    {name: 'الفيوم', value: 'Fayoum'},
    {name: 'المنصورة', value: 'Mansoura'},
    {name: 'المنيا', value: 'Minya'},
    {name: 'بني سويف', value: 'Beni Suef'},
    {name: 'بورسعيد', value: 'Port Said'},
    {name: 'جنوب سيناء', value: 'South Sinai'},
    {name: 'سوهاج', value: 'Sohag'},
    {name: 'قنا', value: 'Qena'},
    {name: 'كفر الشيخ', value: 'Kafr El Sheikh'},
    {name: 'مطروح', value: 'Matrouh'},
  ];

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
    const year = date.getFullYear();
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

  // 🔹 useEffect لجلب مواقيت اليوم عند تغيير المدينة
  useEffect(() => {
    async function fetchingTimingsPrayers(date) {
      try {
        const result = await axios.get(
          `https://api.aladhan.com/v1/timingsByAddress/${date}?address=${city},Eg&method=5`
        );

        setTimings(result.data.data.timings);
        setDate(date);
        setHigri(result.data.data.date.hijri.date);
      } catch (error) {
        toast.error('Error fetching timings: ' + error);
      }
    }

    fetchingTimingsPrayers(getDateToday());

    if (adhanAudio.current) {
      adhanAudio.current.load();
    }

  }, [city]);

  // 🔹 useEffect للتايمر و تحديد الصلاة القادمة
  useEffect(() => {
    if (!timings.Fajr) return;

    let hasPlayedAdhan = false;

    const interval = setInterval(async () => {
      const now = new Date();
      const prayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

      const prayerInArabic = {
        Fajr: 'الفجر',
        Sunrise: 'الشروق',
        Dhuhr: 'الظهر',
        Asr: 'العصر',
        Maghrib: 'المغرب',
        Isha: 'العشاء',
      };

      let found = false;

      // 🔹 قبل العشاء
      for (let p of prayers) {
        const [h, m] = timings[p].split(':');
        const prayerTime = new Date();
        prayerTime.setHours(+h, +m, 0, 0);

        if (prayerTime > now) {
          found = true;

          setNextPrayer(prayerInArabic[p]);

          const diff = (prayerTime - now) / 1000;

          const hh = String(Math.floor(diff / 3600)).padStart(2, '0');
          const mm = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
          const ss = String(Math.floor(diff % 60)).padStart(2, '0');

          setCountdown(`${hh}h : ${mm}m : ${ss}s`);

          if (diff < 1 && adhanAudio.current && !hasPlayedAdhan) {
            adhanAudio.current.play().catch(err => toast.error(err));
            hasPlayedAdhan = true;
          }

          return;
        }
      }

      // 🔹 بعد العشاء → نعرض مواقيت الغد، ونحسب countdown للفجر فقط
      if (!found) {
        const tomorrow = getDatetomorrow();

        try {
          const result = await axios.get(
            `https://api.aladhan.com/v1/timingsByAddress/${tomorrow}?address=${city},Eg&method=5`
          );

          setTimings(result.data.data.timings);
          setDate(tomorrow);
          setHigri(result.data.data.date.hijri.date);

          // العد التنازلي للفجر فقط
          const [fh, fm] = result.data.data.timings.Fajr.split(':');
          const fajrTime = new Date();
          fajrTime.setDate(fajrTime.getDate() + 1);
          fajrTime.setHours(+fh, +fm, 0, 0);

          setNextPrayer('الفجر (غدًا)');

          const diff = (fajrTime - now) / 1000;

          const hh = String(Math.floor(diff / 3600)).padStart(2, '0');
          const mm = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
          const ss = String(Math.floor(diff % 60)).padStart(2, '0');

          setCountdown(`${hh}h : ${mm}m : ${ss}s`);

          if (diff < 1 && adhanAudio.current && !hasPlayedAdhan) {
            adhanAudio.current.play().catch(err => toast.error(err));
            hasPlayedAdhan = true;
          }

        } catch (error) {
          toast.error('Error fetching tomorrow timings');
        }
      }

    }, 1000);

    return () => clearInterval(interval);

  }, [timings, city]);

  // 🔹 تحويل الوقت ل 12 ساعة
  function convertTo12(time24) {
    if (!time24) return '00:00';
    const date = new Date(`1970-01-01T${time24}:00`);
    return date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  return (
    <section className='prayertimes'>
      <div className="container prayer-times-container">

        <div className="top_sec">
          <div className="city">
            <h3>المدينة</h3>
            <select name="city" id="city" onChange={(e) => setCity(e.target.value)}>
              {cities.map((c) => (
                <option key={c.value} value={c.value}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="date">
            <div></div>
            <h3>التاريخ</h3>
            <h4 className='fw-bold'>الميلادي: {!date ? '00-00-0000' : date}</h4>
            <h4 className='fw-bold'>الهجري: {!higri ? '00-00-0000' : higri}</h4>
          </div>
        </div>

        <div className="countdown">
          <h5>الصلاة القادمة</h5>
          <h5>{nextPrayer}</h5>
          <h5>الوقت المتبقي</h5>
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

        <audio ref={adhanAudio} src="https://github.com/MedoHaytham/azan-for-prayer-app/raw/refs/heads/main/adhan.mp3" />

      </div>
    </section>
  );
};

export default PrayerTimes;
