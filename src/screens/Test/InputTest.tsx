import React, { useState } from 'react';

import { View, Text, Dimensions } from 'react-native';

import HUInput from '@/shared/ui/atoms/HUInput';

const { width, height } = Dimensions.get('window');

// 지원하는 variant 목록 (HUInput에서 허용하는 값만 사용)
const variants = [
  { key: 'find', label: '검색 입력' },
  { key: 'submit', label: '제출 입력' },
];

const InputTest = () => {
  // 각 variant별 입력값 관리
  const [values, setValues] = useState({ find: '', submit: '' });
  const [lastChanged, setLastChanged] = useState('');

  // 입력값 변경 핸들러
  const handleChange = (variant: 'find' | 'submit', text: string) => {
    setValues(prev => ({ ...prev, [variant]: text }));
    setLastChanged(variant);
    console.log(`${variant} 입력값:`, text);
  };

  return (
    <View
      style={{
        height,
        width,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        backgroundColor: 'white',
      }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 4 }}>
        HUInput 컴포넌트 예시
      </Text>
      <Text style={{ color: '#666', marginBottom: 12 }}>
        다양한 variant와 disabled 상태, 입력값 관리 기능을 확인할 수 있습니다.
      </Text>

      <View>
        {variants.map(v => (
          <View key={v.key} style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 15, marginBottom: 4, color: '#333' }}>
              {v.label}
            </Text>
            <HUInput
              placeholder={`${v.label}...`}
              variant={v.key as 'find' | 'submit'}
              value={values[v.key as 'find' | 'submit']}
              onChangeText={text =>
                handleChange(v.key as 'find' | 'submit', text)
              }
            />
          </View>
        ))}
      </View>
      <View style={{ marginTop: 24, alignItems: 'flex-start', width: '80%' }}>
        <Text style={{ fontSize: 16, color: '#333' }}>입력값 현황:</Text>
        {variants.map(v => (
          <Text
            key={v.key}
            style={{ fontSize: 14, color: '#555', marginBottom: 2 }}>
            {v.label}: {values[v.key as 'find' | 'submit'] || '없음'}
          </Text>
        ))}
        <Text style={{ fontSize: 14, color: '#888', marginTop: 8 }}>
          마지막으로 입력한 variant:{' '}
          {lastChanged
            ? variants.find(v => v.key === lastChanged)?.label
            : '없음'}
        </Text>
      </View>
    </View>
  );
};

export { InputTest };
