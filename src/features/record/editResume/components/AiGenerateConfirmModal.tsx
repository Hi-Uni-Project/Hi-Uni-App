import React from 'react';

import { Modal, View, Text } from 'react-native';

import StatusIcons from '@/shared/icons/StatusIcons';
import HUModalButton from '@/shared/ui/atoms/HUModalButton';

interface AiGenerateConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const AiGenerateConfirmModal = ({
  visible,
  onClose,
  onConfirm,
  onCancel,
}: AiGenerateConfirmModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="w-[85%] rounded-2xl bg-white p-5">
          <View className="mb-3 items-center">
            <StatusIcons
              status="check"
              width={30}
              height={30}
              color="#5B5B5B"
            />
          </View>

          <Text
            className="mb-[11px] text-center text-main-text typo-sub-title-22-semibold"
            style={{ lineHeight: 27.5 }}>
            {'AI가 내 소개를\n생성해 드릴까요?'}
          </Text>

          <Text className="mb-6 text-center text-surface-600 typo-caption-14-regular">
            이력서 정보를 바탕으로 소개를 작성합니다.
          </Text>

          <HUModalButton text="네, 생성해 주세요" onPress={onConfirm} />

          <View className="mt-3">
            <HUModalButton
              text="아니요"
              variant="gray"
              onPress={() => {
                onCancel();
                onClose();
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AiGenerateConfirmModal;
