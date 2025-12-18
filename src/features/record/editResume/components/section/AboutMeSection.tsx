import React, { useState } from 'react';

import { Pressable, Text, TextInput, View } from 'react-native';

import AiGenerateConfirmModal from '../AiGenerateConfirmModal';

import ConfirmModal from '@/shared/ui/organisms/ConfirmModal';
import InfoIcon from '@/static/icons/info.svg';

interface AboutMeSectionProps {
  aboutMe: string;
  aboutMeCnt: number;
  isGenerating: boolean;
  isPostNotFoundError: boolean;
  onAboutMeChange: (text: string) => void;
  onGeneratePress: () => void;
  onErrorModalClose: () => void;
}

const AboutMeSection = ({
  aboutMe,
  aboutMeCnt,
  isGenerating,
  isPostNotFoundError,
  onAboutMeChange,
  onGeneratePress,
  onErrorModalClose,
}: AboutMeSectionProps) => {
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [isGenerateModalVisible, setIsGenerateModalVisible] = useState(false);

  const handleGenerateButtonPress = () => {
    if (aboutMe.trim().length > 0) {
      setIsConfirmModalVisible(true);
    } else {
      setIsGenerateModalVisible(true);
    }
  };

  const handleConfirmGenerate = () => {
    setIsConfirmModalVisible(false);
    onGeneratePress();
  };

  const handleGenerate = () => {
    setIsGenerateModalVisible(false);
    onGeneratePress();
  };

  return (
    <View className="mt-6 px-5">
      <View className="flex-row items-center justify-between">
        <Text className="typo-body-17-semibold">내 소개</Text>
        <View className="flex-row items-center">
          <Pressable>
            <InfoIcon color="#B7B7B7" width={26} height={26} />
          </Pressable>
          <Pressable
            className="ml-[5px]"
            onPress={handleGenerateButtonPress}
            disabled={isGenerating || aboutMeCnt <= 0}>
            <View className="flex-row items-center rounded-full bg-primary-purple px-4 py-2">
              <Text className="text-surface-200 typo-body-15-medium">
                {isGenerating
                  ? 'AI 생성 중...'
                  : `AI 내 소개 생성 (${aboutMeCnt}/5)`}
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
      <TextInput
        className="mt-[9px] min-h-[120px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
        placeholder="나를 어필할 수 있는 소개를 작성해보세요! (최대 800자)"
        placeholderTextColor={'#B7B7B7'}
        value={aboutMe}
        textAlignVertical="top"
        onChangeText={onAboutMeChange}
        maxLength={800}
        multiline={true}
        numberOfLines={4}
      />

      {/* 기존 내용이 있을 때 - 삭제 경고 모달 */}
      <ConfirmModal
        visible={isConfirmModalVisible}
        onClose={() => setIsConfirmModalVisible(false)}
        title={'기존 내용이 삭제되고,\n새로운 소개가 생성됩니다.'}
        description={`남은 횟수 : ${aboutMeCnt}회`}
        confirmText="네, 내 소개를 생성할게요."
        cancelText="아니요, 계속 작성할래요."
        onConfirm={handleConfirmGenerate}
        onCancel={() => setIsConfirmModalVisible(false)}
      />

      {/* 기존 내용이 없을 때 - 생성 확인 모달 */}
      <AiGenerateConfirmModal
        visible={isGenerateModalVisible}
        onClose={() => setIsGenerateModalVisible(false)}
        onConfirm={handleGenerate}
        onCancel={() => setIsGenerateModalVisible(false)}
      />

      {/* 후기글이 없어서 생성 불가 에러 모달 */}
      <ConfirmModal
        visible={isPostNotFoundError}
        onClose={onErrorModalClose}
        title={'내 소개를 생성할 수 없습니다'}
        description="작성된 후기글이 없어 AI가 소개를 생성할 수 없습니다."
        confirmText="확인"
        onConfirm={onErrorModalClose}
      />
    </View>
  );
};

export default AboutMeSection;
