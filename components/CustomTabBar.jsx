import React, { useContext, useEffect } from 'react';
import { View, Image, TouchableOpacity, Dimensions, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StateViewContext } from '../StateProvider';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Colors from '../colors';
import typography from '../typography';

const screenWidth = Dimensions.get("screen").width;

const CustomTabBar = ({ state, descriptors, navigation }) => {
    const { bottom } = useSafeAreaInsets();
    const { isBlurViewOn } = useContext(StateViewContext);
    const backgroundColor = useSharedValue(Colors.White);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: withTiming(backgroundColor.value, { duration: 200, }),
        };
    });

    useEffect(() => {
        backgroundColor.value = isBlurViewOn ? '#878d97' : Colors.White;
    }, [isBlurViewOn]);

    return (
        <Animated.View style={[styles.container, animatedStyle, { paddingBottom: bottom, borderTopWidth: isBlurViewOn ? 0 : 0.5, borderTopColor: Colors.Gray200 }]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;
                const isFocused = state.index === index;

                const iconSource = (() => {
                    switch (route.name) {
                        case 'Plans':
                            return require('../assets/icons/CalendarHeart.png');
                        case 'Flights':
                            return require('../assets/icons/Plane.png');
                        case 'Me':
                            return require('../assets/icons/User.png');
                        default:
                            return null;
                    }
                })();

                const onPress = () => {
                    navigation.navigate(route.name);
                };

                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={{ selected: isFocused }}
                        accessibilityLabel={label}
                        onPress={onPress}
                        style={styles.tabButton}
                    >
                        <Image
                            source={iconSource}
                            style={[styles.icon, { tintColor: isFocused ? Colors.Gray900 : Colors.Gray500 }]}
                        />
                        <Text style={[{ color: isFocused ? Colors.Gray900 : Colors.Gray500 }, typography.Caption2Semibold]}>{route.name}</Text>
                    </TouchableOpacity>
                );
            })}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 61,
        backgroundColor: Colors.White,
        borderTopWidth: 0,
        justifyContent: 'space-around',
        width: screenWidth,
        zIndex: 3,
    },
    tabButton: {
        flex: 1,
        paddingTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 28,
        height: 28,
    },
});

export default CustomTabBar;
