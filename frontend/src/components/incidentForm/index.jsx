import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Grid, Typography } from '@mui/material';
import { FormInput } from '../formInput';
import {
  ADD_INCIDENT_FIELD_NAMES,
  ADD_INCIDENT_FIELD_LABELS,
  INCIDENT_TYPE_OPTIONS,
  SEVERITY_TYPE_OPTIONS,
} from './constants';
import { FormDatepicker } from '../formDatepicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { FormSelect } from '../formSelect';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useCreateIncidentMutation, useModifyIncidentMutation } from '../../store/api';

export const IncidentForm = ({mode = 'create', initialValues, onSuccess}) => {
  const [createIncident, { isLoading: isCreating }] = useCreateIncidentMutation();
  const [modifyIncident, { isLoading: isModifying }] = useModifyIncidentMutation();

  const isEdit = mode === 'edit';

  const { control, handleSubmit, reset } = useForm({
    mode: 'onBlur',
    defaultValues: {
      [ADD_INCIDENT_FIELD_NAMES.TITLE]: '',
      [ADD_INCIDENT_FIELD_NAMES.INCIDENT_TYPE]: '',
      [ADD_INCIDENT_FIELD_NAMES.SEVERITY]: '',
      [ADD_INCIDENT_FIELD_NAMES.INCIDENT_DATE]: dayjs(),
      [ADD_INCIDENT_FIELD_NAMES.DESCRIPTION]: '',
    },
  });

  const [markerPosition, setMarkerPosition] = useState(null);

  useEffect(() => {
    if (isEdit && initialValues) {
        reset({
          [ADD_INCIDENT_FIELD_NAMES.TITLE]: initialValues.title,
          [ADD_INCIDENT_FIELD_NAMES.INCIDENT_TYPE]: initialValues.incident_type,
          [ADD_INCIDENT_FIELD_NAMES.SEVERITY]: initialValues.severity,
          [ADD_INCIDENT_FIELD_NAMES.INCIDENT_DATE]: dayjs(initialValues.incident_date),
          [ADD_INCIDENT_FIELD_NAMES.DESCRIPTION]: initialValues.description,
        });

        setMarkerPosition({
          lat: initialValues.latitude,
          lng: initialValues.longitude,
        });
    }
  }, [isEdit, initialValues, reset]);

  const onSubmit = async (data) => {
    if (!markerPosition)
    {
        alert('Πρέπει να επιλέξετε θέση στο χάρτη'); //TODO: remove alert, add toaster
        return;
    }

    const payload = {
      ...data,
      [ADD_INCIDENT_FIELD_NAMES.INCIDENT_DATE]:
      data[[ADD_INCIDENT_FIELD_NAMES.INCIDENT_DATE]].toISOString(),
      [ADD_INCIDENT_FIELD_NAMES.LATITUDE]: markerPosition.lat,
      [ADD_INCIDENT_FIELD_NAMES.LONGITUDE]: markerPosition.lng,
    };

    try{
      if (isEdit){
          await modifyIncident({
              id:initialValues.id,
              ...payload,
          }).unwrap();
      }else {
          await createIncident(payload).unwrap();
      }
    }catch (error){
        console.error('Incident submit failed', error);
        alert('Η αποθήκευση απέτυχε. Προσπαθήστε ξανά.'); //TODO: remove alert, add toaster
    }
    onSuccess?.();
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
                  rules={{ required: 'Τίτλος συμβάντος υποχρεωτικός' }}
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
                  rules={{ required: 'Τύπος συμβάντος υποχρεωτικός' }}
                />
              </Grid>
              <Grid size={{ md: 6 }}>
                <FormSelect
                  control={control}
                  label={ADD_INCIDENT_FIELD_LABELS.SEVERITY}
                  name={ADD_INCIDENT_FIELD_NAMES.SEVERITY}
                  options={SEVERITY_TYPE_OPTIONS}
                  rules={{ required: 'Βαθμός σοβαρότητας υποχρεωτικός' }}
                />
              </Grid>
              <Grid size={{ md: 12 }}>
                <FormInput
                  control={control}
                  textFieldProps={{ multiline: true, rows: 5, }}
                  label={ADD_INCIDENT_FIELD_LABELS.DESCRIPTION}
                  name={ADD_INCIDENT_FIELD_NAMES.DESCRIPTION}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid size={6}>
            <MapContainer
              center={
                markerPosition
                  ? [markerPosition.lat, markerPosition.lng]  
                  : [37.9838, 23.7275]
                }
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

            { !markerPosition && (
              <Typography color="error" sx={{ mt: 1 }}>
                Πρέπει να επιλέξετε θέση στο χάρτη
              </Typography>
            )}

            <Button
              type="submit"
              disabled={isCreating || isModifying}
              variant="contained"
              sx={{ m: '1rem 0rem 1rem 1rem', float: 'right' }}
            >
              {isEdit? 'Αποθήκευση αλλαγών' : 'Καταχωρηση'}
            </Button>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </form>
  );
};
