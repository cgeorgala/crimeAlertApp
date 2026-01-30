import { Box, Typography, Link, Grid } from '@mui/material';
import { getRoutesByAuthStatus } from '../../routes/constants';
import {FOOTER_TEXT} from './constants';
import { useNavigate } from 'react-router-dom';

export const Footer = () => {
  const { publicRoutes } = getRoutesByAuthStatus();
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    navigate(path);
  };

  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        bgcolor: 'grey.900',
        color: 'grey.100',
        height: '130px',
      }}
    >
      <Grid container>
        <Grid item size={3}></Grid>
        <Grid item size={6}></Grid>
        <Grid item size={3}>
          <Typography>{FOOTER_TEXT.LINKS_TITLE}</Typography>
          {publicRoutes.map(route => (
            <Link href="#" onClick={() => handleLinkClick(route.path)} sx={{display: 'block'}}>{route.title}</Link>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};
