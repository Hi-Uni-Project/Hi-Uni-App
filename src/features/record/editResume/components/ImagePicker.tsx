import React, { useState } from 'react';

import { Image, Pressable, View } from 'react-native';
import { Asset, launchImageLibrary } from 'react-native-image-picker';

import CameraIcon from '@/static/icons/camera.svg';
import EmptyPhotoIcon from '@/static/icons/empty_photo.svg';
const ImagePicker = () => {
  const [photo, setPhoto] = useState<Asset | null>(null);

  const pickImage = async (): Promise<void> => {
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

    const asset = result.assets?.[0];
    if (asset) {
      setPhoto(asset);
    }
  };

  return (
    <>
      <Pressable onPress={pickImage}>
        <View className="relative h-[93px] w-[93px] items-center justify-center rounded-full">
          {photo?.uri ? (
            <Image
              source={{ uri: photo.uri }}
              style={{ width: 93, height: 93, borderRadius: 100 }}
            />
          ) : (
            <EmptyPhotoIcon />
          )}
          <View className="absolute bottom-0 right-0 h-[30px] w-[30px] items-center justify-center rounded-full bg-surface-500">
            <View className="ml-[1px] mt-[0.5px]">
              <CameraIcon color="white" width={17} height={15} />
            </View>
          </View>
        </View>
      </Pressable>
    </>
  );
};

export default ImagePicker;
