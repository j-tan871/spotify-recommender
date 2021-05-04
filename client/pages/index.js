import Head from 'next/head'

export default function Home() {
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
          <button>Let's go!</button>
        </div>
      </main>
    </div>
  )
}
