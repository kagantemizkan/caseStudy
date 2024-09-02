import { View, Switch, Text } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
// State Provider
import { StateViewContext } from '../StateProvider';
// Components
import SlidingText from '../components/SlidingText';
// Themes
import Colors from '../colors';

//! This screen is for toggeling experimental feature

export default function PlansScreen() {
  const { setExperimentalSlideText } = useContext(StateViewContext);
  const [isToggleOn, setIsToggleOn] = useState(false);

  useEffect(() => {
    setExperimentalSlideText(isToggleOn);
  }, [isToggleOn, setExperimentalSlideText]);

  const handleToggleChange = (value) => {
    setIsToggleOn(value);
  };

  return (
    <View style={{ flex: 1, paddingTop: 64, alignItems: 'center', backgroundColor: '#fff' }}>
      <View style={{ alignItems: 'center', flexDirection: 'column', marginTop: 20, borderWidth: 1, borderColor: Colors.Gray200, borderRadius: 14 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <SlidingText text="Experimental Text Toggle:" />
          <Switch
            value={isToggleOn}
            onValueChange={handleToggleChange}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isToggleOn ? "#f5dd4b" : "#f4f3f4"}
          />
        </View>
        <Text style={{ paddingHorizontal: 20, color: "black" }}>
          The sliding text feature allows for a visually appealing way to handle text overflow issues.
          <Text style={{ color: "red" }}> Caution! This feature is not working properly also it may affect the appearance of the ticket view.</Text>
        </Text>
      </View>
    </View>
  );
}
