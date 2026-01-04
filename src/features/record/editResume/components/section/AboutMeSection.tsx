import React, { useState } from 'react';

import {
  Pressable,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Modal,
} from 'react-native';

import AiGenerateConfirmModal from '../AiGenerateConfirmModal';

import ConfirmModal from '@/shared/ui/organisms/ConfirmModal';
import InfoIcon from '@/static/icons/info.svg';

interface AboutMeSectionProps {
  aboutMe: string;
  aboutMeCnt: number;
  isGenerating: boolean;
  isPostNotFoundError: boolean;
  isQuotaExceededError: boolean;
  onAboutMeChange: (text: string) => void;
  onGeneratePress: () => void;
  onErrorModalClose: () => void;
}

const AboutMeSection = ({
  aboutMe,
  aboutMeCnt,
  isGenerating,
  isPostNotFoundError,
  isQuotaExceededError,
  onAboutMeChange,
  onGeneratePress,
  onErrorModalClose,
}: AboutMeSectionProps) => {
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [isGenerateModalVisible, setIsGenerateModalVisible] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [isPostNotFoundModalVisible, setIsPostNotFoundModalVisible] =
    useState(false);

  const handleGenerateButtonPress = () => {
    if (isPostNotFoundError === true) {
      setIsPostNotFoundModalVisible(true);
      return;
    }

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
          <View className="relative">
            <Pressable
              onPress={() => {
                setIsInfoVisible(!isInfoVisible);

                setTimeout(() => {
                  setIsInfoVisible(false);
                }, 2000);
              }}>
              <InfoIcon color="#B7B7B7" width={26} height={26} />
            </Pressable>
            {isInfoVisible && (
              <View className="absolute -right-24 top-8 z-50 w-[240px] rounded-[10px] bg-surface-800 p-3">
                <Text className="typo-caption-12-regular text-white">
                  ‘AI 내 소개 생성’은 적어주신 내 후기글을 바탕으로
                  작성해드려요.
                </Text>
              </View>
            )}
          </View>
          <Pressable
            className="ml-[5px]"
            onPress={handleGenerateButtonPress}
            disabled={isGenerating || aboutMeCnt <= 0}>
            <View
              className={`flex-row items-center rounded-full px-4 py-2 ${
                isGenerating || aboutMeCnt <= 0
                  ? 'bg-surface-300'
                  : 'bg-primary-purple'
              }`}>
              <Text className="text-surface-200 typo-body-15-medium">
                {isGenerating
                  ? 'AI 생성 중...'
                  : `AI 내 소개 생성 (${aboutMeCnt}/5)`}
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View className="relative">
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
          editable={!isGenerating}
        />
      </View>

      {/* AI 생성 중 로딩 모달 */}
      <Modal transparent visible={isGenerating} animationType="fade">
        <View className="flex-1 items-center justify-center bg-black/50">
          <View className="items-center justify-center rounded-[20px] bg-white p-8">
            <ActivityIndicator size="large" color="#7C4DFF" />
            <Text className="mt-4 text-main-text typo-body-16-medium">
              AI가 소개를 생성하고 있어요...
            </Text>
          </View>
        </View>
      </Modal>

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
        visible={isPostNotFoundModalVisible}
        onClose={() => setIsPostNotFoundModalVisible(false)}
        title={'현재 내 후기글이 없어\n내 소개를 생성할 수 없어요.'}
        description="후기를 1개 이상 작성 후 내 소개 생성을 눌러주세요."
        confirmText="확인"
        onConfirm={() => setIsPostNotFoundModalVisible(false)}
      />

      {/* 생성 횟수 초과 에러 모달 */}
      <ConfirmModal
        visible={isQuotaExceededError}
        onClose={onErrorModalClose}
        title={'생성 횟수를 모두 사용했어요'}
        description="내 소개 생성은 5회까지 가능합니다."
        confirmText="확인"
        onConfirm={onErrorModalClose}
      />
    </View>
  );
};

export default AboutMeSection;
