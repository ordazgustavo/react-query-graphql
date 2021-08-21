import { request } from 'graphql-request';
import { useQuery } from 'react-query';

import CHARACTERS_QUERY from '../api/graphql/Characters.graphql';
import { Characters } from '../api/graphql/types/Characters';

const endpoint = process.env.NEXT_PUBLIC_API_URL!;

function useCharacters() {
  return useQuery('characters', async () => {
    const { characters } = await request<Characters>(
      endpoint,
      CHARACTERS_QUERY,
    );

    return characters?.results;
  });
}

export default function Index() {
  const { data } = useCharacters();
  console.log(data);
  return (
    <div>
      Rick and Morty
      <ul>
        {data?.map(char => (
          <li>{char?.name}</li>
        ))}
      </ul>
    </div>
  );
}
