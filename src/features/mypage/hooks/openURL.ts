import { Linking } from 'react-native';

export const openExternalURL = async (url: string): Promise<void> => {
  try {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      console.warn(`URL을 열 수 없습니다: ${url}`);
    }
  } catch (error) {
    console.error('링크 열기 실패:', error);
  }
};

export const createExternalLinkHandler = (url: string) => async () => {
  await openExternalURL(url);
};
