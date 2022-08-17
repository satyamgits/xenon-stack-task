import React, { useContext } from 'react';
import { ThemeContext } from '../../../providers/ThemeProvider';
import { WbSunny, Brightness2Outlined } from '@material-ui/icons'
import { Wrapper } from './styles';
import { IconButton } from '@material-ui/core';

const ToggleTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <IconButton type="button" onClick={toggleTheme} title={theme==='light'? 'Dark Mode' : 'Light Mode'} theme={theme}>
      {theme === 'light' ? <Brightness2Outlined  /> : <WbSunny style={{ color: 'white'}} title='Light Mode' />}
    </IconButton>
  );
};

export default ToggleTheme;
