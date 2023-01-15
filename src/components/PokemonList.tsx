import usePokemonList from '@/hooks/use-pokemon-list';
import classNames from 'classnames';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ItemsPerPage } from './ItemsPerPage';
import { Pagination } from './Pagination';

export function PokemonList() {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const { items, totalPages, isLoading } = usePokemonList({ page, itemsPerPage });

  // Ensure that page is always less than totalPages, even if we change itemsPerPage.
  useEffect(() => {
    if (totalPages !== 0 && page + 1 > totalPages) {
      setPage(totalPages - 1);
    }
  }, [itemsPerPage, page, totalPages]);

  return (
    <div className="p-4">
      <div className="p-2 flex items-start bg-slate-300 mb-4">
        <Pagination value={page} totalPages={totalPages} onChange={setPage} />
        <div className="px-1" />
        <ItemsPerPage value={itemsPerPage} onChange={setItemsPerPage} />
      </div>

      <p className={classNames({ hidden: !isLoading })}>Loading pokemon...</p>
      <div className={classNames({ hidden: isLoading })}>
        <p>
          Page {page + 1} / {totalPages}
        </p>
        <table className="table-auto border border-slate-500">
          <thead>
            <tr>
              <th className="border border-slate-500">#</th>
              <th className="border border-slate-500">Image</th>
              <th className="border border-slate-500">Pokemon</th>
            </tr>
          </thead>
          <tbody>
            {items.map((pokemon, i) => (
              <tr key={i}>
                <td className="border border-slate-500 px-4">{pokemon.id}</td>
                <td className="border border-slate-500 p-2">
                  <Image src={pokemon.previewUrl} alt={pokemon.name} width={50} height={50} />
                </td>
                <td className="border border-slate-500 px-4">{pokemon.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
