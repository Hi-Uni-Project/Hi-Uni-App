import React from 'react';

interface ButtonProps {
  title?: string;
  buttonColor?: string;
  titleColor?: string;
  onPress?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  title = 'untitled',
  buttonColor = '#1E2128',
  titleColor = '#FFFFFF',
  onPress = () => {},
}) => {
  const handleClick = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <button
      type="button"
      className="mt-5 flex h-[68px] w-[350px] items-center justify-center rounded-full"
      style={{ backgroundColor: buttonColor, color: titleColor }}
      onClick={handleClick}>
      <span className="text-lg">{title}</span>
    </button>
  );
};

export default Button;
