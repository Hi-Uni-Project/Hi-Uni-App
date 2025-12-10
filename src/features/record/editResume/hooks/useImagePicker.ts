import { useCallback } from 'react';

import { launchImageLibrary } from 'react-native-image-picker';

const useImagePicker = () => {
  const pickImage = useCallback(async (): Promise<string | null> => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
      selectionLimit: 1,
    });

    if (result.didCancel) {
      return null;
    }
    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    console.log('ImagePicker result:', result);

    const uri = result.assets?.[0]?.uri;
    return uri || null;
  }, []);

  return {
    pickImage,
  };
};

export default useImagePicker;
