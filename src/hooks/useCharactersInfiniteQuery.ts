import {api} from '@src/api';
import {AxiosError} from 'axios';
import {useInfiniteQuery, UseInfiniteQueryOptions} from 'react-query';

const limit = 20;
type Response = {
  offset: number;
  count: number;
  results: Character[];
};
export function useCharachtersInfiniteQuery(
  searchKeyword: string | null = null,
  options: UseInfiniteQueryOptions<Response, AxiosError> = {},
) {
  return useInfiniteQuery<Response, AxiosError>(
    ['list', searchKeyword],
    ({pageParam = 0}) =>
      api
        .get('characters', {params: {limit, offset: pageParam, nameStartsWith: searchKeyword}})
        .then(res => res.data.data),
    {
      ...options,
      enabled: searchKeyword === null || searchKeyword !== '',
      getNextPageParam: ({count, offset}) => count + offset,
    },
  );
}
