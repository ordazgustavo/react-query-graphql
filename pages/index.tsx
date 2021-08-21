import { request, gql } from 'graphql-request';
import { useQuery } from 'react-query';

const query = gql`
  query {
    characters {
      info {
        count
      }
      results {
        name
      }
    }
  }
`;

const endpoint = process.env.NEXT_PUBLIC_API_URL!;

function useCharacters() {
  return useQuery('characters', async () => {
    const { characters } = await request(endpoint, query);

    return characters.results;
  });
}

export default function Index() {
  const { data } = useCharacters();
  console.log(data, endpoint);
  return <div>Hello</div>;
}
