import {
  createContext,
  ReactNode,
  RefObject,
  useContext,
  useState,
} from 'react';
import React from 'react';

import { Pressable, View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import useDropdownAnimation from '../hooks/useDropdownAnimation';

interface DropdownLayoutType {
  x: number;
  y: number;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
}

interface DropdownContextType {
  isVisible?: boolean;

  openDropdown: (targetRef: RefObject<View>, render: ReactNode) => void;
  closeDropdown: () => void;

  animatedExpandStyle?: ViewStyle;
  animateRotateStyle?: ViewStyle;
  animatedDimmedStyle?: ViewStyle;
}

const DropdownContext = createContext<DropdownContextType | null>(null);

export const useDropdownOverlay = () => useContext(DropdownContext);

export const DropdownProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);

  // 현재 활성화 된 드롭다운의 레이아웃 정보 (계속 바뀔 수 있음)
  const [dropdownLayout, setDropdownLayout] =
    useState<DropdownLayoutType | null>(null);

  // 현재 활성화 된 드롭다운의 렌더 노드
  const [renderNode, setRenderNode] = useState<ReactNode | null>(null);

  // 드롭다운 애니메이션 모음
  const {
    animateRotateStyle,
    animatedExpandStyle,
    animatedDimmedStyle,
    handleOpenAnimation,
    handleCloseAnimation,
  } = useDropdownAnimation();

  // 드롭다운 열림 함수
  /**
   * 상호작용이 시작된 드롭다운의 Ref를 받아서 조작을 가한다.
   *
   * 1. Ref를 따서 레이아웃 정보를 수집한다.
   * 2. 드롭다운 오버레이를 활성화한다.
   * 3. 드롭다운 컴포넌트를 렌더링한다.
   * @param targetRef
   */
  const openDropdown = (targetRef: RefObject<View>, render: ReactNode) => {
    if (!targetRef) {
      console.log('openDropdown: targetRef is null');
      return;
    }

    // Ref로부터 레이아웃 정보 수집
    targetRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setDropdownLayout({ x, y, width, height, pageX, pageY });
    });

    // 렌더 노드 설정
    setRenderNode(render);
    setIsVisible(true);

    handleOpenAnimation(200);

    console.log('openDropdown called', { targetRef, render });
  };

  const closeDropdown = () => {
    handleCloseAnimation(() => {
      setIsVisible(false);
      setRenderNode(null);
      setDropdownLayout(null);
    });
  };

  return (
    <DropdownContext.Provider
      value={{
        isVisible,
        openDropdown,
        closeDropdown,
        animateRotateStyle,
        animatedExpandStyle,
        animatedDimmedStyle,
      }}>
      {children}

      {/* overlay layer */}
      <Animated.View
        pointerEvents={isVisible ? 'auto' : 'none'}
        style={[
          {
            position: 'absolute',
            inset: 0,
            zIndex: 800,
            backgroundColor: 'rgba(0,0,0,0.2)',
          },
          animatedDimmedStyle,
        ]}>
        {/* 바깥 터치 시 닫힘 */}
        <Pressable
          style={{ flex: 1 }}
          onPress={() => {
            handleCloseAnimation(() => {
              setIsVisible(false);
            });
          }}
        />

        {renderNode && dropdownLayout && (
          <View
            pointerEvents="box-none"
            style={{
              position: 'absolute',
              top: dropdownLayout.pageY,
              left: dropdownLayout.pageX,
              zIndex: 900,
            }}>
            {renderNode}
          </View>
        )}
      </Animated.View>
    </DropdownContext.Provider>
  );
};
