import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import API_BASE_URL from '../config/api';

export const useLeaderboard = ({ page = 1, limit = 20, type = 'global', courseId = '' } = {}) => {
  const leaderboardQuery = useQuery({
    queryKey: ['leaderboard', type, courseId, page, limit],
    queryFn: async () => {
      let endpoint = `${API_BASE_URL}/api/progress/leaderboard?page=${page}&limit=${limit}`;
      if (type === 'exam') {
        endpoint = `${API_BASE_URL}/api/exam/leaderboard?courseId=${courseId}&page=${page}&limit=${limit}`;
      } else if (type === 'contributor') {
        endpoint = `${API_BASE_URL}/api/contributors?page=${page}&limit=${limit}`;
      }
      
      const { data } = await axios.get(endpoint);
      return data;
    },
    keepPreviousData: true,
  });

  return {
    leaderboard: leaderboardQuery.data,
    isLoading: leaderboardQuery.isLoading,
    isError: leaderboardQuery.isError,
    error: leaderboardQuery.error,
  };
};
