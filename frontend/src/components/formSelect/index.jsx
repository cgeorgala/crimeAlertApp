import { Controller } from 'react-hook-form';
import { FormControl, FormLabel, Select, MenuItem, FormHelperText } from '@mui/material';

export const FormSelect = ({ rules, label, control, name, options = [] }) => {
  
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormControl margin="normal" fullWidth error={!!fieldState.error}>
          <FormLabel>{label}</FormLabel>
          <Select {...field} labelId="country-label" label="Country">
            {options.map((o, i) => (
              <MenuItem value={o.value} key={i}>
                {o.label}
              </MenuItem>
            ))}
          </Select>
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
