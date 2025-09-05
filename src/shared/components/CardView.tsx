import React from 'react';

import { StyleSheet, View, ViewProps } from 'react-native';

// 안드로이드와 iOS에서 그림자 스타일을 통일하기 위해 boxShadow 사용
const shadowStyleSheet = StyleSheet.create({
  dropShadow: {
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.03)',
  },
});

interface CardProps extends ViewProps {
  children: React.ReactNode;
}

const CardView = ({ children, ...rest }: CardProps) => {
  return (
    <View
      className="rounded-[15px] bg-white"
      {...rest}
      style={[shadowStyleSheet.dropShadow, rest.style]}>
      {children}
    </View>
  );
};

export default CardView;
