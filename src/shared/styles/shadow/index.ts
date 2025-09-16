import { StyleSheet } from 'react-native';

// 안드로이드와 iOS에서 그림자 스타일을 통일하기 위해 boxShadow 사용
export const shadowStyleSheet = StyleSheet.create({
  dropShadow: {
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.03)',
  },
});
