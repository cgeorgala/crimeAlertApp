import { useForm } from 'react-hook-form';

import { Grid, Button } from '@mui/material';

import {
  FILTER_INCIDENT_FIELD_NAMES,
  FILTER_INCIDENT_FIELD_LABELS,
  VERIFY_STATUS_OPTIONS,
  SEVERITY_TYPE_OPTIONS,
  DEFAULT_COORDINATES,
} from './constants';
import { FormDatepicker } from '../formDatepicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { FormSelect } from '../formSelect';

// import { useLazyGetMyIncidentsMapQuery } from "../../store/api"

export const IncidentsFilterForm = ({onSubmit}) => {
//   const [getMapData, ] = useLazyGetMyIncidentsMapQuery()

  const { control, handleSubmit } = useForm({
    mode: 'onBlur',
    defaultValues: {
      [FILTER_INCIDENT_FIELD_NAMES.FROM]: dayjs(),
      [FILTER_INCIDENT_FIELD_NAMES.TO]: dayjs(),
      [FILTER_INCIDENT_FIELD_NAMES.VERIFY_STATUS]: '',
      [FILTER_INCIDENT_FIELD_NAMES.SEVERITY]: '',
      ...DEFAULT_COORDINATES,
    },
  });

  //   useEffect(() => {
  //     getMapData(DEFAULT_COORDINATES)
  //   }, [])

  const onFormSubmit = data => {
    onSubmit(data);
    // getMapData({
    //   ...rest,
    //   [FILTER_INCIDENT_FIELD_NAMES.TO]:
    //     data[FILTER_INCIDENT_FIELD_NAMES.TO].toISOString(),
    //   [FILTER_INCIDENT_FIELD_NAMES.FROM]:
    //     data[FILTER_INCIDENT_FIELD_NAMES.FROM].toISOString(),
    // })
  };

  return (

    <form onSubmit={handleSubmit(onFormSubmit)}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={1}>
          <Grid size={{ md: 3 }}>
            <FormDatepicker
              control={control}
              label={FILTER_INCIDENT_FIELD_LABELS.FROM}
              name={FILTER_INCIDENT_FIELD_NAMES.FROM}
            />
          </Grid>
          <Grid size={{ md: 3 }}>
            <FormDatepicker
              control={control}
              label={FILTER_INCIDENT_FIELD_LABELS.TO}
              name={FILTER_INCIDENT_FIELD_NAMES.TO}
            />
          </Grid>

          <Grid size={{ md: 3 }}>
            <FormSelect
              control={control}
              label={FILTER_INCIDENT_FIELD_LABELS.VERIFY_STATUS}
              name={FILTER_INCIDENT_FIELD_NAMES.VERIFY_STATUS}
              options={VERIFY_STATUS_OPTIONS}
            />
          </Grid>
          <Grid size={{ md: 3 }}>
            <FormSelect
              control={control}
              label={FILTER_INCIDENT_FIELD_LABELS.SEVERITY}
              name={FILTER_INCIDENT_FIELD_NAMES.SEVERITY}
              options={SEVERITY_TYPE_OPTIONS}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>
      <Button variant="contained" type="submit">
          Filter
      </Button>
    </form>

  );
};
