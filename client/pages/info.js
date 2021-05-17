import Head from 'next/head';
import { useRouter } from 'next/router'

export default function Info() {
  const router = useRouter()
  return (
    <div className='bg-darkblue h-auto lg:pb-36 min-h-screen'>
      <Head>
        <title>Explorify</title>
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <main className='p-12 lg:pt-24 lg:mx-24 lg:w-1/2'>
        <h2>Calculating song similarity</h2>
        <br />
        <p className='text-white md:text-lg'>in progress</p>
        {/* <p className='text-white md:text-lg'>
          The K-means algorithm and K-nearest neighbors algorithm are used to calculate song similarity and return results. 
        </p>
        <br />
        <p className='text-white md:text-lg'>
          The Spotify API returns characteristics of songs, such as danceability, energy, speechiness, acousticness, etc. 
        </p>
        <br />
        <p className='text-white md:text-lg'>
          Songs that are on average nearer to your current top 10 songs, or the characteristics that you input, are ranked higher in your results. 
        </p> */}
        <button className='bg-pink' onClick={() => router.back()}>Go back</button>
      </main>
    </div>
  )
}