import { useForm } from 'react-hook-form';
import { FormInput } from '../../components/formInput';
import { Typography, Box, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LOGIN_FORM_FIELDS, LOGIN_FIELD_NAMES } from './constants';
import { useLoginUserMutation } from '../../store/api';

export const HomePage = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const { control, handleSubmit } = useForm({
    mode: 'onBlur',
    defaultValues: {
      [LOGIN_FIELD_NAMES.USERNAME]: '',
      [LOGIN_FIELD_NAMES.PASSWORD]: '',
    },
  });

  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate('/register');
  };

  const onSubmit = data => {
    loginUser(data);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          {LOGIN_FORM_FIELDS.map(formField => (
            <Grid size={{ md: 4 }} key={formField.name}>
              <FormInput
                control={control}
                label={formField.label}
                name={formField.name}
              />
            </Grid>
          ))}
        </Grid>
        <Button variant="contained" type="submit">
          Είσοδος
        </Button>
      </form>
      <Typography>Δεν έχετε λογαριασμό;</Typography>
      <Button onClick={handleRegisterClick} disabled={isLoading} sx={{ px: 0}}>
        Εγγραφή τώρα
      </Button>
    </Box>
  );
};
