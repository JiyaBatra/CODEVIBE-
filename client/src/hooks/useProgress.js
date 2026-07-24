import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import { useAuth } from '../AuthProvider';
import toast from 'react-hot-toast';

export const useProgress = () => {
  const { user, token } = useAuth();
  const queryClient = useQueryClient();

  const progressQuery = useQuery({
    queryKey: ['progress', user?.email],
    queryFn: async () => {
      if (!user?.email || !token) return null;
      const { data } = await axios.get(`${API_BASE_URL}/api/progress/${user.email}`);
      return data;
    },
    enabled: !!user?.email && !!token,
  });

  const completeLessonMutation = useMutation({
    mutationFn: async ({ lessonId, score, coins = 0, learningTime = 0, type = 'lesson' }) => {
      const { data } = await axios.post(`${API_BASE_URL}/api/lesson/${lessonId}/complete`, {
        email: user.email,
        score,
        coins,
        learningTime,
        type,
      });
      return data;
    },
    onSuccess: (data) => {
      // Invalidate both progress and analytics
      queryClient.invalidateQueries({ queryKey: ['progress', user?.email] });
      queryClient.invalidateQueries({ queryKey: ['analytics', user?.email] });
      toast.success(data.message || 'Lesson marked as completed');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to complete lesson');
    },
  });

  return {
    progress: progressQuery.data,
    isLoading: progressQuery.isLoading,
    isError: progressQuery.isError,
    error: progressQuery.error,
    completeLesson: completeLessonMutation.mutateAsync,
    isCompleting: completeLessonMutation.isPending,
  };
};
