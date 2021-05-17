import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { React, useEffect, useState } from 'react';

import Result from '../../../components/Result';

export default function Output() {
  const router = useRouter()
  const { id, tok } = router.query
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      if (!id) {
        return;
      }

      try {
        console.log(id);
        console.log(`${id}`);
        const response = await fetch(`https://explorify-api.herokuapp.com/results/${id}/${tok}`, {
          method: 'GET',
        });
        const responseData = await response.json();
        setData(responseData);
        console.log('hi')
        console.log(data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchSongs();
  }, [id]);

  return (
    <div className='bg-darkblue h-auto lg:pb-36 min-h-screen'>
      <Head>
        <title>Explorify</title>
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <main>
        {
          loading ? 
          <div className='px-12 py-12 md:px-24 md:py-24 lg:px-36 lg:py-36'>
            <h3 className='mb-3 md:mb-5'>Calculating Euclidean distance...</h3>
            <h3 className='mb-3 md:mb-5'>Finding similar songs...</h3>
            <h3>Almost there...</h3>
          </div> : 
          <div className='bg-darkblue max-w-5xl py-12 md:pt-24 px-12 md:pl-24 lg:pl-36'>
          {
            data ? <>
              <h3>Here are the top 10 songs by <span className='font-bold'>{data['name']}</span>, ranked by similarity to your current music tastes.</h3>
              <p className='text-white underline mb-5 md:mb-12'><a href='/info'>How was this calculated?</a></p>
              {
                data['distances'].map((item, idx) => <Result main={item[0][0]} album={item[0][1]} key={idx}/>)
              }
              <button><Link href={`/input/${tok}`}>I want to discover more songs!</Link></button>
            </>: null
          }
        </div>
        }
      </main>
    </div>
  )
}