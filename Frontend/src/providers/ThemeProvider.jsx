import React, { createContext } from 'react';
import useDarkMode from '../hooks/useDarkMode';

export const ThemeContext = createContext('light');

const Provider =  ({ children }) => {
  const [theme, toggleTheme] = useDarkMode();

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default Provider
