import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import SvgIcon from '@/shared/ui/atoms/SvgIcon'; // 커스텀 아이콘 컴포넌트 사용

export default function InfoSection() {
  return (
    <View>
      <SvgIcon
        name={'caution'}
        size={16}
        fill="#F04438"
        style={{ marginRight: 6 }}
      />
      <Text style={styles.cautionText}>이미 사용중인 닉네임입니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cautionText: {
    color: '#F04438',
    fontSize: 14,
  },
});
