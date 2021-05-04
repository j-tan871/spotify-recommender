import Head from 'next/head';

import Result from '../components/Result';

export default function Input() {
  return (
    <div className='bg-darkblue h-screen'>
      <Head>
        <title>Explorify</title>
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-2'>
        <div className='m-12 lg:m-24 max-w-lg'>
          <h3>Search for an artist.</h3>
          <input type='text' className='w-full py-1 px-3 md:text-xl md:py-2 md:px-8 my-5' onChange={() => console.log('hi')}/>
          <Result name='Lizzy McAlpine'/>
          <Result name='Jacob Collier'/>
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
          <button>i'm ready! use my current Spotify profile.</button>
          <button>i'm ready! use the current characteristics.</button>
        </div>
      </div>
    </div>
  )
}