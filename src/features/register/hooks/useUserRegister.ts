import { useNavigation } from '@react-navigation/native';

import { userRegisterApi } from '../api/userRegisterApi';

import { MainStackNavigationProp } from '@/navigation/types/navigationTypes';
import { useRegisterForm } from '@/shared/stores/register/hooks/useRegisterForm';
import { useUserStore } from '@/shared/stores/user';

export const useUserRegister = () => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const { setAccessToken, setRefreshToken } = useUserStore();
  const { getFormData } = useRegisterForm();

  const handleRegisterSuccess = (accessToken: string, refreshToken: string) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

    navigation.navigate('HomeRoute');
  };

  const handleRegister = async () => {
    try {
      const formData = getFormData();
      const response = await userRegisterApi(formData);

      console.log('회원가입 성공:', response);

      const { accessToken, refreshToken } = response.data;

      handleRegisterSuccess(accessToken, refreshToken);
    } catch (error: any) {
      console.log('회원가입 에러:', error);
    }
  };

  return { handleRegister };
};
