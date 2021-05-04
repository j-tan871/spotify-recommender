import Head from 'next/head';
import { useRouter } from 'next/router';
import { React, useEffect, useState } from 'react';

import Result from '../../components/Result';

export default function Output() {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      if (!id) {
        return;
      }

      try {
        console.log(id);
        console.log(`${id}`);
        const response = await fetch(`http://localhost:5000/results/${id}`, {
          method: 'GET',
        });
        const responseData = await response.json();
        setData(responseData);
        console.log('hi')
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSongs();
  }, [id]);

  return (
    <div className='bg-darkblue h-auto'>
      <Head>
        <title>Explorify</title>
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <main>
        <div className='max-w-6xl py-12 md:pt-24 lg:pt-36 px-12 md:pl-24 lg:pl-36'>
          {
            data ? <>
              <h3>Here are the top songs by <span className='font-bold'>{data['name']}</span>, ranked by similarity to your current music tastes.</h3>
              <p className='text-white underline mb-5 md:mb-12'>How was this calculated?</p>
              {
                data['distances'].map((item, idx) => <Result main={item[0][0]} album={item[0][1]} key={idx}/>)
              }
            </>: null
          }
        </div>
      </main>
    </div>
  )
}