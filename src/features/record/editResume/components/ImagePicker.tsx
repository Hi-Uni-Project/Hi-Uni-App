import React from 'react';

import { Image, Pressable, View } from 'react-native';

import useImagePicker from '@/features/record/editResume/hooks/useImagePicker';
import { getImageSource } from '@/features/record/editResume/utils/imageUtils';
import CameraIcon from '@/static/icons/camera.svg';
import EmptyPhotoIcon from '@/static/icons/empty_photo.svg';

interface ImagePickerProps {
  photo: string | null;
  onPhotoChange: (photoUri: string | null) => void;
}

const ImagePicker = ({ photo, onPhotoChange }: ImagePickerProps) => {
  const { pickImage } = useImagePicker();

  const handlePickImage = async (): Promise<void> => {
    try {
      const uri = await pickImage();
      if (uri) {
        onPhotoChange(uri);
      }
    } catch (error) {
      console.error('Image pick error:', error);
    }
  };

  return (
    <>
      <Pressable onPress={handlePickImage}>
        <View className="relative h-[93px] w-[93px] items-center justify-center rounded-full">
          {photo ? (
            <Image
              source={getImageSource(photo)}
              style={{ width: 93, height: 93, borderRadius: 100 }}
              onError={e =>
                console.log('Image load error:', e.nativeEvent.error)
              }
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
