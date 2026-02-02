import { useForm } from 'react-hook-form';
import { FormInput } from '../../components/formInput';
import { Typography, Button, Grid } from '@mui/material';

import { CONTACT_US_FORM_FIELDS, CONTACT_US_FIELD_NAMES, CONTACT_US_TEXT } from './constants';
import { useSubmitContactFormMutation } from '../../store/api';
import { showToast } from '../../store/toaster';
import { useDispatch } from 'react-redux';


export const ContactUsPage = () => {

  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm({
    mode: 'onBlur',
    defaultValues: {
      [CONTACT_US_FIELD_NAMES.NAME]: '',
      [CONTACT_US_FIELD_NAMES.SURNAME]: '',
      [CONTACT_US_FIELD_NAMES.EMAIL]: '',
      [CONTACT_US_FIELD_NAMES.PHONE]: '',
      [CONTACT_US_FIELD_NAMES.SUBJECT]: '',
      [CONTACT_US_FIELD_NAMES.MESSAGE]: '',
    },
  });
  const [submitContactForm, { isLoading }] = useSubmitContactFormMutation();

  const onSubmit = async (data) => {
    try{
      console.log('Form data:', data);

      const result = await submitContactForm(data).unwrap();
      dispatch(showToast({
        message: result?.message || 'Το μήνυμα στάλθηκε επιτυχώς',
        severity: 'success',
      }));
    }
    catch(err){
      console.error('Contact form error:', err);
      dispatch(showToast({
        message: err?.data?.message || 'Σφάλμα κατά την αποστολή του μηνύματος',
        severity: 'error',
      }));
    }
  };

  return (
    <Grid container spacing={1} maxWidth="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
            
          {CONTACT_US_FORM_FIELDS
          .filter(f => f.name !== CONTACT_US_FIELD_NAMES.MESSAGE)
          .map(formField => (
            <Grid size={{ md: 6 }} key={formField.name}>
              <FormInput
                control={control}
                label={formField.label}
                name={formField.name}
                rules={{required: `${formField.label} Υποχρεωτικό`}}
              />
            </Grid>
          ))}
          <Grid size={{ md: 12 }}>
            <FormInput
              control={control}
              label="Μήνυμα"
              name={CONTACT_US_FIELD_NAMES.MESSAGE}
              multiline
              rows={6}
              rules={{required: `Μήνυμα Υποχρεωτικό`}}
            />
          </Grid>
           
        </Grid>
        <Button variant="contained" type="submit" sx={{mt: 2}}>
          {CONTACT_US_TEXT.SUBMIT_BUTTON_LABEL}
        </Button>
      </form>
      <Typography sx={{mt: 2}}>{CONTACT_US_TEXT.ALTERNATIVE_CONTACT_TEXT}</Typography>
    </Grid>
  );
};
