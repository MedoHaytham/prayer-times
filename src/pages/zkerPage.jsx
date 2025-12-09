import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ZkerPage = () => {
  const { category } = useParams();
  const [azkar, setAzkar] = useState([]);
  const [index, setIndex] = useState(0);
  const [counter, setCounter] = useState(0);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    async function fetchSurahs() {
      try {
        let response = await axios.get('/jsons/azkar.json');
        setAzkar(response.data[category]);
        setIndex(0);
      } catch (error) {
        toast.error('Error on fetchSurahs: ' + error);
      }
    }

    fetchSurahs();
  }, [category]);

  function counterHandler() {
    if (disabled) return; 
    setCounter((prev) => prev + 1);
    if(+azkar[index].count === counter + 1) {
      if(index !== azkar.length - 1) {
        setIndex((prev) => prev + 1);
        setCounter(0);
      }
      else {
        setDisabled(true);
      }
    }
  }

  if (azkar.length > 0) {
    console.log(azkar);
  }

  return (
    <section className='zker-page'>
      <div className='container zker-container'>
        {azkar.length > 0 ? <h2>{azkar[index].content}</h2>: ""}
        <button className='counter' disabled={disabled} onClick={counterHandler}>{counter}</button>
      </div>
    </section>
  );
}

export default ZkerPage;
