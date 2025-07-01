import React from 'react';

import { View, Text } from 'react-native';

import SvgIcon from '@/shared/ui/atoms/SvgIcon'; // 커스텀 아이콘 컴포넌트 사용

export default function InfoSection() {
  return (
    <View>
      <SvgIcon
        name={'checkbox'}
        size={16}
        fill="#6568EB"
        style={{ marginRight: 6 }}
      />
      <Text style={styles.successText}>사용이 가능한 닉네임입니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  successText: {
    color: '#6568EB',
    fontSize: 16,
  },
});
