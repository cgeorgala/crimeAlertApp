import { Typography} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetIncidentByIdQuery } from '../../store/api';
import { IncidentForm } from '../../components/incidentForm';


export const IncidentEditPage = () => {

  const { id } =  useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetIncidentByIdQuery(id);

  if (isLoading) {
    return <Typography>Φόρτωση...</Typography>;
  }

  if (!data?.incident) {
    return <Typography>Το συμβάν δε βρέθηκε</Typography>;
  }

  if (data.incident.verify_status !== 'Unverified'){
    return (
        <Typography>Το συμβάν δε μπορεί πλέον να τροποποιηθεί, έχει επιβεβαιωθεί από την Αστυνομία. </Typography>
    );
  }

  return (
    <IncidentForm
      mode="edit"
      initialValues={data.incident}
      onSuccess={() => navigate('/incidentsListModify')}
    />
  );
};
