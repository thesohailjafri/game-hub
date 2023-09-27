import { useQuery } from '@tanstack/react-query';
import APIClient from '../services/api-client';
import Game from '../types/Game';

const apiClient = new APIClient<Game>('/games');

const useGame = (slug: string) =>
  useQuery({
    queryKey: ['games', slug],
    queryFn: () => apiClient.getOne(slug),
  });

export default useGame;
