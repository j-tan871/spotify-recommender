import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [authUrl, setAuthUrl] = useState(null);

  useEffect(() => {
    const auth = async () => {
      try {
        const response = await fetch(`https://explorify-api.herokuapp.com/`, {
          method: 'GET', 
        });
        const data = await response.json();
        setAuthUrl(data['url']);
      } catch (err) {
        console.log(err);
      }
    };
    auth();
  }, []);


  return (
    <div className='bg-darkblue flex items-center justify-center h-screen p-5 md:p-12'>
      <Head>
        <title>Explorify</title>
        <meta name="description" content="Spotify song recommender" />
        <link rel="icon" href="/favicon.ico" />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <main>
        <div className='max-w-3xl'>
          <h1>Explorify</h1>
          <h2 className='pt-1 md:pt-2'>A Spotify song recommender</h2>
          <h3 className='pt-12'>Search for an artist.</h3>
          <h3>Find songs you'll like based on your current music tastes.</h3>
          <p className='text-white mt-2'>The page may take some time to load, since the backend is hosted on Heroku's free tier. If the button doesn't work, refresh the page and try again!</p>
          <button className='bg-pink'><a href={authUrl}>Let's go!</a></button>
        </div>
      </main>
    </div>
  )
}
