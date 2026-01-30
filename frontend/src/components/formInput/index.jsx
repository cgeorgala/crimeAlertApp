import { Controller } from 'react-hook-form';
import { FormControl, FormLabel, TextField } from '@mui/material';

export const FormInput = ({ rules, label, control, name }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <FormControl margin="normal" fullWidth>
          <FormLabel>{label}</FormLabel>
          <TextField {...field} rows={5} />
        </FormControl>
      )}
    />
  );
};
