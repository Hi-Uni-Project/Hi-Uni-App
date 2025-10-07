import { useState } from 'react';

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

import { validEmailCodeApi } from '../api/validEmailCodeApi';

import {
  SignupStackNavigationProp,
  SignupNavigationProps,
} from '@/navigation/types/navigationTypes';

type InputCodeRouteProp = RouteProp<SignupNavigationProps, 'InputCode'>;

export const useMailCodeVerify = () => {
  const navigation = useNavigation<SignupStackNavigationProp>();
  const route = useRoute<InputCodeRouteProp>();
  const { authMailId } = route.params;

  const [codeError, setCodeError] = useState(false);

  const handleChangeCode = (text: string, setValue: (text: string) => void) => {
    setCodeError(false);
    setValue(text);
  };

  const handleSendCode = async (
    value: string,
    setValue: (text: string) => void,
  ) => {
    try {
      const response = await validEmailCodeApi({
        authCode: value,
        authMailId,
      });

      console.log(response);
      handleSuccessCode(setValue);
    } catch (error: any) {
      console.log('인증코드 검증 에러:', error);
      setCodeError(true);
    }
  };

  const handleSuccessCode = (setValue: (text: string) => void) => {
    navigation.navigate('SignupSuccess');
    setValue('');
    setCodeError(false);
  };

  return {
    authMailId,
    codeError,
    handleChangeCode,
    handleSendCode,
  };
};
