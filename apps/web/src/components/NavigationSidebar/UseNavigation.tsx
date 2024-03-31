"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

interface UseNavContext {
	opened: boolean;
	setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavContext = createContext<UseNavContext>({
	opened: false,
	setOpened: (_) => void 0
});

export const UseNavigationProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const [opened, setOpened] = useState(false);
	const value = useMemo(() => ({ opened, setOpened }), [opened]);

	return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
};

export const useNavigation = () => {
	return useContext(NavContext);
};
