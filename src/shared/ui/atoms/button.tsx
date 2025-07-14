import { Pressable, Text } from 'react-native';

interface PressableProps {
  title?: string;
  backgroundColor?: string;
  textColor?: string;
  onPress?: () => void;
}

const CustomPressable = ({
  title = '확인',
  backgroundColor = '#1E2128',
  textColor = '#FFFFFF',
  onPress = () => {},
}: PressableProps) => (
  <Pressable
    onPress={onPress}
    className="h-[68px] w-[350px] flex-col items-center justify-center rounded-[50px]"
    style={{ backgroundColor }}>
    <Text className="typo-button-18-semibold" style={{ color: textColor }}>
      {title}
    </Text>
  </Pressable>
);

export default CustomPressable;
