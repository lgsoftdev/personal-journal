import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import MainMenu from './components/main-menu';
import { MenuOptions } from './types';
import Content from './components/content';

export default function App() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMenuOption, setSelectedMenuOption] = useState<
    MenuOptions | undefined
  >(MenuOptions.TelAdds);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
    setSelectedMenuOption(
      event.currentTarget.getAttribute('id') as MenuOptions
    );
  };

  return (
    <>
      <Box sx={{ minWidth: '100vw', maxWidth: '100vw' }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, border: 'none', outline: 'none' }}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Journal
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <MainMenu
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        selectedMenuOption={selectedMenuOption}
      />
      <Content selectedMenuOption={selectedMenuOption} />
    </>
  );
}
