import Head from 'next/head';

import Result from '../components/Result';

export default function Output(props) {
  return (
    <div className='bg-darkblue h-screen'>
      <Head>
        <title>Explorify</title>
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <main>
        <div className='max-w-6xl p-12 md:p-24 lg:p-48'>
          <h3>Here are the top 10 songs by <span className='font-bold'>Lizzy McAlpine</span>, ranked by similarity to your current music tastes.</h3>
          <p className='text-white underline mb-5 md:mb-12'>How was this calculated?</p>
          <Result main='Same Boat' album='Give Me A Minute' />
          <Result main='Pancakes for Dinner' album='Give Me A Minute' />
          <Result main='I Knew' album='Give Me A Minute' />
          <Result main='Over the Ocean Call' album='Give Me A Minute' />
        </div>
      </main>
    </div>
  )
}