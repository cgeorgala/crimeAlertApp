import { useEffect } from 'react';
import { Button, Stack, Paper, Typography, Box } from '@mui/material';
import { useLazyGetAllIncidentsQuery, useValidateIncidentMutation } from '../../store/api';


export const IncidentVerifyPage = () => {
  const [getAllIncidents, { data, isLoading }] = useLazyGetAllIncidentsQuery();
  const [validateIncident] = useValidateIncidentMutation();

  useEffect(() => {
    getAllIncidents({verify_status: 'Unverified'});
  }, [getAllIncidents]);

  const handleValidate = async (id, status) => {
    try{
      await validateIncident({id, status}).unwrap();
      // Refresh list
      getAllIncidents({verify_status: 'Unverified'});
    }catch (error){
      console.error('validateIncident failed, e');
    }
  };

  if (isLoading) return <Typography>Φόρτωση...</Typography>;
  
  if (!data?.incidents?.length){
    return <Typography>Δεν υπάρχουν συμβάντα προς επαλήθευση</Typography>;
  }

  return (
    <Stack spacing={2}>
      {data.incidents.map(incident => (
        <Paper key={incident.id} sx={{ width: '100%', maxWidth: 600, }}>
          <Box sx={{ border:'1px solid #ddd', p: 2}}>
            <Typography variant="h6">{incident.title}</Typography>
            <Typography variant="body2">Διεύθυνση: {incident.address}</Typography>
            <Typography variant="body2">
              Ημερομηνία: {''} 
              {new Date(incident.incident_date).toLocaleString('el-GR')}
            </Typography>
            <Typography variant="body2">Περιγραφή: {incident.description}</Typography>

            <Box sx= {{mt: 2, display: 'flex', gap: 2}}>
              <Button
                variant="contained"
                onClick={( () => handleValidate(incident.id, 'Verified-official'))}
              >
                Επαλήθευση
              </Button>
              <Button
                variant="outlined"
                onClick={( () => handleValidate(incident.id, 'Verified-Unofficial'))}
              >
                Παράβλεψη
              </Button> 
            </Box>
          </Box>
        </Paper>
      ))}
    </Stack>
  );
};
