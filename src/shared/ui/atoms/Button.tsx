import React, { Component } from 'react';

import { TouchableOpacity, Text, StyleSheet } from 'react-native';

//any를 사용하면 안되니까 확장하기 위해 interface 사용하는거
interface ButtonProps {
  title?: string;
  buttonColor?: string;
  titleColor?: string;
  onPress?: unknown;
}

export default class CustomButton extends Component<ButtonProps> {
  static defaultProps = {
    title: 'untitled',
    buttonColor: '#1E2128',
    titleColor: '#FFFFFF',
    onPress: () => {},
  };

  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    const { buttonColor, titleColor, title, onPress } = this.props;

    // unknown 타입을 함수로 안전하게 사용하려면 타입 검사 필요함
    const handlePress = () => {
      if (typeof onPress === 'function') {
        (onPress as () => void)();
      }
    };

    //TouchableOpacity는 버튼을 만들기 위한 컴포넌트
    //ios, android 모두 지원하기 위해서 커스텀 버튼만들어서 사용하는거
    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonColor }]}
        onPress={handlePress}>
        <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 350,
    height: 68,
    top: 20,
    left: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E2128',
  },
  title: {
    fontSize: 18,
  },
});
