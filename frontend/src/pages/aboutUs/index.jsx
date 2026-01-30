import { useGetOrganizationQuery } from '../../store/api';
import { Typography } from '@mui/material';

export const AboutUsPage = () => {
  const { data: aboutUs } = useGetOrganizationQuery();

  if (!aboutUs) {return null;}
  return Object.keys(aboutUs).map(k => (
    <Typography key={k}>
      {k}: {aboutUs[k]}
    </Typography>
  ));
};
