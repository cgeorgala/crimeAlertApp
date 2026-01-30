import { Controller } from 'react-hook-form';
import { FormControl, FormLabel, Select, MenuItem } from '@mui/material';

export const FormSelect = ({ rules, label, control, name, options = [] }) => {
  
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <FormControl margin="normal" fullWidth>
          <FormLabel>{label}</FormLabel>
          <Select {...field} labelId="country-label" label="Country">
            {options.map((o, i) => (
              <MenuItem value={o.value} kei={i}>
                {o.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};
