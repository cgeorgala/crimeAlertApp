import { Controller } from 'react-hook-form';
import { FormControl, FormLabel, TextField, FormHelperText } from '@mui/material';

export const FormInput = ({ rules, label, control, name, multiline, rows, type, textFieldProps={}}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormControl margin="normal" fullWidth error={!!fieldState.error}>
          <FormLabel>{label}</FormLabel>
          <TextField
            {...field}
            type={type || 'text'} 
            multiline={multiline || false}
            rows={rows || 1}
            error={!!fieldState.error}
            {...textFieldProps}
          />
          {fieldState.error && (
            <FormHelperText>
              {fieldState.error.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};
