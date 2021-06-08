import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { AxiosResponse } from 'axios';
import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type ImageData = {
  title: string;
  description: string;
  url: string;
  ts: string;
  id: string;
};

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    async ({ pageParam = null }) => {
      const response = await api.get('/api/images', {
        params: {
          after: pageParam,
        },
      });

      console.log(response);
      return response;
    },
    {
      getNextPageParam: lastPage => {
        return lastPage.data.after ?? null;
      },
    }
  );

  const formattedData = useMemo(() => {
    data?.pages.map(page => page.data.data).flat();
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {isFetchingNextPage ? (
          <Button>Carregando...</Button>
        ) : (
          <Button onClick={() => fetchNextPage()}>Carregar mais...</Button>
        )}
      </Box>
    </>
  );
}
