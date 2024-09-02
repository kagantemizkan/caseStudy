import React, { useRef, useState, useContext } from 'react';
import { View, Text, Image, Pressable, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { BlurView } from '@react-native-community/blur';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
// State Provider
import { StateViewContext } from '../StateProvider';
// Themes
import Colors from '../colors';
import typography from '../typography';
// Components
import FlightsCard from '../components/FlightsCard';
// Images
import plusIcon from '../assets/icons/plusIcon.png';
import plane from '../assets/icons/Plane.png';
// mockData
import { mockData } from '../mockData';

const screenWidth = Dimensions.get('screen').width;

export default function FlightsScreen() {

  // States
  const [flightPressedId, setFlightPressedId] = useState(null);
  const [scrollViewHeight, setScrollViewHeight] = useState(Dimensions.get('window').height);
  // -----------------

  // Context States
  const { isBlurViewOn, setIsBlurViewOn, flightData, setFlightData } = useContext(StateViewContext);
  // -----------------

  // Refs
  const refScrollView = useRef(null);
  // -----------------

  // functions
  const handleNewFlightAdd = () => {
    console.log(flightData.length)
    if (flightData.length > 7) return;

    if (mockData.length > 0) {
      let newFlight;
      let flightAdded = false;

      for (let i = 0; i < mockData.length; i++) {
        newFlight = { ...mockData[(flightData.length + i) % mockData.length] };

        const flightExists = flightData.some(flight => flight.id === newFlight.id);

        if (!flightExists) {
          flightAdded = true;
          break;
        }
      }

      if (flightAdded) {
        setFlightData(prevFlightData => {
          return [...prevFlightData, newFlight];
        });
      }
    }
  };


  const handleScrollViewLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setScrollViewHeight(height);
  };

  const moveTo = (position) => {
    if (refScrollView.current) {
      refScrollView.current.scrollTo({ x: 0, y: position, animated: true });
    }
  };
  // -----------------


  // Empty state render
  const EmptyList = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            marginBottom: 12, // DEĞİŞTİR
            padding: 14,
            borderRadius: 14,
            borderWidth: 0.5,
            borderColor: Colors.Gray200,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{ width: 28, height: 28, tintColor: Colors.Gray700 }}
            source={plane}
          />
        </View>
        <Text style={[{ color: Colors.Gray900 }, typography.Title3Bold]}>No Flights Added Yet</Text>
        <Text style={[{ marginBottom: 24, marginHorizontal: 30, color: Colors.Gray600, textAlign: 'center' }, typography.Body]}>
          Let's get started on your jet lag plan! Add your upcoming flights to begin your journey.
        </Text>
        <Pressable
          onPress={handleNewFlightAdd}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 24,
            backgroundColor: Colors.Orange600,
            borderRadius: 14,
          }}>
          <Text style={[{ color: Colors.White }, typography.SubheadlineSemiBold]}>Add Flight</Text>
        </Pressable>
      </View>
    )
  }
  // -----------------

  return (
    <ScrollView onContentSizeChange={(w, h) => setScrollViewHeight(h)} contentContainerStyle={{ flexGrow: flightData == 0 & 1 }} ref={refScrollView} onLayout={handleScrollViewLayout} scrollEnabled={!isBlurViewOn} style={{ backgroundColor: Colors.White, flex: 1, paddingTop: 40 }}>
      {/* Animated BlurView */}
      {isBlurViewOn &&
        <Animated.View style={{ elevation: 100000 }} entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}>
          <BlurView overlayColor={"#37415199"} blurRadius={1.8} blurAmount={1.8} style={{
            flex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            height: scrollViewHeight * flightData.length / 2,
            width: screenWidth,
            zIndex: 3,
          }}>
          </BlurView>
          <Pressable style={{ position: "absolute", top: 0, left: 0, height: 10000, width: screenWidth, zIndex: 3 }} onPress={() => setIsBlurViewOn(false)} />
        </Animated.View>
      }

      {/* Header */}
      <View
        style={{
          paddingHorizontal: 16,
          backgroundColor: Colors.White,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: -4,
        }}>
        <Text style={[{ color: Colors.Gray900 }, typography.LargeTitleBold]}>Flights</Text>
        <Pressable onPress={handleNewFlightAdd}>
          <Image style={{ width: 28, height: 28 }} source={plusIcon} />
        </Pressable>
      </View>

      {/* Empty State */}
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {flightData.length === 0 && <EmptyList />}
      </View>

      {/* Flight Data Map */}
      {flightData.length > 0 && flightData.map((item, index) => (
        <FlightsCard
          key={item.id}
          setFlightPressedId={setFlightPressedId}
          item={item}
          flightPressedId={flightPressedId}
          moveTo={moveTo}
          isLast={index === flightData.length - 1}
          scrollViewHeight={scrollViewHeight}
        />
      ))}

    </ScrollView>
  );
}
