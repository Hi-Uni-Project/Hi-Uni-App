import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';

import { View, Text, Modal, Pressable, Animated, Easing } from 'react-native';

import { SORT_OPTIONS } from '../constants/sortOptions';

import ActionIcons from '@/shared/icons/ActionIcons';
import { cn } from '@/shared/lib/cn';
import FilteredChecked from '@/static/icons/filtered-checked.svg';

interface Props {
  sortSheetVisible: boolean;
  setSortSheetVisible: Dispatch<SetStateAction<boolean>>;
  selectedSort: string;
  setSelectedSort: Dispatch<SetStateAction<string>>;
}

const SortBottomSheet = ({
  sortSheetVisible,
  setSortSheetVisible,
  selectedSort,
  setSelectedSort,
}: Props) => {
  const translateY = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (sortSheetVisible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 300,
        duration: 200,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [sortSheetVisible]);

  return (
    <Modal transparent visible={sortSheetVisible} animationType="fade">
      <Pressable
        className="flex-1 bg-black/40"
        onPress={() => setSortSheetVisible(false)}>
        <Animated.View
          style={{
            transform: [{ translateY }],
          }}
          className="absolute bottom-0 w-full rounded-t-2xl bg-white p-5">
          <View className="mb-[25px] mt-1 flex-row items-center justify-center">
            <Pressable
              onPress={() => setSortSheetVisible(false)}
              className="absolute left-0">
              <ActionIcons
                type="close"
                height={20}
                width={20}
                color="#1E2128"
              />
            </Pressable>
            <Text className="text-surface-700 typo-body-17-medium">
              정렬 기준
            </Text>
          </View>

          {SORT_OPTIONS.map((option, index) => (
            <Pressable
              key={option}
              onPress={() => {
                setSelectedSort(option);
                setSortSheetVisible(false);
              }}
              className="py-4">
              <View
                className={cn(
                  'flex-row items-center justify-between pb-5',
                  index !== SORT_OPTIONS.length - 1 &&
                    'border-b-[1.5px] border-b-surface-200',
                )}>
                <Text
                  className={cn(
                    'typo-body-17-medium',
                    selectedSort === option
                      ? 'text-main-text'
                      : 'text-surface-500',
                  )}>
                  {option}
                </Text>

                {selectedSort === option && <FilteredChecked />}
              </View>
            </Pressable>
          ))}
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default SortBottomSheet;
