import React, { useState } from 'react';

import { TextInput, View } from 'react-native';

import ErrorTextArea from '@/features/register/inputMail/components/errorTextArea';
import RegisterHeader from '@/features/register/shared/components/layouts/RegisterHeader';
import KeyboardAvoidingLayout from '@/shared/components/layouts/KeyboardAvoidingLayout';
import ScreenLayout from '@/shared/components/layouts/ScreenLayout';
import HUButton from '@/shared/ui/atoms/HUButton';

const MailInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <KeyboardAvoidingLayout>
      <ScreenLayout>
        <RegisterHeader
          main="웹메일로 인증번호를 발송합니다."
          sub="학교 웹메일을 입력해주세요."
        />

        <View className="items-center px-5">
          <View className="mt-12 w-full">
            <TextInput
              value={inputValue}
              onChangeText={text => setInputValue(text)}
              className="w-full border-b-[1px] border-b-surface-300 pb-3 pl-3 text-surface-700 typo-body-16-regular"
              placeholder="학교 웹메일(ex : 20200525@knu.ac.kr)"
              placeholderTextColor="#B7B7B7"
              maxLength={30}
              autoFocus={true}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </View>

          {/* 에러 분기처리 구현(예정) */}
          <ErrorTextArea />
        </View>
      </ScreenLayout>

      <View className={!isFocused ? 'mb-10' : ''}>
        <HUButton
          text="다음으로"
          className="self-center"
          disabled={!inputValue.length}
        />
      </View>
    </KeyboardAvoidingLayout>
  );
};

export default MailInput;
