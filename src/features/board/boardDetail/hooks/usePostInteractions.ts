import { useState } from 'react';

import { Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export const usePostInteractions = () => {
  const insets = useSafeAreaInsets();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeScale] = useState(new Animated.Value(1));
  const [bookmarkScale] = useState(new Animated.Value(1));

  const animateScale = (scaleValue: Animated.Value) => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleLikePress = () => {
    setIsLiked(!isLiked);
    animateScale(likeScale);
  };

  const handleBookmarkPress = () => {
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    animateScale(bookmarkScale);

    if (newBookmarkState) {
      Toast.show({
        type: 'customToast',
        text1: '내 스크랩에 저장되었어요.',
        text2: '마이페이지 > 내 스크랩 보기에서 볼 수 있어요.',
        position: 'bottom',
        visibilityTime: 2500,
        bottomOffset: insets.bottom + 200,
      });
    }
  };

  return {
    isLiked,
    isBookmarked,
    likeScale,
    bookmarkScale,
    handleLikePress,
    handleBookmarkPress,
  };
};
