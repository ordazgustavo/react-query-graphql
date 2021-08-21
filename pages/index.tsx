import { GetStaticProps } from 'next';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import getCharacters from '~/api/queries/getCharacters';

function Index() {
  const { data } = useQuery('characters', getCharacters);

  return (
    <div>
      Rick and Morty
      <ul>
        {data?.map(char => (
          <li key={char.id}>{char?.name}</li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('characters', getCharacters);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Index;
