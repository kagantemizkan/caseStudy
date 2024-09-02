import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Text, Image, Pressable, useWindowDimensions } from 'react-native';
import Svg, { Defs, Mask, Rect, Circle } from 'react-native-svg';
import moment from 'moment';
import { StateViewContext } from '../StateProvider';
import Animated, { LinearTransition, FadeIn, FadeOut, FadeOutRight, } from 'react-native-reanimated';
// State Provider
// Themes
import Colors from '../colors';
import typography from '../typography';
// Components
import SlidingText from './SlidingText';
// Images
import Takeoff from '../assets/icons/Takeoff.png';
import Landing from '../assets/icons/Landing.png';
import planeVector from '../assets/planeVector.png';
import TurkishAirlinesLogo from '../assets/TurkishAirlinesLogo.png';


export default function FlightsCard({ item, setFlightPressedId, flightPressedId, moveTo, isLast, scrollViewHeight }) {

  const HEIGHT = item.connectingFlight == true ? 365 : 180;
  const WIDTH = useWindowDimensions().width - 32;
  // Refs
  const viewRef = useRef(null);
  // -----------------

  // States
  const [cardYPosition, setCardYPosition] = useState(0);
  const [zIndex, setZindex] = useState(1);
  const [shouldRenderAbove, setShouldRenderAbove] = useState(false);
  // -----------------

  // Context States
  const { isBlurViewOn, setIsBlurViewOn, setFlightData, experimentalSlideText, flightData } = useContext(StateViewContext);
  // -----------------


  // useEffects
  useEffect(() => {
    const isAbove = cardYPosition + HEIGHT + 60 > scrollViewHeight;
    setShouldRenderAbove(isAbove);
  }, [cardYPosition, scrollViewHeight]);

  useEffect(() => {
    if (flightPressedId === item.id) {
      setZindex(3);
    } else {
      setZindex(-3);
    }
  }, [flightPressedId]);


  // -----------------

  // Functions
  const formatDate = (dateString) => {
    return moment(dateString, 'DD/MM/YYYY').format('DD MMM YYYY');
  };

  const handleDeleteFlight = () => {
    setIsBlurViewOn(false)
    setFlightData((prevFlightData) => prevFlightData.filter(flight => flight.id !== item.id));
  }

  const handlePress = () => {
    setIsBlurViewOn(true);
    setFlightPressedId(item.id);
    requestAnimationFrame(() => {
      moveTo(cardYPosition - 100);
    });
  };


  // -----------------


  return (
    <Animated.View ref={viewRef} layout={LinearTransition.springify().damping(100)} exiting={FadeOut} entering={FadeIn} style={{ position: 'relative', width: WIDTH, height: HEIGHT, zIndex: zIndex, marginHorizontal: 16, marginBottom: isLast ? 52 : 16 }}
      onLayout={(event) => {
        const { y } = event.nativeEvent.layout;
        setCardYPosition(y);
      }}
    >
      {/* Ticket View Svg (First one connected flights)*/}
      {item.connectingFlight
        ?
        <Svg
          width={WIDTH}
          height={HEIGHT}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          style={{ position: 'absolute', top: 0, left: 0 }}>
          <Circle
            stroke={Colors.Gray200}
            strokeWidth={2.25}
            cx={0}
            cy={HEIGHT / 3.5}
            r="12"
            fill="none"
          />
          <Circle
            stroke={Colors.Gray200}
            strokeWidth={2.25}
            cx={WIDTH}
            cy={HEIGHT / 3.5}
            r="12"
            fill="none"
          />
          <Circle
            stroke={Colors.Gray200}
            strokeWidth={2.25}
            cx={0}
            cy={HEIGHT / 1.3}
            r="12"
            fill="none"
          />
          <Circle
            stroke={Colors.Gray200}
            strokeWidth={2.25}
            cx={WIDTH}
            cy={HEIGHT / 1.3}
            r="12"
            fill="none"
          />
          <Defs>
            <Mask id="circleMask" width={WIDTH} height={HEIGHT}>
              <Rect
                x="0"
                y="0"
                rx="16"
                ry="16"
                width={WIDTH}
                height={HEIGHT}
                fill="white"
              />
              <Circle cx={0} cy={HEIGHT / 3.5} r="12" fill="black" />
              <Circle cx={WIDTH} cy={HEIGHT / 3.5} r="12" fill="black" />
              <Circle cx={0} cy={HEIGHT / 1.3} r="12" fill="black" />
              <Circle cx={WIDTH} cy={HEIGHT / 1.3} r="12" fill="black" />
            </Mask>
          </Defs>

          <Rect
            stroke={Colors.Gray200}
            strokeWidth={2.25}
            mask="url(#circleMask)"
            x="0"
            y="0"
            rx="16"
            ry="16"
            width={WIDTH}
            height={HEIGHT}
            fill="white"
          />
        </Svg>
        :
        <Svg
          width={WIDTH}
          height={HEIGHT}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          style={{ position: 'absolute', top: 0, left: 0 }}>
          <Circle
            stroke={Colors.Gray200}
            strokeWidth={2.25}
            cx={0}
            cy={HEIGHT / 2}
            r="12"
            fill="none"
          />
          <Circle
            stroke={Colors.Gray200}
            strokeWidth={2.25}
            cx={WIDTH}
            cy={HEIGHT / 2}
            r="12"
            fill="none"
          />
          <Defs>
            <Mask id="circleMask" width={WIDTH} height={HEIGHT}>
              <Rect
                x="0"
                y="0"
                rx="16"
                ry="16"
                width={WIDTH}
                height={HEIGHT}
                fill="white"
              />
              <Circle cx={0} cy={HEIGHT / 2} r="12" fill="black" />
              <Circle cx={WIDTH} cy={HEIGHT / 2} r="12" fill="black" />
            </Mask>
          </Defs>
          <Rect
            stroke={Colors.Gray200}
            strokeWidth={2.25}
            mask="url(#circleMask)"
            x="0"
            y="0"
            rx="16"
            ry="16"
            width={WIDTH}
            height={HEIGHT}
            fill="white"
          />
        </Svg>
      }

      {/* Ticket View Content (First one connected flights)*/}
      <View
        style={{
          position: "relative",
          width: WIDTH,
          height: HEIGHT,
          flex: 1,
          paddingVertical: 16,
          paddingHorizontal: 18,
          overflow: 'hidden',
          left: 0,
          top: 0,
          backgroundColor: 'transparent',
        }}>
        <Pressable disabled={isBlurViewOn} onPress={handlePress} style={{ backgroundColor: Colors.White, flex: 1 }}>
          {/* First flight */}
          <View style={{ marginBottom: 16, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
            <View style={{ gap: 5, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Image style={{ width: 28, height: 28, marginRight: 5 }} source={TurkishAirlinesLogo} />
              <Text style={[{ color: Colors.Gray500 }, typography.Caption1Semibold]}>{item.flightNumber}</Text>
              <Text style={{ color: Colors.Gray500, fontSize: 24 }}>•</Text>
              <Text style={[{ color: Colors.Gray500 }, typography.Caption1Semibold]}>{item.airline}</Text>
            </View>
            <Text style={[{ color: Colors.Orange700, borderRadius: 9, borderColor: Colors.Orange200, borderWidth: 0.5, backgroundColor: Colors.Orange50, paddingHorizontal: 10, paddingVertical: 2 }, typography.Caption2Medium]}>{item.flightTime}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image style={{ width: 24, height: 24, marginRight: 5 }} source={Takeoff} />
              <Text style={[{ color: Colors.Gray500 }, typography.Caption1]}>{formatDate(item.takeoffDate)}</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image style={{ width: 24, height: 24, marginRight: 5 }} source={Landing} />
              <Text style={[{ color: Colors.Gray500 }, typography.Caption1]}>{formatDate(item.landingDate)}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1, alignItems: "flex-start" }}>
              {experimentalSlideText ? <SlidingText isLeft={true} text={item.takeoffCity} /> :
                <Text numberOfLines={1} style={[{ color: Colors.Gray900 }, typography.Title2Bold]}>
                  {item.takeoffCity}
                </Text>}
            </View>

            <View style={{ alignItems: "center" }}>
              <Image style={{ width: 104, height: 34, zIndex: 3 }} source={planeVector} />
            </View>

            <View style={{ flex: 1, alignItems: "flex-end" }}>
              {experimentalSlideText ? <SlidingText isLeft={false} text={item.landingCity} /> :
                <Text numberOfLines={1} style={[{ color: Colors.Gray900 }, typography.Title2Bold]}>
                  {item.landingCity}
                </Text>}
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={[{ color: Colors.Gray700 }, typography.Caption1Semibold]}>{item.takeoffTime}</Text>
            <Text style={[{ color: Colors.Gray700 }, typography.Caption1Semibold]}>{item.landingTime}</Text>
          </View>
          {/* Seperator */}
          <View style={{ width: WIDTH - 32, borderTopWidth: 1, borderColor: Colors.Gray200, marginVertical: 16 }} />
          {/* Connected flight (if there is) */}
          <View style={{ marginBottom: 16, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
            <View style={{ gap: 5, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Image style={{ width: 28, height: 28, marginRight: 5 }} source={TurkishAirlinesLogo} />
              <Text style={[{ color: Colors.Gray500 }, typography.Caption1Semibold]}>{item.flightNumber2}</Text>
              <Text style={{ color: Colors.Gray500, fontSize: 24 }}>•</Text>
              <Text style={[{ color: Colors.Gray500 }, typography.Caption1Semibold]}>{item.airline2}</Text>
            </View>
            <Text style={[{ color: Colors.Orange700, borderRadius: 9, borderColor: Colors.Orange200, borderWidth: 0.5, backgroundColor: Colors.Orange50, paddingHorizontal: 10, paddingVertical: 2 }, typography.Caption2Medium]}>{item.flightTime2}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image style={{ width: 24, height: 24, marginRight: 5 }} source={Takeoff} />
              <Text style={[{ color: Colors.Gray500 }, typography.Caption1]}>{formatDate(item.takeoffDate2)}</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image style={{ width: 24, height: 24, marginRight: 5 }} source={Landing} />
              <Text style={[{ color: Colors.Gray500 }, typography.Caption1]}>{formatDate(item.landingDate2)}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1, alignItems: "flex-start" }}>

              {experimentalSlideText ? <SlidingText isLeft={true} text={item.takeoffCity2} /> :
                <Text numberOfLines={1} style={[{ color: Colors.Gray900 }, typography.Title2Bold]}>
                  {item.takeoffCity2}
                </Text>}
            </View>

            <View style={{ alignItems: "center" }}>
              <Image style={{ width: 104, height: 34, zIndex: 3 }} source={planeVector} />
            </View>

            <View style={{ flex: 1, alignItems: "flex-end" }}>

              {experimentalSlideText ? <SlidingText isLeft={false} text={item.landingCity2} /> :
                <Text numberOfLines={1} style={[{ color: Colors.Gray900 }, typography.Title2Bold]}>
                  {item.landingCity2}
                </Text>}

            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={[{ color: Colors.Gray700 }, typography.Caption1Semibold]}>{item.takeoffTime2}</Text>
            <Text style={[{ color: Colors.Gray700 }, typography.Caption1Semibold]}>{item.landingTime2}</Text>
          </View>
        </Pressable>
      </View>

      {/* Button */}
      {flightPressedId === item.id && isBlurViewOn &&
        <Animated.View exiting={FadeOut.duration(200)} entering={FadeIn.duration(200)} style={{
          position: "absolute",
          bottom: shouldRenderAbove ? null : -68,
          top: shouldRenderAbove ? -68 : null
        }}>
          <Pressable
            onPress={handleDeleteFlight}
            style={{
              borderRadius: 14,
              width: WIDTH,
              height: 50,
              backgroundColor: Colors.Red100,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={[{ color: Colors.Red900 }, typography.FootnoteBold]}>Remove Flight</Text>
          </Pressable>
        </Animated.View>
      }
    </Animated.View>
  );
}
