import React, { useEffect, useState } from 'react';

import { Portal } from '@gorhom/portal';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  Easing,
} from 'react-native-reanimated';

import StatusIcons from '@/shared/icons/StatusIcons';
import { cn } from '@/shared/lib/cn';
import HUModalButton from '@/shared/ui/atoms/HUModalButton';

type Props = {
  visible: boolean;
  onClose?: () => void;
  title: string;
  description?: string;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  status?: 'caution';
};

const ANIMATION_DURATION = 200;

const ConfirmPortal = ({
  visible,
  onClose,
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  status = 'caution',
}: Props) => {
  const [shouldRender, setShouldRender] = useState(visible);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      opacity.value = withTiming(1, {
        duration: ANIMATION_DURATION,
        easing: Easing.out(Easing.ease),
      });
      scale.value = withTiming(1, {
        duration: ANIMATION_DURATION,
        easing: Easing.out(Easing.ease),
      });
    } else {
      opacity.value = withTiming(
        0,
        {
          duration: ANIMATION_DURATION,
          easing: Easing.in(Easing.ease),
        },
        finished => {
          if (finished) {
            runOnJS(setShouldRender)(false);
          }
        },
      );
      scale.value = withTiming(0.9, {
        duration: ANIMATION_DURATION,
        easing: Easing.in(Easing.ease),
      });
    }
  }, [visible]);

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const modalAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  if (!shouldRender) {
    return null;
  }

  return (
    <Portal>
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 'rgba(0,0,0,0.5)' },
            backdropAnimatedStyle,
          ]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        </Animated.View>

        <View
          style={StyleSheet.absoluteFill}
          pointerEvents="box-none"
          className="items-center justify-center">
          <Animated.View
            className="w-[85%] rounded-2xl bg-white p-5"
            style={modalAnimatedStyle}>
            <View className="mb-3 items-center">
              <StatusIcons
                status={status}
                width={30}
                height={30}
                color="#5B5B5B"
              />
            </View>

            <Text
              className={cn(
                cancelText ? 'mb-[11px]' : 'mb-5',
                'text-center text-main-text typo-sub-title-22-semibold',
              )}
              style={{ lineHeight: 27.5 }}>
              {title}
            </Text>

            {description && (
              <Text className="mb-6 text-center text-surface-600 typo-caption-14-regular">
                {description}
              </Text>
            )}

            <HUModalButton
              text={confirmText}
              onPress={() => {
                onConfirm();
              }}
            />

            {cancelText && (
              <View className="mt-3">
                <HUModalButton
                  text={cancelText}
                  variant="gray"
                  onPress={() => {
                    onCancel?.();
                    onClose?.();
                  }}
                />
              </View>
            )}
          </Animated.View>
        </View>
      </View>
    </Portal>
  );
};

export default ConfirmPortal;
