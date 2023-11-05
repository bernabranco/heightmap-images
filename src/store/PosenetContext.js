import React, { createContext, useState, useContext } from "react";

const PosenetContext = createContext();

const usePosenetContext = () => useContext(PosenetContext);

const PosenetProvider = ({ children }) => {
  const [posenetValues, setPosenetValues] = useState();

  // Function to update posenetValues
  const updatePosenetValues = (newValues) => {
    setPosenetValues(newValues);
  };

  return (
    <PosenetContext.Provider value={{ posenetValues, updatePosenetValues }}>
      {children}
    </PosenetContext.Provider>
  );
};

export { PosenetProvider, usePosenetContext, PosenetContext as default };
