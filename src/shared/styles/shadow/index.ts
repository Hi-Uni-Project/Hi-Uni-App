import { StyleSheet } from 'react-native';

// 안드로이드와 iOS에서 그림자 스타일을 통일하기 위해 boxShadow 사용
export const shadowStyleSheet = StyleSheet.create({
  dropShadow: {
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.03)',
  },
  dropShadowBottom: {
    boxShadow: '0 7.6px 15.2px 0 rgba(0, 0, 0, 0.02)',
  },
  dropShadowMedium: {
    boxShadow: '0 0 15px 0 rgba(38, 38, 38, 0.10)',
  },
});
