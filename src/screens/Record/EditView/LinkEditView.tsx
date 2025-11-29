import React, { useState } from 'react';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ResumeBackHeader from '@/features/record/editResume/components/ResumeBackHeader';
import useResumeEdit from '@/features/record/editResume/hooks/useResumeEdit';
import { RecordNavigationProps } from '@/navigation/types/navigationTypes';

type EditLinkRouteProp = RouteProp<RecordNavigationProps, 'EditLink'>;

const LinkEditView = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<EditLinkRouteProp>();

  const { resumeData, addLink, updateLink, deleteLink } = useResumeEdit();

  // EditLink인 경우 linkId가 params로 전달됨
  const editLinkId = route.params?.linkId;
  const isEditMode = editLinkId !== undefined;
  const editTarget = isEditMode
    ? resumeData.links.find(l => l.linkId === editLinkId)
    : undefined;

  // 로컬 폼 상태
  const [linkName, setLinkName] = useState(editTarget?.linkName || '');
  const [linkUrl, setLinkUrl] = useState(editTarget?.linkUrl || '');

  const isFormValid = linkName.trim() !== '' && linkUrl.trim() !== '';

  const handleSubmit = () => {
    if (!isFormValid) {
      return;
    }

    if (isEditMode && editTarget) {
      updateLink({ linkId: editTarget.linkId, linkName, linkUrl });
    } else {
      addLink({ linkName, linkUrl });
    }

    navigation.goBack();
  };

  const handleDelete = () => {
    if (isEditMode && editTarget) {
      deleteLink(editTarget.linkId);
      navigation.goBack();
    }
  };

  return (
    <View className="flex-1 bg-surface-50">
      <View
        className="absolute w-full items-center justify-center"
        style={{
          bottom:
            Platform.OS === 'ios' ? insets.bottom + 10 : insets.bottom + 20,
        }}>
        <Pressable onPress={handleSubmit} disabled={!isFormValid}>
          <View
            className={`flex-row items-center rounded-full px-[27px] py-[14px] ${
              isFormValid ? 'bg-main-text' : 'bg-surface-300'
            }`}>
            <Text className="text-surface-200 typo-body-16-medium">
              {isEditMode ? '링크 수정하기' : '링크 추가하기'}
            </Text>
          </View>
        </Pressable>

        {isEditMode && (
          <Pressable className="mt-3" onPress={handleDelete}>
            <Text className="text-surface-400 typo-body-15-medium">
              링크 삭제하기
            </Text>
          </Pressable>
        )}
      </View>

      <ResumeBackHeader title="링크" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <View style={{ height: insets.top + 74 }} />

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
            {/* 링크명 */}
            <View className="mt-[22px] px-5">
              <Text className="typo-body-17-semibold">
                링크명{' '}
                <Text className="text-primary-purple typo-body-17-semibold">
                  *
                </Text>
              </Text>
              <TextInput
                className="mt-[9px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                placeholder="링크명을 입력해주세요"
                placeholderTextColor={'#B7B7B7'}
                value={linkName}
                onChangeText={setLinkName}
              />
            </View>

            {/* 링크 주소 */}
            <View className="mt-5 px-5">
              <Text className="typo-body-17-semibold">
                링크 주소{' '}
                <Text className="text-primary-purple typo-body-17-semibold">
                  *
                </Text>
              </Text>
              <TextInput
                className="mt-[9px] rounded-[15px] border-[1px] border-gray-200 bg-white pb-[11px] pl-[14px] pt-[12px] typo-body-15-regular"
                placeholder="링크 주소를 입력해주세요"
                placeholderTextColor={'#B7B7B7'}
                textAlignVertical="top"
                multiline={true}
                style={{ height: 98 }}
                value={linkUrl}
                onChangeText={setLinkUrl}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LinkEditView;
