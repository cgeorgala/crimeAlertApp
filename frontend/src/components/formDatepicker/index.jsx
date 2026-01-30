import { Controller } from 'react-hook-form';
import { FormControl, FormLabel, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';

export const FormDatepicker = ({
  rules,
  label,
  control,
  name,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <FormControl margin="normal" fullWidth>
          <FormLabel>{label}</FormLabel>
          <DateTimePicker
            {...field}
            renderInput={params => (
              <TextField
                {...params}
                // error={!!errors.appointment}
                // helperText={errors.appointment?.message}
              />
            )}
          />
        </FormControl>
      )}
    />
  );
};
