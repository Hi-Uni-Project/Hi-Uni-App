import React from 'react';

import { Modal, View, Text } from 'react-native';

import StatusIcons from '@/shared/icons/StatusIcons';
import HUModalButton from '@/shared/ui/atoms/HUModalButton';

type Props = {
  visible: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  status?: 'caution';
};

const ConfirmModal = ({
  visible,
  onClose,
  title,
  description,
  confirmText,
  cancelText = '취소',
  onConfirm,
  onCancel,
  status = 'caution',
}: Props) => {
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
              status={status}
              width={28}
              height={28}
              color="#5B5B5B"
            />
          </View>

          <Text
            className="mb-[11px] text-center text-main-text typo-title-22-semibold"
            style={{ lineHeight: 27.5 }}>
            {title}
          </Text>

          {description && (
            <Text className="mb-6 text-center text-surface-600 typo-14-regular">
              {description}
            </Text>
          )}

          <HUModalButton
            text={confirmText}
            onPress={() => {
              onConfirm();
              onClose();
            }}
          />

          {cancelText && (
            <View className="mt-3">
              <HUModalButton
                text={cancelText}
                variant="gray"
                onPress={() => {
                  onCancel?.();
                  onClose();
                }}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;
