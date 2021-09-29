import {api} from '@src/api';
import {useQueries, useQuery, UseQueryResult} from 'react-query';

export function useResources(id: number) {
  return useQueries([
    {
      queryKey: ['stories', id],
      queryFn: () => api.get(`characters/${id}/stories`).then(res => res.data.data.results),
    },
    {
      queryKey: ['comics', id],
      queryFn: () => api.get(`characters/${id}/comics`).then(res => res.data.data.results),
    },
    {
      queryKey: ['events', id],
      queryFn: () => api.get(`characters/${id}/events`).then(res => res.data.data.results),
    },
    {
      queryKey: ['series', id],
      queryFn: () => api.get(`characters/${id}/series`).then(res => res.data.data.results),
    },
  ]) as [
    UseQueryResult<Resource[]>,
    UseQueryResult<Resource[]>,
    UseQueryResult<Resource[]>,
    UseQueryResult<Resource[]>,
  ];
}
