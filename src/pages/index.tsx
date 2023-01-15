import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Pokemon List</title>
        <meta name="description" content="A list of Pokemon" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-2xl">Pokemon List</h1>
      </main>
    </>
  );
}
