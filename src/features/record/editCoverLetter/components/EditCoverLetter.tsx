import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AiErrorModal from './AiErrorModal';
import AiGenerateModal from './AiGenerateModal';
import CoverLetterHeader from './CoverLetterHeader';

import useCoverLetterEdit from '@/features/record/editCoverLetter/hooks/useCoverLetterEdit';
import { MainStackNavigationProp } from '@/navigation/types/navigationTypes';
import { cn } from '@/shared/lib/cn';
import ConfirmModal from '@/shared/ui/organisms/ConfirmModal';
import PlusIcon from '@/static/icons/add.svg';
import TrashIcon from '@/static/icons/trash.svg';

const EditCoverLetter = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<MainStackNavigationProp>();

  const {
    coverLetters,
    currentIndex,
    currentItem,
    handleQuestionChange,
    handleAnswerChange,
    handleAddItem,
    handleDeleteItem,
    selectItem,
    handleSave,
    isSaving,
    isSaveSuccess,
    isGenerating,
    isAiModalVisible,
    aiGenerateCount,
    aiErrorType,
    openAiModal,
    closeAiModal,
    closeAiErrorModal,
    handleGenerateAiCoverLetter,
    isDirty,
  } = useCoverLetterEdit();

  const [isSaveSuccessModalVisible, setIsSaveSuccessModalVisible] =
    useState(false);

  const [isOnWritingModalVisible, setIsOnWritingModalVisible] = useState(false);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  useEffect(() => {
    if (isSaveSuccess) {
      setIsSaveSuccessModalVisible(true);
    }
  }, [isSaveSuccess]);

  return (
    <View className="flex-1 bg-surface-50">
      <CoverLetterHeader
        title="내 자기소개서"
        rightButtonText={isSaving ? '저장 중...' : '저장'}
        isRightButtonDisabled={isSaving || !isDirty}
        onRightButtonPress={handleSave}
        onBackButtonPress={() => {
          if (isDirty) {
            setIsOnWritingModalVisible(true);
            return;
          } else {
            navigation.goBack();
          }
        }}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ height: insets.top + 74 }} />
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View className="flex-1 flex-col justify-between">
              {/* 상단 영역 */}
              <View>
                {/* 탭 버튼 영역 */}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  nestedScrollEnabled={true}
                  contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                  }}>
                  <View className="flex-row items-center">
                    {coverLetters.map((_, index) => (
                      <Pressable
                        key={index}
                        onPress={() => selectItem(index)}
                        className={`mr-2 h-[36px] w-[36px] items-center justify-center rounded-2xl ${
                          currentIndex === index
                            ? 'bg-primary-purple'
                            : 'border-[1.5px] border-primary-purple bg-white'
                        }`}>
                        <Text
                          className={`typo-body-16-semibold ${
                            currentIndex === index
                              ? 'text-white'
                              : 'text-primary-purple'
                          }`}>
                          {index + 1}
                        </Text>
                      </Pressable>
                    ))}
                    <Pressable
                      onPress={handleAddItem}
                      className="h-[36px] w-[36px] items-center justify-center rounded-2xl border border-surface-300">
                      <PlusIcon width={16} height={16} color="#B7B7B7" />
                    </Pressable>
                  </View>
                </ScrollView>

                {/* 질문 입력 */}
                <View className="px-5">
                  <TextInput
                    className="rounded-[15px] border border-surface-200 bg-white px-4 py-3 typo-body-15-regular"
                    placeholder="질문을 작성해주세요."
                    placeholderTextColor="#B7B7B7"
                    value={currentItem?.question || ''}
                    onChangeText={handleQuestionChange}
                  />
                </View>

                {/* 답변 입력 */}
                <View className="mt-4 px-5">
                  <TextInput
                    className="h-[280px] rounded-[15px] border border-surface-200 bg-white px-4 py-3 typo-body-15-regular"
                    placeholder="답변을 작성해주세요."
                    placeholderTextColor="#B7B7B7"
                    multiline
                    textAlignVertical="top"
                    value={currentItem?.answer || ''}
                    onChangeText={handleAnswerChange}
                  />
                </View>
              </View>

              {/* 하단 영역 */}
              <View style={{ paddingBottom: insets.bottom + 20 }}>
                {/* AI 생성 영역 */}
                <View className="mt-6 items-center px-5">
                  <Text className="text-center text-surface-500 typo-body-16-medium">
                    하이유니가 내 후기글을 바탕으로
                  </Text>
                  <Text className="text-center text-surface-500 typo-body-16-medium">
                    자기소개를 작성해드려요!
                  </Text>

                  <Pressable
                    onPress={openAiModal}
                    disabled={aiGenerateCount === 0}
                    className={cn(
                      'mt-4 rounded-full px-[27px] py-[14px]',
                      aiGenerateCount === 0
                        ? 'bg-surface-300'
                        : 'bg-primary-purple',
                    )}>
                    <Text
                      className={cn(
                        'typo-body-16-medium',
                        aiGenerateCount === 0
                          ? 'text-white'
                          : 'text-surface-200',
                      )}>
                      AI 자기소개서 생성 ({aiGenerateCount}/5)
                    </Text>
                  </Pressable>
                </View>

                {/* 문항 삭제 버튼 */}
                <Pressable
                  onPress={() => setIsDeleteModalVisible(true)}
                  className="mt-6 flex-row items-center justify-center">
                  <TrashIcon width={18} height={18} color="#B7B7B7" />
                  <Text className="ml-1 text-surface-400 typo-body-15-medium">
                    문항 삭제하기
                  </Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* AI 생성 모달 */}
      <AiGenerateModal
        visible={isAiModalVisible}
        onClose={closeAiModal}
        onGenerate={handleGenerateAiCoverLetter}
        isLoading={isGenerating}
      />

      {/* AI 에러 모달 */}
      <AiErrorModal
        visible={aiErrorType !== null}
        errorType={aiErrorType}
        onClose={closeAiErrorModal}
      />

      {/* 저장 성공 모달 */}
      <ConfirmModal
        visible={isSaveSuccessModalVisible}
        title={'저장이 완료되었어요.'}
        confirmText={'네, 확인했어요.'}
        onConfirm={() => {
          setIsSaveSuccessModalVisible(false);
        }}
      />

      {/* 작성중 모달 */}
      {isOnWritingModalVisible && (
        <ConfirmModal
          visible={isOnWritingModalVisible}
          title={'작성 중인 내용이 있어요.\n이대로 나갈까요?'}
          confirmText={'아니요, 계속 작성할래요.'}
          cancelText={'네, 이대로 나갈게요.'}
          onClose={() => {
            navigation.goBack();
          }}
          onConfirm={() => {
            setIsOnWritingModalVisible(false);
          }}
          onCancel={() => {
            setIsOnWritingModalVisible(false);
          }}
        />
      )}

      {/* 문항 삭제 모달 */}
      {isDeleteModalVisible && (
        <ConfirmModal
          visible={isDeleteModalVisible}
          title={'해당 문항을 삭제할까요?'}
          confirmText={'네, 삭제할래요.'}
          cancelText={'아니요, 그대로 둘게요.'}
          onConfirm={() => {
            handleDeleteItem();
            setIsDeleteModalVisible(false);
          }}
          onClose={() => {
            setIsDeleteModalVisible(false);
          }}
        />
      )}
    </View>
  );
};

export default EditCoverLetter;
