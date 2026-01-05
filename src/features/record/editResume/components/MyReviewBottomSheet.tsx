import React, { useEffect, useRef } from 'react';

import {
  View,
  Text,
  Modal,
  Pressable,
  Animated,
  Easing,
  ScrollView,
} from 'react-native';

import { useMyReviewsQuery } from '../hooks/useResumeQueries';
import { MyReviewData } from '../types/responseType';
import { mapMyReviewToDomain } from '../utils/responseToDomainMapper';

import CardView from '@/shared/components/CardView';

interface MyReviewBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  onPress: (review: MyReviewData) => void;
}

const MyReviewBottomSheet = ({
  visible,
  onClose,
  title,
  onPress,
}: MyReviewBottomSheetProps) => {
  const { myReviewsData } = useMyReviewsQuery();
  const translateY = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
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
  }, [visible, translateY]);

  const handleOptionPress = (option: MyReviewData) => {
    onPress(option);
    onClose();
  };

  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/40" onPress={onClose}>
        <Animated.View
          style={{
            transform: [{ translateY }],
          }}
          className="absolute bottom-0 w-full rounded-t-2xl bg-white p-5">
          <Pressable onPress={e => e.stopPropagation()}>
            <View className="mb-[25px] mt-1 flex-row items-center justify-center">
              <Text className="text-main-text typo-body-17-medium">
                {title}
              </Text>
            </View>

            {myReviewsData?.length === 0 && (
              <View className="items-center justify-center py-20">
                <Text className="text-surface-500 typo-body-15-regular">
                  불러올 후기가 없습니다.
                </Text>
              </View>
            )}

            {myReviewsData && myReviewsData.length > 0 && (
              <ScrollView
                style={{ maxHeight: 500 }}
                showsVerticalScrollIndicator={false}>
                {myReviewsData?.map((review, index) => {
                  const domain = mapMyReviewToDomain(review);

                  return (
                    <Pressable
                      key={index}
                      onPress={() => handleOptionPress(review)}
                      className="pb-2">
                      <CardView>
                        <View className="px-4 py-[15px]">
                          <View className="flex-row items-start">
                            <View className="flex items-center justify-center rounded-[20px] bg-surface-200 px-[11px] py-[6px]">
                              <Text className="text-surface-500 typo-caption-14-regular">
                                취업정보
                              </Text>
                            </View>
                            <View className="ml-[7px] flex items-center justify-center rounded-[20px] bg-surface-200 px-[11px] py-[6px]">
                              <Text className="text-surface-500 typo-caption-14-regular">
                                {domain.type === 'EXPERIENCE'
                                  ? '경험후기'
                                  : '인턴십'}
                              </Text>
                            </View>
                          </View>
                          <Text className="ml-1 mt-[7px] text-main-text typo-body-16-medium">
                            {domain.title}
                          </Text>
                          <Text className="mb-1 ml-1 mt-[7px] text-surface-600 typo-body-15-regular">
                            {domain.content}
                          </Text>
                        </View>
                      </CardView>
                    </Pressable>
                  );
                })}
              </ScrollView>
            )}
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default MyReviewBottomSheet;
