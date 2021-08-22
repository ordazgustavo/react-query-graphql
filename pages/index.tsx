import { GetStaticProps } from 'next';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import { useCharacters, prefetchCharacters } from '~/api/queries/getCharacters';
import notEmpty from '~/utils/notEmpty';

function Index() {
  const {
    data,
    isLoading,
    isError,
    isPreviousData,
    isFetching,
    hasMore,
    page,
    setPage,
  } = useCharacters();

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error</div>
      ) : (
        <div>
          {data?.results?.filter(notEmpty).map(character => (
            <p key={character.id}>{character.name}</p>
          ))}
        </div>
      )}
      <span>Current Page: {page}</span>
      <button
        onClick={() => setPage(old => Math.max(old - 1, 1))}
        disabled={page === 1}
      >
        Previous Page
      </button>{' '}
      <button
        onClick={() => {
          if (!isPreviousData && hasMore) {
            setPage(old => old + 1);
          }
        }}
        // Disable the Next Page button until we know a next page is available
        disabled={isPreviousData || !hasMore}
      >
        Next Page
      </button>
      {isFetching ? <span> Loading...</span> : null}{' '}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await prefetchCharacters(queryClient);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Index;
