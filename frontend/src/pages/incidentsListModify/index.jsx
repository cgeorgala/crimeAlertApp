import { useEffect } from 'react';
import { Button, Stack, Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGetMyIncidentsQuery } from '../../store/api';


export const IncidentsListModifyPage = () => {
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useGetMyIncidentsQuery({refetchOnMountOrArgChange: true, });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <Typography>Φόρτωση...</Typography>;
  }

  if (!data?.incidents?.length) {
    return <Typography>Δεν υπάρχουν συμβάντα για επεξεργασία</Typography>;
  }

  return (
    <Stack spacing={2} sx={{ maxHeight: '500px', overflowY: 'auto', maxWidth: 620 }}>
      {data.incidents.map(incident => (
        <Paper key={incident.id} sx={{ width: '100%', maxWidth: 600 }}>
          <Box sx={{ border: '1px solid #ddd', p: 2 }}>
            <Typography variant="h6">{incident.title}</Typography>
            <Typography variant="body2">Διεύθυνση: {incident.address}</Typography>
            <Typography variant="body2">
              Ημερομηνία:{' '}
              {new Date(incident.incident_date).toLocaleString('el-GR')}
            </Typography>

            <Typography variant="body2">Περιγραφή: {incident.description}</Typography>

            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                onClick={() => navigate(`/incidents/${incident.id}/edit`)}
              >
                Επεξεργασία
              </Button>
            </Box>
          </Box>
        </Paper>
      ))}
    </Stack>
  );
};
