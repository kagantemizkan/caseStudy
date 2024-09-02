import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlightsScreen from './screens/FlightsScreen';
import PlansScreen from './screens/PlansScreen';
import ProfileScreen from './screens/ProfileScreen';
import CustomTabBar from './components/CustomTabBar';
import { StateViewContext } from './StateProvider';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur';
import { Pressable, Dimensions } from 'react-native';
import Colors from './colors';

const Tab = createBottomTabNavigator();
const screenWidth = Dimensions.get("screen").width;

function TabGroup() {
  return (
    <Tab.Navigator
      initialRouteName='Flights'
      tabBar={props => <CustomTabBar {...props} />}  // Özel tab bar bileşenini kullanıyoruz
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.Gray900,
        tabBarInactiveTintColor: Colors.Gray500,
        tabBarStyle: {
          backgroundColor: Colors.White,
          height: 61,
          borderTopWidth: 0,
          zIndex: -10
        },
      }}
    >
      <Tab.Screen name="Plans" component={PlansScreen} />
      <Tab.Screen name="Flights" component={FlightsScreen} />
      <Tab.Screen name="Me" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { isBlurViewOn, setIsBlurViewOn } = useContext(StateViewContext);

  return (
    <>
      <TabGroup />
      {isBlurViewOn &&
        <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}>
          <BlurView blurRadius={1.8} blurAmount={1.8} overlayColor={"transparent"} style={{
            flex: 1,
            position: 'absolute',
            bottom: 0,
            height: 61,
            width: screenWidth,
            zIndex: 3,
          }} >
            <Pressable style={{ flex: 1 }} onPress={() => setIsBlurViewOn(false)} />
          </BlurView>
        </Animated.View>
      }
    </>
  );
}
