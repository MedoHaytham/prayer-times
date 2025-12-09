import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CircleProgress from './../components/circleProgress';

const ZkerPage = () => {
  const { category } = useParams();
  const [azkar, setAzkar] = useState([]);
  const [index, setIndex] = useState(0);
  const [counter, setCounter] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [percentage, setPercentage] = useState(0);


  useEffect(() => {
    async function fetchAzkar() {
      try {
        let response = await axios.get('https://raw.githubusercontent.com/wdalgrb/azkar-api/refs/heads/main/website/azkar.json');
        setAzkar(response.data[category]);
        setIndex(0);
      } catch (error) {
        toast.error('Error on fetchAzkar: ' + error);
      }
    }

    fetchAzkar();
  }, [category]);

  function counterHandler() {
    if (disabled) return;

    const newCounter = counter + 1;
    setCounter(newCounter);
    setPercentage((newCounter / +azkar[index].count) * 100);
    if(+azkar[index].count === newCounter) {
      if(index !== azkar.length - 1) {
        setIndex((prev) => prev + 1);
        setCounter(0);
        setPercentage(0); 
      }
      else {
        setDisabled(true);
      }
    }
  }

  if (azkar.length > 0) {
    console.log(azkar);
    console.log(percentage);
  }

  return (
    <section className='zker-page'>
      <div className='container zker-container'>
        <div className='top-sec'>
          <span className="category">{category}</span>
          <span>{azkar.length} / {index + 1}</span>
        </div>
        {azkar.length > 0 ? <h2 className='zker-text'>{azkar[index].content}</h2>: ""}
        <div className="progress-circle">
          <button className="counter" disabled={disabled} onClick={counterHandler}>{counter}</button>
          <CircleProgress percentage={percentage} circleWidth={55.6} />
        </div>
      </div>
    </section>
  );
}

export default ZkerPage;
