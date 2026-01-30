import { Box, Container, Typography } from '@mui/material';
import { TopMenuBar } from '../components/header';
import { Footer } from '../components/footer';
import { useGetPageTitle } from './utils';

export const AppLayout = ({ children }) => {
  const title = useGetPageTitle();
  return (
    <Box
      sx={{
        margin: 0,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TopMenuBar />
      <Box
        component="main"
        flex={1}
        py={{ xs: 2, sm: 4, backgroundColor: '#F9F9F9' }}
      >
        <Container >
          <Typography variant="h4" gutterBottom>
            {' '}
            {title}
          </Typography>
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};
