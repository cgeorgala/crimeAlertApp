import { Grid } from '@mui/material';
import Markdown from 'react-markdown';

export const MarkdownInfo = ({children}) => {

  return (
    <Grid container spacing={1} maxWidth="md">
      <Grid item xs={12}>
        <Markdown>{children}</Markdown>
      </Grid>
    </Grid>
  );
};
