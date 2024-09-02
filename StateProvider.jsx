import React, { createContext, useState } from 'react';

export const StateViewContext = createContext();

export const StateProvider = ({ children }) => {
  const [isBlurViewOn, setIsBlurViewOn] = useState(false)
  const [flightData, setFlightData] = useState([]);
  const [experimentalSlideText, setExperimentalSlideText] = useState(false)

  return (
    <StateViewContext.Provider value={{ isBlurViewOn, setIsBlurViewOn, flightData, setFlightData, experimentalSlideText, setExperimentalSlideText }}>
      {children}
    </StateViewContext.Provider>
  );
};
