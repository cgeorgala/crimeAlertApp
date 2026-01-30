import { useForm } from 'react-hook-form';
import { FormInput } from '../../components/formInput';
import { Typography, Button, Grid } from '@mui/material';

import { CONTACT_US_FORM_FIELDS, CONTACT_US_FIELD_NAMES, CONTACT_US_TEXT } from './constants';


export const ContactUsPage = () => {

  const { control, handleSubmit } = useForm({
    mode: 'onBlur',
    defaultValues: {
      [CONTACT_US_FIELD_NAMES.USERNAME]: '',
      [CONTACT_US_FIELD_NAMES.PASSWORD]: '',
    },
  });

  const onSubmit = () => {
  };

  return (
    <Grid container spacing={1} maxWidth="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
            
          {CONTACT_US_FORM_FIELDS.map(formField => (
            <Grid size={{ md: 6 }} key={formField.name}>
              <FormInput
                control={control}
                label={formField.label}
                name={formField.name}
              />
            </Grid>
          ))}
           
            

           
        </Grid>
        <Button variant="contained" type="submit">
          {CONTACT_US_TEXT.SUBMIT_BUTTON_LABEL}
        </Button>
      </form>
      <Typography>{CONTACT_US_TEXT.ALTERNATIVE_CONTACT_TEXT}</Typography>
    </Grid>
  );
};
