import { useGetOrganizationQuery } from '../../store/api';
import { Typography, Box, Link, Stack } from '@mui/material';
import {
  InfoOutlined,
  FlagOutlined,
  LocationOnOutlined,
  EmailOutlined,
} from '@mui/icons-material';

export const AboutUsPage = () => {
  const { data: aboutUs } = useGetOrganizationQuery();
  if (!aboutUs) {return null;}

  return (
    <Box sx={{ mt: 4, px: 2}}>
      {/* Name */}
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
        <InfoOutlined color="primary" />
        <Typography variant="h6" fontWeight={600}>{aboutUs.name}</Typography>
      </Stack>
      <Typography sx={{ mt: 1 }}>{aboutUs.description}</Typography>

      {/* Mission */}
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 3 }}>
        <FlagOutlined color="primary" />
        <Typography variant="h6" fontWeight={600}>Αποστολή μας</Typography>
      </Stack>
      <Typography sx={{ mt: 1 }}>{aboutUs.mission}</Typography>

      {/* Address */}
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 3 }}>
        <LocationOnOutlined color="primary" />
        <Typography variant="h6" fontWeight={600}>Έδρα</Typography>
      </Stack>
      <Typography sx={{ mt: 1 }}>{aboutUs.address}</Typography>

      {/* Contact email */}
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 3 }}>
        <EmailOutlined color="primary" />
        <Typography variant="h6" fontWeight={600}>Επικοινωνία</Typography>
      </Stack>

      <Link
        href={`mailto:${aboutUs.contactEmail}`}
        underline="hover"
        sx={{ display: 'inline-block', mt: 1 }}
      >
        {aboutUs.contactEmail}
      </Link>
    </Box>
  );
};
