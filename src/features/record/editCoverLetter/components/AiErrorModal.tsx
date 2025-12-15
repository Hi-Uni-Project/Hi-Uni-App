import React from 'react';

import { Modal, Pressable, Text, View } from 'react-native';

import StatusIcons from '@/shared/icons/StatusIcons';

type AiErrorType = 'limitExceeded' | 'noReview' | null;

interface Props {
  visible: boolean;
  errorType: AiErrorType;
  onClose: () => void;
}

const AiErrorModal = ({ visible, errorType, onClose }: Props) => {
  const getErrorContent = () => {
    if (errorType === 'limitExceeded') {
      return {
        title: (
          <Text
            className="mb-5 text-center text-main-text typo-sub-title-22-semibold"
            style={{ lineHeight: 27.5 }}>
            AI 자기소개서 생성 5회를{'\n'}모두 사용하였어요.
          </Text>
        ),
      };
    }

    if (errorType === 'noReview') {
      return {
        title: (
          <Text className="text-center text-surface-600 typo-caption-14-regular">
            현재 내 후기글이 없어{'\n'}자기소개서를 생성할 수 없어요.{'\n'}
            <Text className="font-semibold text-primary-purple">
              후기를 1개 이상
            </Text>
            {' 작성 후\n자기소개서 생성을 눌러주세요.'}
          </Text>
        ),
      };
    }

    return { title: '' };
  };

  const { title } = getErrorContent();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent>
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="w-[85%] rounded-2xl bg-white p-5">
          <View className="mb-3 items-center">
            <StatusIcons
              status="caution"
              width={30}
              height={30}
              color="#5B5B5B"
            />
          </View>

          <Text
            className="mb-5 text-center text-main-text typo-sub-title-22-semibold"
            style={{ lineHeight: 27.5 }}>
            {title}
          </Text>

          <Pressable
            onPress={onClose}
            className="items-center rounded-xl bg-primary-purple py-4">
            <Text className="text-white typo-body-16-semibold">
              네, 확인했어요.
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default AiErrorModal;
