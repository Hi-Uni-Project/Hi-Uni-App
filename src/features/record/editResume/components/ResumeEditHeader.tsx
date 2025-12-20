import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { View, StatusBar, Pressable, Text, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HomeStackNavigationProp } from '@/navigation/types/navigationTypes';
import OptionPopup, { OptionItem } from '@/shared/components/Board/OptionPopup';
import ArrowIcons from '@/shared/icons/ArrowIcons';
import { cn } from '@/shared/lib/cn';
import ConfirmModal from '@/shared/ui/organisms/ConfirmModal';
import MoreIcon from '@/static/icons/more.svg';

interface ResumeEditHeaderProps {
  isCompleteDisabled: boolean;
  onCompletePress: () => void;
  onDeleteAll?: () => void;
}

const TOP_OFFSET = Platform.OS === 'ios' ? 60 : 30;

const ResumeEditHeader = ({
  onCompletePress,
  isCompleteDisabled,
  onDeleteAll,
}: ResumeEditHeaderProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<HomeStackNavigationProp>();
  const [isOptionVisible, setIsOptionVisible] = useState(false);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [isSaveConfirmVisible, setIsSaveConfirmVisible] = useState(false);

  const options: OptionItem[] = [
    {
      label: '미리보기',
      onPress: () => {},
    },
    {
      label: '내보내기',
      onPress: () => {},
    },
    {
      label: '전체 삭제',
      onPress: () => {
        setIsOptionVisible(false);
        setIsDeleteConfirmVisible(true);
      },
    },
  ];

  const handleDeleteConfirm = () => {
    setIsDeleteConfirmVisible(false);
    onDeleteAll?.();
  };

  return (
    <>
      <View
        className="absolute left-0 right-0 top-0 z-50 bg-white"
        style={{ height: insets.top }}
      />

      <View
        className="absolute left-0 right-0 z-50 bg-white"
        style={{ top: insets.top, height: 74 }}>
        <StatusBar barStyle="dark-content" />

        <View className="h-full flex-row items-center justify-between px-5">
          <Pressable
            hitSlop={14}
            onPress={() => {
              navigation.goBack();
            }}>
            <ArrowIcons
              direction="left"
              width={24}
              height={20}
              color="#1E2128"
            />
          </Pressable>

          <View className="absolute left-0 right-0 flex-1 items-center">
            <Text className="text-main-text typo-sub-title-20-semibold">
              내 이력서
            </Text>
          </View>

          <View className="flex-row">
            <Pressable
              onPress={() => setIsSaveConfirmVisible(true)}
              disabled={isCompleteDisabled}>
              <Text
                className={cn(
                  'typo-sub-title-18-medium',
                  isCompleteDisabled
                    ? 'text-surface-300'
                    : 'text-primary-purple',
                )}>
                저장
              </Text>
            </Pressable>

            <Pressable
              className="ml-[18px] mt-[2px]"
              onPress={() => setIsOptionVisible(true)}>
              <MoreIcon />
            </Pressable>
          </View>
        </View>
      </View>

      <OptionPopup
        visible={isOptionVisible}
        onClose={() => setIsOptionVisible(false)}
        options={options}
        position={{
          top: insets.top + TOP_OFFSET,
          right: 20,
        }}
      />

      <ConfirmModal
        visible={isDeleteConfirmVisible}
        onClose={() => setIsDeleteConfirmVisible(false)}
        title={'이력서 내용을\n모두 삭제하겠습니까?'}
        description="삭제 시 모든 내용이 사라집니다."
        confirmText="네, 삭제할래요."
        cancelText="아니요, 계속 작성할래요."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteConfirmVisible(false)}
      />

      <ConfirmModal
        visible={isSaveConfirmVisible}
        onClose={() => setIsSaveConfirmVisible(false)}
        title="이력서를 저장하시겠어요?"
        confirmText="네, 저장할게요."
        cancelText="아니오, 저장하지 않을게요."
        onConfirm={onCompletePress}
        onCancel={() => setIsSaveConfirmVisible(false)}
      />
    </>
  );
};

export default ResumeEditHeader;
