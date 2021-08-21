import { request } from 'graphql-request';
import { QueryClient, useQuery } from 'react-query';
import { useState } from 'react';

import CHARACTERS_QUERY from '~/api/graphql/Characters.graphql';
import {
  Characters,
  CharactersVariables,
} from '~/api/graphql/types/Characters';
import { GRAPHQL_ENDPOINT } from '~/api/constants';

export const CHARACTERS_KEY = 'characters';

const getCharacters = async (variables: CharactersVariables) => {
  const { characters } = await request<Characters, CharactersVariables>(
    GRAPHQL_ENDPOINT,
    CHARACTERS_QUERY,
    variables,
  );

  return characters;
};

const INITIAL_PAGE = 1;

export function useCharacters() {
  const [page, setPage] = useState(INITIAL_PAGE);
  const queryResult = useQuery(
    [CHARACTERS_KEY, page],
    () => getCharacters({ page }),
    { keepPreviousData: true },
  );

  const hasMore = queryResult.data?.info?.next !== null;

  return { ...queryResult, hasMore, page, setPage };
}

export function prefetchCharacters(queryClient: QueryClient) {
  return queryClient.prefetchQuery([CHARACTERS_KEY, INITIAL_PAGE], () =>
    getCharacters({ page: INITIAL_PAGE }),
  );
}
