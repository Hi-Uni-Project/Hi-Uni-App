import React, { useState } from 'react';

import { View, Text } from 'react-native';
import { Dimensions } from 'react-native';

import HUButton from '@/shared/ui/atoms/HUButton';

const { width, height } = Dimensions.get('window');

const ButtonTest = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [lastPressed, setLastPressed] = useState('');

  return (
    <View
      style={{
        height: height,
        width: width,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        backgroundColor: '#f5f5f5',
      }}>
      <HUButton
        variant="primary"
        onPress={() => setLastPressed('primary')}
        disabled={isDisabled}>
        기본 버튼
      </HUButton>
      <HUButton
        variant="kakao"
        onPress={() => setLastPressed('kakao')}
        disabled={isDisabled}>
        카카오 로그인
      </HUButton>
      <HUButton
        variant="naver"
        onPress={() => setLastPressed('naver')}
        disabled={isDisabled}>
        네이버 로그인
      </HUButton>
      <HUButton
        variant="google"
        onPress={() => setLastPressed('google')}
        disabled={isDisabled}>
        구글 로그인
      </HUButton>
      <HUButton
        variant="apple"
        onPress={() => setLastPressed('apple')}
        disabled={isDisabled}>
        애플 로그인
      </HUButton>
      <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
        <HUButton variant="primary" onPress={() => setIsDisabled(!isDisabled)}>
          {isDisabled ? '활성화' : '비활성화'}
        </HUButton>
      </View>
      <Text style={{ marginTop: 16, color: '#333', fontSize: 16 }}>
        마지막으로 누른 버튼: {lastPressed || '없음'}
      </Text>
    </View>
  );
};

export { ButtonTest };
