import axiosClient from '@/axios-client';
import { POKE_API_SPRITE_URL, POKE_API_URL } from '@/constants';
import { objectToQueryParams } from '@/utils';
import { useQuery } from 'react-query';

export default function usePokemonList(props?: UsePokemonListProps) {
  const page = props?.page ?? 0;
  const itemsPerPage = props?.itemsPerPage ?? 20;

  const {
    data: query,
    error,
    isLoading,
  } = useQuery(
    ['pokemon', page, itemsPerPage],
    () =>
      axiosClient.get<GetPokemonListResponse>(
        `${POKE_API_URL}/pokemon?${objectToQueryParams({
          offset: page * itemsPerPage,
          limit: itemsPerPage,
        })}`
      ),
    {
      onError(err) {
        console.error(err);
      },
    }
  );

  const items = query?.data?.results ?? [];
  // Transform each record to include a preview URL
  const itemsWithData = items.map((p) => {
    // Extract the Pokemon's ID from the record's URL
    const id = p.url.replace(`${POKE_API_URL}/pokemon`, '').replace(/\//g, '');
    // Construct a preview URL from the Pokemon's ID and POKE_API_SPRITE_URL
    const previewUrl = `${POKE_API_SPRITE_URL}/${id}.png`;
    return { ...p, id, previewUrl };
  });
  // Compute the total number of pages by dividing total items (count) with "items per page".
  // If the result is a decimal, then that means the page has extra space left - thus, apply Math.floor to it.
  const totalPages = query?.data.count ? Math.floor(query.data.count / itemsPerPage) : 0;

  return {
    items: itemsWithData,
    totalPages,
    error,
    isLoading,
  };
}

interface UsePokemonListProps {
  page?: number;
  itemsPerPage?: number;
}

interface PokemonResult {
  name: string;
  url: string;
}

interface GetPokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonResult[];
}
