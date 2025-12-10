import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import compassImg from '../assets/compass-2.png';
import compassArrow from '../assets/qiblaArrow.png';

const QiblaCompass = () => {

  const [direction, setDirection] = useState(0);   // اتجاه القبلة
  const [deviceDeg, setDeviceDeg] = useState(0);   // اتجاه الموبايل (البوصلة)

  useEffect(() => {
    // 1) GPS
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          // 2) Data from API
          const res = await axios.get(`https://api.aladhan.com/v1/qibla/${lat}/${lon}`);
          setDirection(res.data.data.direction);
        } catch (error) {
          toast.error("Error fetching Qibla direction");
        }

      },
      () => toast.error("قم بتفعيل الـ GPS")
    );

    // 3) اتجاه الجهاز (البوصلة)
    window.addEventListener("deviceorientation", (event) => {
      const alpha = event.alpha;  // اتجاه الجهاز
      setDeviceDeg(alpha);
    });

  }, []);

  return (
    <section className='qibla-compass'>
      <div className='container qibla-container'>
        <h2>اتجاه القبلة</h2>

        <div className='img-container'>

          {/* البوصلة تتحرك مع الجهاز */}
          <img 
            className='compass-img'
            src={compassImg}
            alt="compass"
            style={{ transform: `rotate(${-deviceDeg}deg)` }}
          />

          {/* السهم يتوجه للقبلة */}
          <img
            className='arrow-img'
            src={compassArrow}
            alt="arrow"
            style={{ transform: `rotate(${direction - deviceDeg}deg) scale(0.4)` }}
          />

        </div>

        <p>زاوية القبلة: {direction.toFixed(2)}°</p>

      </div>
    </section>
  );
};

export default QiblaCompass;
