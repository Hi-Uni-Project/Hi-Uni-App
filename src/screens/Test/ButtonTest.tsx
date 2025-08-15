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
        text="기본 버튼"
        disabled={isDisabled}
      />
      <HUButton
        variant="kakao"
        text="카카오 로그인"
        onPress={() => setLastPressed('kakao')}
        disabled={isDisabled}
      />
      <HUButton
        variant="naver"
        text="네이버 로그인"
        onPress={() => setLastPressed('naver')}
        disabled={isDisabled}
      />
      <HUButton
        variant="google"
        text="구글 로그인"
        onPress={() => setLastPressed('google')}
        disabled={isDisabled}
      />
      <HUButton
        variant="apple"
        text="애플 로그인"
        onPress={() => setLastPressed('apple')}
        disabled={isDisabled}
      />
      <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
        <HUButton
          variant="primary"
          onPress={() => setIsDisabled(!isDisabled)}
          text={isDisabled ? '활성화' : '비활성화'}
        />
      </View>
      <Text style={{ marginTop: 16, color: '#333', fontSize: 16 }}>
        마지막으로 누른 버튼: {lastPressed || '없음'}
      </Text>
    </View>
  );
};

export { ButtonTest };
