import config from '@/config';
import { axiosClient, axiosPrivate } from '@/config/axios';
import { MembershipPlan, User } from '@/types';
import { API_ENDPOINTS } from '@/utils/api';
import { notification } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSubscription = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isCancelModalVisible, setIsCancelModalVisible] =
    useState<boolean>(false);

  const [subscriptions, setSubscriptions] = useState<MembershipPlan | null>(
    null,
  );
  const [userSubscription, setUserSubscription] = useState<User | null>(null);

  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [daysRemaining, setDaysRemaining] = useState<number>(0);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [isExpiringSoon, setIsExpiringSoon] = useState<boolean>(false);

  const handleCancelPlan = async () => {
    if (!subscriptions) return;

    setLoading(true);
    try {
      await axiosPrivate.delete(API_ENDPOINTS.users.membership);
      notification.success({
        message: 'Subscription Canceled',
        description: 'Your subscription has been canceled.',
        placement: 'topRight',
      });
      setSubscriptions(null);
      setIsExpired(true);
      await fetchUserSubscription();
    } catch (error) {
      console.error('Error canceling subscription:', error);
    } finally {
      setLoading(false);
      setIsCancelModalVisible(false);
    }
  };

  //* Lấy thông tin user subscription
  const fetchUserSubscription = async () => {
    try {
      const response = await axiosPrivate.get(API_ENDPOINTS.users.selfUser);
      const userData = response.data.data;
      setUserSubscription(userData);

      if (userData.membership.dueDate) {
        const expirationDate = new Date(userData.membership.dueDate * 1000);
        setDueDate(expirationDate);

        const now = new Date();
        const diffTime = expirationDate.getTime() - now.getTime();
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        setDaysRemaining(daysLeft);
        setIsExpiringSoon(daysLeft <= 30 && daysLeft > 0);
        setIsExpired(daysLeft <= 0);
      } else {
        setDueDate(null);
      }
    } catch (error) {
      console.error('Error fetching user subscription:', error);
    }
  };

  //* Tự động hủy subscription khi hết hạn
  useEffect(() => {
    if (isExpired && subscriptions && subscriptions.type !== 'free') {
      handleAutoCancelPlan();
    }
  }, [isExpired, subscriptions]);

  //* Lấy chi tiết subscription
  const fetchSubscriptions = async (plan: string) => {
    try {
      const response = await axiosClient.get(
        `${API_ENDPOINTS.membership.getMembershipByType}/${plan}`,
      );
      setSubscriptions(response.data?.data?.[0] || null);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      setSubscriptions(null);
    }
  };

  useEffect(() => {
    fetchUserSubscription();
  }, []);

  useEffect(() => {
    if (userSubscription) {
      fetchSubscriptions(userSubscription.membership.plan);
    }
  }, [userSubscription]);

  const handleAutoCancelPlan = async () => {
    setLoading(true);
    try {
      await axiosPrivate.delete(API_ENDPOINTS.users.membership);
      notification.warning({
        message: 'Subscription Expired',
        description:
          'Your subscription has expired and was automatically canceled.',
        placement: 'topRight',
      });
      setSubscriptions(null);
    } catch (error) {
      console.error('Error auto-canceling subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePlan = () => {
    if (subscriptions?.type !== 'free') {
      notification.warning({
        message: 'Cannot Update Plan',
        description: 'Please cancel your current membership before updating.',
        placement: 'topRight',
      });
    } else {
      navigate(config.routes.public.pricing);
    }
  };

  const handleCancelButton = () => {
    if (!subscriptions) {
      notification.info({
        message: 'No Active Membership',
        description: "You don't have an active membership plan.",
        placement: 'topRight',
      });
    } else if (subscriptions?.type === 'free') {
      notification.info({
        message: 'Cannot Cancel Free Plan',
        description: 'You cannot cancel the free plan.',
        placement: 'topRight',
      });
    } else {
      setIsCancelModalVisible(true);
    }
  };

  const handleIsCancelModalVisible = () => {
    setIsCancelModalVisible(false);
  };

  return {
    subscriptions,
    handleCancelPlan,
    handleUpdatePlan,
    loading,
    isCancelModalVisible,
    handleCancelButton,
    handleIsCancelModalVisible,
    dueDate,
    daysRemaining,
    isExpired,
    isExpiringSoon,
  };
};
