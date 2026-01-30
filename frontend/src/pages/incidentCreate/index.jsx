import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Grid } from '@mui/material';
import { FormInput } from '../../components/formInput';
import {
  ADD_INCIDENT_FIELD_NAMES,
  ADD_INCIDENT_FIELD_LABELS,
  INCIDENT_TYPE_OPTIONS,
  SEVERITY_TYPE_OPTIONS,
} from './constants';
import { FormDatepicker } from '../../components/formDatepicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { FormSelect } from '../../components/formSelect';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useMapEvents } from 'react-leaflet';
import { useCreateIncidentMutation } from '../../store/api';

export const IncidentCreatePage = () => {
  const [createIncident, { isLoading }] = useCreateIncidentMutation();

  const { control, handleSubmit } = useForm({
    mode: 'onBlur',
    defaultValues: {
      [ADD_INCIDENT_FIELD_NAMES.TITLE]: '',
      [ADD_INCIDENT_FIELD_NAMES.INCIDENT_TYPE]: '',
      [ADD_INCIDENT_FIELD_NAMES.INCIDENT_DATE]: dayjs(),
      [ADD_INCIDENT_FIELD_NAMES.DESCRIPTION]: '',
    },
  });

  const onSubmit = data => {
    createIncident({
      ...data,
      [ADD_INCIDENT_FIELD_NAMES.INCIDENT_DATE]:
      data[[ADD_INCIDENT_FIELD_NAMES.INCIDENT_DATE]].toISOString(),
      [ADD_INCIDENT_FIELD_NAMES.LATITUDE]: markerPosition.lat,
      [ADD_INCIDENT_FIELD_NAMES.LONGITUDE]: markerPosition.lng,
    });
  };

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });

  function ClickMarker({ onSelect }) {
    useMapEvents({
      click(e) {
        onSelect(e.latlng);
      },
    });
    return null;
  }
  const [markerPosition, setMarkerPosition] = useState(null);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <Grid container spacing={1}>
              <Grid size={{ md: 6 }}>
                <FormInput
                  control={control}
                  label={ADD_INCIDENT_FIELD_LABELS.TITLE}
                  name={ADD_INCIDENT_FIELD_NAMES.TITLE}
                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <FormDatepicker
                  control={control}
                  label={ADD_INCIDENT_FIELD_LABELS.INCIDENT_DATE}
                  name={ADD_INCIDENT_FIELD_NAMES.INCIDENT_DATE}
                />
              </Grid>

              <Grid size={{ md: 6 }}>
                <FormSelect
                  control={control}
                  label={ADD_INCIDENT_FIELD_LABELS.INCIDENT_TYPE}
                  name={ADD_INCIDENT_FIELD_NAMES.INCIDENT_TYPE}
                  options={INCIDENT_TYPE_OPTIONS}
                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <FormSelect
                  control={control}
                  label={ADD_INCIDENT_FIELD_LABELS.SEVERITY}
                  name={ADD_INCIDENT_FIELD_NAMES.SEVERITY}
                  options={SEVERITY_TYPE_OPTIONS}
                />
              </Grid>
              <Grid size={{ md: 12 }}>
                <FormInput
                  control={control}
                  textFieldProps={{ rows: 3 }}
                  label={ADD_INCIDENT_FIELD_LABELS.DESCRIPTION}
                  name={ADD_INCIDENT_FIELD_NAMES.DESCRIPTION}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid size={6}>
            <MapContainer
              center={[37.9838, 23.7275]}
              zoom={13}
              style={{ height: '400px', width: '100%' }}
            >
              <ClickMarker onSelect={setMarkerPosition} />

              {markerPosition && (
                <Marker position={markerPosition}>
                  <Popup>
                    Lat: {markerPosition.lat.toFixed(5)}, Lng:{' '}
                    {markerPosition.lng.toFixed(5)}
                  </Popup>
                </Marker>
              )}
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </MapContainer>
            <Button
              type="submit"
              disabled={isLoading}
              variant="contained"
              sx={{ m: '1rem 0rem 1rem 1rem', float: 'right' }}
            >
              Καταχωρηση
            </Button>
            {/* <Button variant="contained" >Ακύρωση</Button> */}
          </Grid>
        </Grid>
      </LocalizationProvider>
    </form>
  );
};
