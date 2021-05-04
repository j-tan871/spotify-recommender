import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, React } from 'react';

import Result from '../components/Result';

export default function Input() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState(null);
  const [selected, setSelected] = useState(null);

  const handleInput = async (event) => {
    setSearch(event.target.value);
    // console.log(search);
    if (search.length > 1) {
      try {
        const response = await fetch(`http://localhost:5000/search/${search}`, {
          method: 'GET'
        });
        const data = await response.json();
        console.log(data);
        setResults(data['artists']);
        // console.log(results);
      } catch (err) {
        console.log(err);
      }
    } 
  }

  return (
    <div className='bg-darkblue h-auto'>
      <Head>
        <title>Explorify</title>
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <main className='grid grid-cols-1 lg:grid-cols-2'>
        <div className='p-12 lg:pt-24 max-w-lg'>
          <h3>Search for an artist.</h3>
          <input type='text' className='w-full py-1 px-3 md:text-xl md:py-2 md:px-8 my-5' value={search} onChange={handleInput}/>
          {
            results ? results.map((item, idx) => <div onClick={() => {setSelected(item)}}><Result main={item[0]} key={idx} /></div>) : null
          }
          {
            selected ? <p className='text-white pt-5'><span className='font-bold'>{selected[0]}</span>? Good choice!</p> : null
          }
          {/* <Result main='Lizzy McAlpine'/>
          <Result main='Jacob Collier'/> */}
        </div>
        <div className='my-12 lg:my-24 max-w-lg'>
          <h3>Your results will be based on your top tracks.</h3>
          <h3 className='mb-5'>Or, you can input characteristics of songs you like.</h3>
          <div className='w-full flex mb-3'>
            <div className='mr-12 w-24'>
              <label className='text-white'>danceability</label>
            </div>
            <input type="range" min={0} max={100}></input>
          </div>
          <div className='w-full flex mb-3'>
            <div className='mr-12 w-24'>
              <label className='text-white'>energy</label>
            </div>
            <input type="range" min={0} max={100}></input>
          </div>
          <div className='w-full flex mb-3'>
            <div className='mr-12 w-24'>
              <label className='text-white'>speechiness</label>
            </div>
            <input type="range" min={0} max={100}></input>
          </div>
          <div className='w-full flex mb-3'>
            <div className='mr-12 w-24'>
              <label className='text-white'>acousticness</label>
            </div>
            <input type="range" min={0} max={100}></input>
          </div>
          <div className='w-full flex mb-3'>
            <div className='mr-12 w-24'>
              <label className='text-white'>instrumentalness</label>
            </div>
            <input type="range" min={0} max={100}></input>
          </div>
          <div className='w-full flex mb-3'>
            <div className='mr-12 w-24'>
              <label className='text-white'>liveness</label>
            </div>
            <input type="range" min={0} max={100}></input>
          </div>
          <div className='w-full flex mb-3'>
            <div className='mr-12 w-24'>
              <label className='text-white'>valence</label>
            </div>
            <input type="range" min={0} max={100}></input>
          </div>
          {
            selected ? 
              <>
                <button><Link href={`/output/${selected[1][0]}`}>i'm ready! use my current Spotify profile.</Link></button>
                <button>i'm ready! use the current characteristics.</button>
              </> : null
          }
        </div>
      </main>
    </div>
  )
}