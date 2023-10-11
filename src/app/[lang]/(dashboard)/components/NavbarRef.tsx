"use client";
import React, { createContext, useContext, useRef } from 'react';

type ScrollContextType = {
	containerRef: React.RefObject<HTMLElement>;
};

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const useScrollContext = () => {
	const context = useContext(ScrollContext);
	if (!context) {
		throw new Error("useScrollContext must be used within a ScrollProvider");
	}
	return context;
};

type ScrollProviderProps = {
	children: React.ReactNode;
}

export const ScrollProvider: React.FC<
	ScrollProviderProps
> = ({
	children
}:{
	children: React.ReactNode
}) => {
	const containerRef = useRef<HTMLElement>(null);

	return (
		<ScrollContext.Provider value={{ containerRef }}>
			{children}
		</ScrollContext.Provider>
	);
};