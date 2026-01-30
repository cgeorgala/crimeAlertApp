import {Box, Grid, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { REGISTER_FIELD_NAMES, FORM_FIELDS } from './constants';
import { useCreateUserMutation } from '../../store/api';
import { FormInput } from '../../components/formInput';

export const UserRegisterPage = () => {
  const [createUser, { isLoading }] = useCreateUserMutation();

  const { control, handleSubmit } = useForm({
    mode: 'onBlur',
    defaultValues: {
      [REGISTER_FIELD_NAMES.NAME]: '',
      [REGISTER_FIELD_NAMES.SURNAME]: '',
      [REGISTER_FIELD_NAMES.EMAIL]: '',
      [REGISTER_FIELD_NAMES.USERNAME]: '',
      [REGISTER_FIELD_NAMES.PASSWORD]: '',
      [REGISTER_FIELD_NAMES.ADDRESS]: '',
      [REGISTER_FIELD_NAMES.AREA]: '',
      [REGISTER_FIELD_NAMES.ZIPCODE]: '',
    },
  });

  const onSubmit = data => {
    createUser(data);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          {FORM_FIELDS.map(formField => (
            <Grid size={{ md: 4 }} key={formField.name}>
              <FormInput
                control={control}
                label={formField.label}
                name={formField.name}
              />
            </Grid>
          ))}
        </Grid>
        <Button variant="contained" type="submit" disabled={isLoading}>
          Δημιουργία Λογαριασμού
        </Button>
      </form>
    </Box>
  );
};
