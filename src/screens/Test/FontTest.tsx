import React from 'react';

import { ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import addFontsUtil from '@/styles/fonts';

// Recreate the utilities object from the module to access keys and values.
// The fonts module exports a function; we call it with a fake addUtilities collector
const collected: Record<string, any> = {};
addFontsUtil({
  addUtilities: (obj: Record<string, any>) => Object.assign(collected, obj),
});

const entries = Object.entries(collected);

const FontTest: React.FC = () => {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {entries.map(([className, style]) => (
          <View key={className} style={{ marginBottom: 18 }}>
            <Text style={{ marginBottom: 6, color: '#333', fontWeight: '600' }}>
              {className}
            </Text>
            <Text style={style as any}>
              샘플 텍스트: 하이유니에서 폰트를 확인해보세요.
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FontTest;
