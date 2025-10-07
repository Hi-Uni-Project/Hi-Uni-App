import { useCallback, useRef, useState } from 'react';

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { TextInput } from 'react-native';

import { sendMailApi } from '../api/sendMailApi';

import { SignupStackNavigationProp } from '@/navigation/types/navigationTypes';
import { useRegisterStore } from '@/shared/stores/register';

export const useMailSend = () => {
  const navigation = useNavigation<SignupStackNavigationProp>();
  const { univ, setUnivEmail } = useRegisterStore();

  const inputRef = useRef<TextInput>(null);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [validError, setValidError] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }, []),
  );

  const handleChangeEmail = (text: string) => {
    setValidError(false);
    setInputValue(text);
  };

  const handleSendMail = async () => {
    try {
      const response = await sendMailApi({
        email: inputValue,
        univName: univ.univName,
      });

      const authMailId = response.data.authMailId;

      handleSuccessMail(authMailId);
    } catch (error: any) {
      console.log('메일 전송 에러:', error);
      setValidError(true);
    }
  };

  const handleSuccessMail = (authMailId: string) => {
    navigation.navigate('InputCode', { authMailId });
    setUnivEmail(inputValue);
    setInputValue('');
    setValidError(false);
  };

  return {
    inputRef,
    inputValue,
    isFocused,
    validError,
    handleChangeEmail,
    handleSendMail,
    setIsFocused,
  };
};
