"use client";
import React, { createContext, useContext, useState } from 'react';


type DeviceControllerContextType = {
  deviceStatus: boolean;
  setDeviceInfo: (status: boolean) => void;
};

const DeviceControllerContext = createContext<DeviceControllerContextType | undefined>(undefined);

export const useDeviceInfo = () => {
  const context = useContext(DeviceControllerContext);
  if (!context) {
    throw new Error("useSectionStatus must be used within a SectionStatusProvider");
  }
  return context;
};

type DeviceControllerContextProviderProps = {
	children: React.ReactNode;
};

export const DeviceControllerContextProvider: React.FC<
	DeviceControllerContextProviderProps
> = ({
	children
}: {
	children: React.ReactNode;
}) => {
  const [deviceStatus, setDeviceInfo] = useState(true);

  return (
    <DeviceControllerContext.Provider value={{ deviceStatus, setDeviceInfo: setDeviceInfo }}>
      {children}
    </DeviceControllerContext.Provider>
  );
};