import { useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { withdrawalAPI } from '../api/withdrawalAPI';

import { useRegisterStore } from '@/shared/stores/register';
import { useUserStore } from '@/shared/stores/user';

export const useAccountManageService = () => {
  const navigation = useNavigation();
  const { userSocialType, logout } = useUserStore();
  const { univ } = useRegisterStore();

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [withdrawalModalVisible, setWithdrawalModalVisible] = useState(false);
  const [withdrawalCompleteModalVisible, setWithdrawalCompleteModalVisible] =
    useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const handleBackPress = () => navigation.goBack();

  // 로그아웃 버튼 클릭
  const handleLogoutPress = () => {
    setLogoutModalVisible(true);
  };

  // 로그아웃 확인
  const handleLogoutConfirm = () => {
    setLogoutModalVisible(false);
    logout();
  };

  // 회원 탈퇴 버튼 클릭
  const handleWithdrawalPress = () => {
    setWithdrawalModalVisible(true);
  };

  // 회원 탈퇴 취소
  const handleWithdrawalCancel = () => {
    setWithdrawalModalVisible(false);
  };

  // 회원 탈퇴 실행
  const handleWithdrawalExecute = async () => {
    if (isWithdrawing) {
      return;
    }

    try {
      setIsWithdrawing(true);
      setWithdrawalModalVisible(false);

      await withdrawalAPI();

      setTimeout(() => {
        setWithdrawalCompleteModalVisible(true);
        setIsWithdrawing(false);
      }, 300);
    } catch (error) {
      console.error('회원 탈퇴 에러:', error);
    }
  };

  const handleWithdrawalComplete = () => {
    setWithdrawalCompleteModalVisible(false);
    setTimeout(() => {
      logout();
    }, 300);
  };

  return {
    userSocialType,
    univEmail: univ.univEmail,
    withdrawalModalVisible,
    logoutModalVisible,
    withdrawalCompleteModalVisible,
    setLogoutModalVisible,
    setWithdrawalModalVisible,
    setWithdrawalCompleteModalVisible,
    handleLogoutConfirm,
    handleBackPress,
    handleLogoutPress,
    handleWithdrawalPress,
    handleWithdrawalCancel,
    handleWithdrawalExecute,
    handleWithdrawalComplete,
  };
};
