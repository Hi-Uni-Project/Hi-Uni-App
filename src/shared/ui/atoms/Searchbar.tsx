import React from 'react';

import { View, TextInput, StyleSheet } from 'react-native';

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="학과명을 입력해주세요"
        placeholderTextColor="#979797"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    width: 350,
    height: 52,
    top: 76,
    left: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  input: {
    weight: 400,
    lineHeight: 24,
    fontSize: 16,
  },
});
