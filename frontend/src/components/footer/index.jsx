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
        bgcolor: '#04533D',
        color: 'rgba(255,255,255,0.9)',
        height: '130px',
      }}
    >
      <Grid container>
        <Grid item size={3}></Grid>
        <Grid item size={6}></Grid>
        {/*Links on the right*/}
        <Grid item size={3}>
          <Box sx={{textAlign: 'right', pr: 4}}>
          <Typography sx={{fontWeight: 600, mb: 1}}>
            {FOOTER_TEXT.LINKS_TITLE}
          </Typography>

          {publicRoutes.map(route => (
            <Link href="#" 
            onClick={() => handleLinkClick(route.path)}
            sx={{
              display: 'block',
              color: 'inherit',
              textDecorationColor: 'inherit',
              '&:hover':{
                textDecorationColor: 'inherit',
                opacity: 0.85,
              },
            }}
            >
              {route.title}
            </Link>
          ))}
        </Box>
        </Grid>
        {/*Copyright*/}
        <Grid item size={12}>
          <Typography
            variant="body2"
            sx={{ 
              textAlign: 'center',
              mt: 2, 
              opacity: 0.8, 
            }}
          >
            {FOOTER_TEXT.COPYRIGHT}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
