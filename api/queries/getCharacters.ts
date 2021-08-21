import { request } from 'graphql-request';

import CHARACTERS_QUERY from '~/api/graphql/Characters.graphql';
import { Characters } from '~/api/graphql/types/Characters';
import { GRAPHQL_ENDPOINT } from '~/api/constants';

import notEmpty from '~/utils/notEmpty';

const getCharacters = async () => {
  const { characters } = await request<Characters>(
    GRAPHQL_ENDPOINT,
    CHARACTERS_QUERY,
  );

  return characters?.results?.filter(notEmpty) || [];
};

export default getCharacters;
