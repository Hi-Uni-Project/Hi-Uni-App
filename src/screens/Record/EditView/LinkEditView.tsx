import React, { useState } from 'react';

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

import ResumeHeader from '@/features/record/editResume/components/ResumeHeader';
import useLinkEdit from '@/features/record/editResume/hooks/useLinkEdit';
import ConfirmModal from '@/shared/ui/organisms/ConfirmModal';
import TrashIcon from '@/static/icons/trash.svg';

const LinkEditView = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [isBackModalVisible, setIsBackModalVisible] = useState(false);
  const {
    fields,
    setField,
    isEditMode,
    isFormValid,
    isDirty,
    handleSubmit,
    handleDelete,
  } = useLinkEdit();

  const handleBackPress = () => {
    if (isDirty) {
      setIsBackModalVisible(true);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View className="flex-1 bg-surface-50">
      <ResumeHeader title="링크" onBackPress={handleBackPress} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View className="flex-1">
              <View style={{ height: insets.top + 74 }} />
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
                  value={fields.linkName}
                  onChangeText={value => setField('linkName', value)}
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
                  value={fields.linkUrl}
                  onChangeText={value => setField('linkUrl', value)}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* 버튼 영역 */}
      <View
        className="items-center px-5"
        style={{ paddingTop: 16, paddingBottom: insets.bottom + 16 }}>
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
          <Pressable
            className="mt-3 flex-row items-center"
            onPress={handleDelete}>
            <TrashIcon className="mt-[2px] text-surface-400" />
            <Text className="ml-2 text-surface-400 typo-body-15-medium">
              링크 삭제하기
            </Text>
          </Pressable>
        )}
      </View>

      <ConfirmModal
        visible={isBackModalVisible}
        title="작성 중인 내용이 있어요. 나가시겠어요?"
        confirmText="나가기"
        cancelText="계속 작성"
        onConfirm={() => {
          setIsBackModalVisible(false);
          navigation.goBack();
        }}
        onClose={() => setIsBackModalVisible(false)}
      />
    </View>
  );
};

export default LinkEditView;
