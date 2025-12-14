import React from 'react';

import { View } from 'react-native';

import AccountInfoCard from '@/features/mypage/accountManage/components/AccountInfoCard';
import ActionButton from '@/features/mypage/accountManage/components/ActionButton';
import { useAccountManageService } from '@/features/mypage/accountManage/hooks/accountManageService';
import MypageHeader from '@/features/mypage/main/components/MypageHeader';
import ConfirmModal from '@/shared/ui/organisms/ConfirmModal';

const AccountManage = () => {
  const {
    userSocialType,
    univEmail,
    logoutModalVisible,
    withdrawalModalVisible,
    withdrawalCompleteModalVisible,
    setLogoutModalVisible,
    setWithdrawalModalVisible,
    setWithdrawalCompleteModalVisible,
    handleBackPress,
    handleLogoutPress,
    handleWithdrawalPress,
    handleWithdrawalCancel,
    handleWithdrawalExecute,
    handleWithdrawalComplete,
    handleLogoutConfirm,
  } = useAccountManageService();

  return (
    <View className="flex-1 bg-surface-50">
      <MypageHeader title="계정 관리" onBackPress={handleBackPress} />

      <View className="mt-4">
        <AccountInfoCard socialTypes={userSocialType} email={univEmail} />

        <ActionButton label="회원 탈퇴" onPress={handleWithdrawalPress} />

        <ActionButton label="로그아웃" onPress={handleLogoutPress} />
      </View>

      <ConfirmModal
        visible={logoutModalVisible}
        title={'로그아웃 하시겠어요?\n언제든 다시 돌아올 수 있어요.'}
        confirmText="아니요, 유지할래요."
        cancelText="네, 로그아웃 할게요."
        status="caution"
        onClose={() => setLogoutModalVisible(false)}
        onConfirm={() => setLogoutModalVisible(false)}
        onCancel={handleLogoutConfirm}
      />

      <ConfirmModal
        visible={withdrawalModalVisible}
        title={'탈퇴하시면 모든 활동내역이\n삭제돼요. 그래도 탈퇴할까요?'}
        confirmText="아니요, 아직은 함께할래요."
        cancelText="네, 탈퇴할게요."
        status="caution"
        onClose={() => setWithdrawalModalVisible(false)}
        onConfirm={handleWithdrawalCancel}
        onCancel={handleWithdrawalExecute}
      />

      <ConfirmModal
        icon={false}
        visible={withdrawalCompleteModalVisible}
        title={'탈퇴가 완료되었어요.\n다음에 또 만나요 👋'}
        confirmText="메인으로 돌아가기"
        onClose={() => setWithdrawalCompleteModalVisible(false)}
        onConfirm={handleWithdrawalComplete}
      />
    </View>
  );
};

export default AccountManage;
