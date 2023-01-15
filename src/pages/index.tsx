import { PokemonList } from '@/components/PokemonList';
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
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Pokemon List</h1>
        <PokemonList />
      </main>
    </>
  );
}
