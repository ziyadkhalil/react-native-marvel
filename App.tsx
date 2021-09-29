import React from 'react';
import {QueryClientProvider} from 'react-query';

import {queryClient} from '@src/const';
import {NavigationContainer, DefaultTheme, Theme} from '@react-navigation/native';

import {AppStack} from '@src/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const theme: Theme = {
  ...DefaultTheme,
  colors: {...DefaultTheme.colors, background: '#151515', card: '#1B1B1B', border: 'transparent', primary: '#FF898E'},
};
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer theme={theme}>
          <AppStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
