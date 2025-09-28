import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { SocialTypes } from '@/features/login/types';

interface UserState {
  accessToken: string | null;
  refreshToken: string | null;
  userSocialType: SocialTypes;

  setUserSocialType: (type: SocialTypes) => void;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;

  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      accessToken: null as UserState['accessToken'],
      refreshToken: null as UserState['refreshToken'],
      userSocialType: null as UserState['userSocialType'],

      setUserSocialType: (userSocialType: UserState['userSocialType']) =>
        set({ userSocialType }),
      setAccessToken: (accessToken: UserState['accessToken']) =>
        set({ accessToken }),
      setRefreshToken: (refreshToken: UserState['refreshToken']) =>
        set({ refreshToken }),

      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          userSocialType: null,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
