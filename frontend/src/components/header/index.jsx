import * as React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

import { useGetMenuItems } from './useGetMenuItems';
import { selectUser } from '../../store/auth';

export const TopMenuBar = () => {
  const user = useSelector(selectUser);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = item => {
    item.onClick?.();
    item.route && navigate(item.route);
    handleClose();
  };

  const menuItems = useGetMenuItems();

  return (
    <AppBar position="static">
      <Toolbar sx={{ minHeight: '100px!important' }}>
        <Typography variant="subtitle" component="div" sx={{ flexGrow: 1 }}>
          Stay informed stay safe
        </Typography>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
        </IconButton>

        {user && (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
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
              {menuItems.map(item => (
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
