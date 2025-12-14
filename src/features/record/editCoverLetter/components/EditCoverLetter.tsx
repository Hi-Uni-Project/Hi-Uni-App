import React, { useState } from 'react';

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

import CoverLetterHeader from './CoverLetterHeader';

import useCoverLetterEdit from '@/features/record/editCoverLetter/hooks/useCoverLetterEdit';
import PlusIcon from '@/static/icons/add.svg';
import TrashIcon from '@/static/icons/trash.svg';

const EditCoverLetter = () => {
  const insets = useSafeAreaInsets();

  const {
    coverLetters,
    currentIndex,
    currentItem,
    handleQuestionChange,
    handleAnswerChange,
    handleAddItem,
    handleDeleteItem,
    selectItem,
    getRequestData,
  } = useCoverLetterEdit();

  const [aiGenerateCount] = useState(5);

  const handleAiGenerate = () => {
    console.log('AI 자기소개서 생성');
  };

  const handleSave = () => {
    const requestData = getRequestData();
    console.log('저장:', requestData);
  };

  return (
    <View className="flex-1 bg-surface-50">
      <CoverLetterHeader
        title="내 자기소개서"
        rightButtonText="저장"
        onRightButtonPress={handleSave}
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
                    onPress={handleAiGenerate}
                    className="mt-4 rounded-full bg-primary-purple px-6 py-3">
                    <Text className="text-white typo-body-15-semibold">
                      AI 자기소개서 생성 ({aiGenerateCount}/5)
                    </Text>
                  </Pressable>
                </View>

                {/* 문항 삭제 버튼 */}
                <Pressable
                  onPress={handleDeleteItem}
                  className="mt-6 flex-row items-center justify-center">
                  <TrashIcon width={16} height={16} color="#B7B7B7" />
                  <Text className="typo-body-14-regular ml-1 text-surface-400">
                    문항 삭제하기
                  </Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditCoverLetter;
