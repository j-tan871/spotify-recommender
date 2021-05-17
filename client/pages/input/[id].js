import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, React } from 'react';
import { useRouter } from 'next/router'

import Result from '../../components/Result';

export default function Input() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState(null);
  const [selected, setSelected] = useState(null);
  const [inputs, setInputs] = useState({
    'danceability': 50,
    'energy': 50, 
    'speechiness': 50,
    'acousticness': 50, 
    'instrumentalness': 50,
    'liveness': 50,
    'valence': 50 
  });
  const router = useRouter()
  const { id } = router.query

  const handleInput = async (event) => {
    setSearch(event.target.value);
    // console.log(search);
    if (search.length > 1) {
      try {
        const response = await fetch(`https://explorify-api.herokuapp.com/search/${search}/${id}`, {
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

  const handleSlider = async (event, category) => {
    setInputs({...inputs, [category]: event.target.value})
    // console.log(inputs);
  }

  return (
    <div className='bg-darkblue h-screen'>
      <Head>
        <title>Explorify</title>
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <main className='bg-darkblue grid grid-cols-1 lg:grid-cols-2'>
        <div className='p-12 lg:pt-24 lg:mx-24 max-w-lg'>
          <h3>Search for an artist.</h3>
          <input type='text' className='w-full py-1 px-3 md:text-xl md:py-2 md:px-8 my-5' value={search} onChange={handleInput}/>
          {
            results ? results.map((item, idx) => <div onClick={() => {setSelected(item)}}><Result main={item[0]} key={idx} /></div>) : null
          }
          {
            selected ? <p className='text-white pt-5'><span className='font-bold'>{selected[0]}</span>? Good choice!</p> : null
          }
          <button><Link href='/'>Go home</Link></button>
        </div>
        <div className='my-12 mx-12 lg:my-24 max-w-lg'>
          <h3>Your results will be based on your top tracks.</h3>
          <h3 className='mb-5'>Or, you can input characteristics of songs you like.</h3>
          <div className='w-full flex mb-3'>
            <div className='mr-12 w-24'>
              <label className='text-white'>danceability</label>
            </div>
            <input type="range" min={0} max={100} value={inputs['danceability']} onChange={(event) => handleSlider(event, 'danceability')}></input>
          </div>
          <div className='w-full flex mb-3'>
            <div className='mr-12 w-24'>
              <label className='text-white'>energy</label>
            </div>
            <input type="range" min={0} max={100} value={inputs['energy']} onChange={(event) => handleSlider(event, 'energy')}></input>
          </div>
          <div className='w-full flex mb-3'>
            <div className='mr-12 w-24'>
              <label className='text-white'>speechiness</label>
            </div>
            <input type="range" min={0} max={100} value={inputs['speechiness']} onChange={(event) => handleSlider(event, 'speechiness')}></input>
          </div>
          <div className='w-full flex mb-3'>
            <div className='mr-12 w-24'>
              <label className='text-white'>acousticness</label>
            </div>
            <input type="range" min={0} max={100} value={inputs['acousticness']} onChange={(event) => handleSlider(event, 'acousticness')}></input>
          </div>
          <div className='w-full flex mb-3'>
            <div className='mr-12 w-24'>
              <label className='text-white'>instrumentalness</label>
            </div>
            <input type="range" min={0} max={100} value={inputs['instrumentalness']} onChange={(event) => handleSlider(event, 'instrumentalness')}></input>
          </div>
          <div className='w-full flex mb-3'>
            <div className='mr-12 w-24'>
              <label className='text-white'>liveness</label>
            </div>
            <input type="range" min={0} max={100} value={inputs['liveness']} onChange={(event) => handleSlider(event, 'liveness')}></input>
          </div>
          <div className='w-full flex mb-3'>
            <div className='mr-12 w-24'>
              <label className='text-white'>valence</label>
            </div>
            <input type="range" min={0} max={100} value={inputs['valence']} onChange={(event) => handleSlider(event, 'valence')}></input>
          </div>
          {
            selected ? 
              <>
                <button><Link href={`/output/${id}/${selected[1][0]}`}>I'm ready! Use my current Spotify profile.</Link></button>
                <button><Link href={`/output/${id}/${selected[1][0]}/${inputs.danceability / 100}:${inputs.energy / 100}:${inputs.speechiness / 100}:${inputs.acousticness / 100}:${inputs.instrumentalness / 100}:${inputs.liveness / 100}:${inputs.valence / 100}/`}>
                    I'm ready! Use the current characteristics.</Link></button>
              </> : null
          }
        </div>
      </main>
    </div>
  )
}