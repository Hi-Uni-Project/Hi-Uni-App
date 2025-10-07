import { useUserStore } from '../../user';
import { useRegisterStore } from '../index';
import { RegisterFormData } from '../types';

export const useRegisterForm = () => {
  const {
    tos,
    univ,
    setTos,
    setUniv,
    resetAll: resetRegister,
  } = useRegisterStore();
  const { authToken, userSocialType } = useUserStore();

  const getFormData = (): RegisterFormData => {
    return {
      tos,
      univ,
      social: {
        authToken: authToken || '',
        provider: userSocialType || '',
      },
    };
  };

  const resetAll = () => {
    resetRegister();
  };

  return {
    tos,
    univ,
    authToken,
    userSocialType,

    setTos,
    setUniv,

    getFormData,
    resetAll,
  };
};
