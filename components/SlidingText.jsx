import { View, Text } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence, runOnJS, Easing, withDelay, withRepeat } from 'react-native-reanimated';
import Colors from '../colors';
import typography from '../typography';


//! This component is experimental. Not working properly.

export default function SlidingText({ text, isLeft }) {
    const [textWidth, setTextWidth] = useState(0);
    const [textHeight, setTextHeight] = useState(0);
    const translateX = useSharedValue(0);
    const blueBoxWidth = useSharedValue(95);
    const blueBoxLeft = useSharedValue(120);

    const animationStarted = useRef(false);

    useEffect(() => {
        if (textWidth > 0 && !animationStarted.current) {
            animationStarted.current = true;

            const textAnimation = () => {
                translateX.value = withRepeat(
                    withSequence(
                        withDelay(1000, withTiming(-textWidth * 1.1, { duration: 1700, easing: Easing.linear })),
                        withDelay(250, withTiming(0, { duration: 0 }))
                    ),
                    -1
                );
            };

            const boxAnimation = () => {
                blueBoxWidth.value = withRepeat(
                    withSequence(
                        withDelay(1200, withTiming(120, { duration: 1700, easing: Easing.linear })),
                        withDelay(0, withTiming(90, { duration: 0 }))
                    ),
                    -1
                );

                blueBoxLeft.value = withRepeat(
                    withSequence(
                        withDelay(1000, withTiming(10, { duration: 1700, easing: Easing.linear })),
                        withDelay(250, withTiming(120, { duration: 0 }))
                    ),
                    -1
                );
            };

            textAnimation();
            boxAnimation();
        }
    }, [textWidth]);

    // Animated styles
    const animatedTextStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const animatedBoxStyle = useAnimatedStyle(() => ({
        width: blueBoxWidth.value,
        left: blueBoxLeft.value,
    }));

    return (
        <View>
            <Animated.View style={[textWidth > 100 && animatedTextStyle]}>
                <Text
                    style={[{ color: Colors.Gray900, marginRight: !isLeft & textWidth > 100 && -10, marginLeft: isLeft & textWidth > 100 && -10 }, typography.Title2Bold]}
                    onLayout={(event) => {
                        const { width, height } = event.nativeEvent.layout;
                        setTextWidth(width);
                        setTextHeight(height);
                    }}
                >
                    {text}
                </Text>
            </Animated.View>

            {isLeft && (
                <>
                    <View
                        style={{
                            backgroundColor: "#fff",
                            height: textHeight,
                            width: 110,
                            position: "absolute",
                            left: 100,
                            zIndex: 3
                        }}
                    />
                </>
            )}
        </View>
    );
}
