import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import { useAuth } from '../AuthProvider';

export const useDashboard = () => {
  const { user, token } = useAuth();

  const analyticsQuery = useQuery({
    queryKey: ['analytics', user?.email],
    queryFn: async () => {
      if (!user?.email || !token) return null;
      const { data } = await axios.get(`${API_BASE_URL}/api/analytics/${user.email}`);
      return data;
    },
    enabled: !!user?.email && !!token,
  });

  return {
    analytics: analyticsQuery.data,
    isLoading: analyticsQuery.isLoading,
    isError: analyticsQuery.isError,
    error: analyticsQuery.error,
    refetch: analyticsQuery.refetch,
  };
};
