import {Box, Grid, Button, FormControlLabel,Checkbox, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { REGISTER_FIELD_NAMES, FORM_FIELDS } from './constants';
import { useCreateUserMutation } from '../../store/api';
import { FormInput } from '../../components/formInput';

export const UserRegisterPage = () => {
  const [createUser, { isLoading }] = useCreateUserMutation();

  const { control, handleSubmit, formState: {errors} } = useForm({
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
      acceptTerms:false,
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
                rules={
                  formField.name === REGISTER_FIELD_NAMES.EMAIL
                  ?{
                    required: 'Email Υποχρεωτικό',
                    pattern:{
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Μη έγκυρη μορφή email',
                    },
                  }
                  :formField.name === REGISTER_FIELD_NAMES.PASSWORD
                  ?{
                      required: 'Κωδικός Υποχρεωτικός',
                      minLength: {
                        value: 6,
                        message: 'Ο κωδικός πρέπει να έχει τουλάχιστον 6 χαρακτήρες',
                      },
                      pattern: {/*
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                        message: 'Ο κωδικός πρέπει να περιέχει κεφαλαίο, μικρό γράμμα και αριθμό',
                      */},
                  }
                  :formField.name === REGISTER_FIELD_NAMES.ZIPCODE
                  ?{
                    required: 'Τ.Κ. Υποχρεωτικός',
                    pattern:{
                      value: /^[0-9]{5}$/,
                      message: 'Ο Τ.Κ. πρέπει να αποτελείται από 5 ψηφία',
                    },
                  }
                  :{
                    required: `Πεδίο ${formField.label} Υποχρεωτικό`
                  }}
              />
            </Grid>
          ))}

          {/* Added Terms & Conditions checkbox */}
          <Grid size={{ md: 12 }}> 
            <Controller
              name="acceptTerms"
              control={control}
              rules={{ required: 'Πρέπει να αποδεχτείτε τους Όρους Χρήσης' }} // mandatory
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label={
                    <Typography variant="body2">
                      Αποδέχομαι τους <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">Όρους Χρήσης</a>
                    </Typography>
                  }
                />
              )}
            />
            {errors.acceptTerms && ( // show error if not checked
              <Typography variant="caption" color="error">
                {errors.acceptTerms.message}
              </Typography>
            )}
          </Grid>
        </Grid>

        <Button variant="contained" type="submit" disabled={isLoading} sx = {{ mt:2 }}>
          Δημιουργία Λογαριασμού
        </Button>
      </form>
    </Box>
  );
};
