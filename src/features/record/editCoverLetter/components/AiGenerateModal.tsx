import React, { useState } from 'react';

import {
  ActivityIndicator,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';

import CloseIcon from '@/static/icons/close.svg';

type Props = {
  visible: boolean;
  onClose: () => void;
  onGenerate: (params: { role: string; question: string }) => void;
  isLoading: boolean;
};

const AiGenerateModal = ({
  visible,
  onClose,
  onGenerate,
  isLoading,
}: Props) => {
  const [role, setRole] = useState('');
  const [question, setQuestion] = useState('');

  const handleGenerate = () => {
    if (!role.trim() || !question.trim()) {
      return;
    }
    onGenerate({ role: role.trim(), question: question.trim() });
    setRole('');
    setQuestion('');
  };

  const handleClose = () => {
    if (isLoading) {
      return;
    }
    setRole('');
    setQuestion('');
    onClose();
  };

  const isButtonDisabled = !role.trim() || !question.trim() || isLoading;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
      statusBarTranslucent={true}>
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="w-[85%] rounded-2xl bg-white p-5">
          {isLoading ? (
            <View className="items-center py-8">
              <View className="mb-4 flex-row">
                <ActivityIndicator size="small" color="#7248D9" />
              </View>
              <Text className="text-center text-main-text typo-body-16-semibold">
                잠시만 기다려주세요.
              </Text>
              <Text className="text-center text-main-text typo-body-16-semibold">
                자기소개서를 작성 중이에요.
              </Text>
            </View>
          ) : (
            <>
              {/* 닫기 버튼 */}
              <View className="items-end">
                <Pressable onPress={handleClose} hitSlop={10}>
                  <CloseIcon width={24} height={24} color="#5B5B5B" />
                </Pressable>
              </View>

              {/* 직무 입력 */}
              <View className="mt-2">
                <Text className="mb-2 text-main-text typo-body-15-medium">
                  <Text className="text-red-500">*</Text>
                  {' 내 직무를 입력해주세요.'}
                </Text>
                <TextInput
                  className="typo-body-14-regular rounded-xl border border-surface-200 bg-white px-4 py-3"
                  placeholder="ex : 기획, 마케팅, 웹 개발 등"
                  placeholderTextColor="#B7B7B7"
                  value={role}
                  onChangeText={setRole}
                />
              </View>

              {/* 질문 입력 */}
              <View className="mt-5">
                <Text className="mb-2 text-main-text typo-body-15-medium">
                  <Text className="text-red-500">*</Text>
                  {' 질문을 입력해주세요.'}
                </Text>
                <TextInput
                  className="typo-body-14-regular rounded-xl border border-surface-200 bg-white px-4 py-3"
                  placeholder="ex : 직무를 위한 노력 및 경험"
                  placeholderTextColor="#B7B7B7"
                  value={question}
                  onChangeText={setQuestion}
                />
              </View>

              {/* 안내 문구 */}
              <View className="mt-5">
                <Text className="typo-caption-13-regular text-center text-surface-500">
                  내 직무와 자기소개서 질문을 입력하면
                </Text>
                <Text className="typo-caption-13-regular text-center text-surface-500">
                  기존 내용이 삭제되고, AI가 답변을 생성해요.
                </Text>
              </View>

              {/* 생성 버튼 */}
              <Pressable
                onPress={handleGenerate}
                disabled={isButtonDisabled}
                className={`mt-5 items-center rounded-full py-[14px] ${
                  isButtonDisabled ? 'bg-surface-300' : 'bg-primary-purple'
                }`}>
                <Text
                  className={`typo-body-16-medium ${
                    isButtonDisabled ? 'text-surface-400' : 'text-white'
                  }`}>
                  ✦ AI 자기소개서 생성하기
                </Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default AiGenerateModal;
