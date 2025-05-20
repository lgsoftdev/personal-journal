import { Menu, MenuItem, Typography } from '@mui/material';
import { MenuOptions } from '../../types';
import { useCallback } from 'react';
import styles from './styles.module.css';

interface MainMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: (event: React.MouseEvent<HTMLElement>) => void;
  selectedMenuOption?: MenuOptions;
}

const MainMenu = ({
  anchorEl,
  open,
  handleClose,
  selectedMenuOption,
}: MainMenuProps) => {
  const getIsActive = useCallback(
    (menuOption: MenuOptions) => {
      if (menuOption === selectedMenuOption) {
        return true;
      }
      return false;
    },
    [selectedMenuOption]
  );

  return (
    <Menu id="main-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
      <MenuItem id={MenuOptions.Calendar} onClick={handleClose}>
        <Typography
          className={
            getIsActive(MenuOptions.Calendar) ? styles.active : undefined
          }
        >
          Calendar
        </Typography>
      </MenuItem>
      <MenuItem id={MenuOptions.Notes} onClick={handleClose}>
        <Typography
          className={getIsActive(MenuOptions.Notes) ? styles.active : undefined}
        >
          Notes
        </Typography>
      </MenuItem>
      <MenuItem id={MenuOptions.TelAdds} onClick={handleClose}>
        <Typography
          className={
            getIsActive(MenuOptions.TelAdds) ? styles.active : undefined
          }
        >
          Tel/Adds
        </Typography>
      </MenuItem>
    </Menu>
  );
};

export default MainMenu;
