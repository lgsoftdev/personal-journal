import { Menu, MenuItem } from '@mui/material';
import { MenuOptions } from '../../types';

interface MainMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: (event: React.MouseEvent<HTMLElement>) => void;
}

const MainMenu = ({ anchorEl, open, handleClose }: MainMenuProps) => {
  return (
    <Menu id="main-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
      <MenuItem id={MenuOptions.Calendar} onClick={handleClose}>
        Calendar
      </MenuItem>
      <MenuItem id={MenuOptions.Notes} onClick={handleClose}>
        Notes
      </MenuItem>
      <MenuItem id={MenuOptions.TelAdds} onClick={handleClose}>
        Tel/Adds
      </MenuItem>
    </Menu>
  );
};

export default MainMenu;
