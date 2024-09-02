import React from 'react';
import AppNavigator from './AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { StatusBar } from "react-native"
import { StateProvider } from './StateProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
enableScreens();

function App() {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <StateProvider>
          <StatusBar translucent backgroundColor="transparent" barStyle={'dark-content'} />
          <AppNavigator />
        </StateProvider>
      </NavigationContainer>
    </GestureHandlerRootView>

  );
}
export default App;
