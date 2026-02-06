import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Box,
} from '@mui/material';
import { AccountCircle, Menu as MenuIcon } from '@mui/icons-material';

import { useGetMenuItems } from './useGetMenuItems';
import { selectUser } from '../../store/auth';
import { useDeleteUserMutation } from '../../store/api';
import { showToast } from '../../store/toaster';
import logo from '../../assets/app-logo.jpg';

export const TopMenuBar = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [deleteUser] = useDeleteUserMutation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    setAnchorEl(null);
    setAnchorEl2(null);
  }, [user])

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu2 = event => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleMenuItemClick = async item => {
    //Delete user menu item
    if (item.label === 'Διαγραφή προφίλ'){
      const confirmed = window.confirm(
        'Είστε σίγουροι ότι θέλετε να διαγράψετε το προφίλ σας;'
      );
      if (!confirmed){
        handleClose2();
        return;
      }

      try{
        await deleteUser().unwrap();
        dispatch(
          showToast({
            message: 'Ο λογαριασμός διαγράφηκε επιτυχώς',
            severity: 'success',
          })
        );
      }catch (err) {
        dispatch(
          showToast({
            message: 'Σφάλμα κατά τη διαγραφή λογαριασμού',
            severity: 'error',
          })
        );
      }
      handleClose2();
      return;
    }

    //Normal menu items
    item.onClick?.();
    item.route && navigate(item.route);
    handleClose();
  };

  const menuItems = useGetMenuItems();
  const incidentMenuItems = menuItems.filter(item =>
  ['Τα Συμβάντα μου', 'Δημιουργία Συμβάντος', 'Επαλήθευση Συμβάντος', 'Αναζήτηση Συμβάντων'].includes(item.label)
);
  const userMenuItems = menuItems.filter(item =>
  ['Επεξεργασία στοιχείων', 'Διαγραφή προφίλ', 'Έξοδος'].includes(item.label)
);

  return (
    <AppBar position="static">
      <Toolbar sx={{ 
        minHeight: '100px!important',display: 'flex', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <Box
            component="img"
            src={logo}
            alt="Crime Alert App Logo"
            sx={{ height: '80%', maxHeight: 100, mr: 2 }}
          />
          <Typography variant="subtitle" component="div" sx={{ fontWeight: 800 }}>
            Stay informed stay safe
          </Typography>
        </Box>

        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        {user && (
          <div>
            {/*Incidents menu*/}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {incidentMenuItems.map(item => (
                <MenuItem
                  key={item.label}
                  onClick={() => handleMenuItemClick(item)}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>

            {/*Users menu*/}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar-2"
              aria-haspopup="true"
              onClick={handleMenu2}
              color="inherit"
              sx={{ ml : 0.1 }} // small margin between icons
            >
              <AccountCircle /> 
            </IconButton>
            <Menu
              id="menu-appbar-2"
              anchorEl={anchorEl2}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl2)}
              onClose={handleClose2}
            >
              {userMenuItems.map(item => (
                <MenuItem
                  key={item.label}
                  onClick={() => handleMenuItemClick(item)}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};
