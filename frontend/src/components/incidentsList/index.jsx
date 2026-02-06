import { useRef } from 'react';
import { Typography, Grid } from '@mui/material';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getIncidentTypeLabel } from './constants';

export const IncidentsList = ({ incidents }) => {

  const markerRefs = useRef({});
  // known issue with leaflet marker icons not showing properly without this fix
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
            'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });

  const createSvgIcon = (color, scale=0.7) =>
  L.divIcon({
    className: '',
    html: `
      <svg width="30" height="42" viewBox="0 0 30 42">
        <path
          d="M15 0C7 0 0 7 0 15c0 11 15 27 15 27s15-16 15-27C30 7 23 0 15 0z"
          fill="${color}"
        />
        <circle cx="15" cy="15" r="6" fill="white"/>
      </svg>
    `,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -36],
  });

  const severityIconMap = {
  Critical: createSvgIcon('#d32f2f'), // red
  Major: createSvgIcon('#f57c00'),    // orange
  Minor: createSvgIcon('#388e3c'),    // green
  'Not Applicable': createSvgIcon('#757575'), // gray
};

  const handleListClick = id => {
    const marker = markerRefs.current[id];
    marker?.openPopup();
  };
    
  if (!incidents) {return null;}

  return (
    <Grid container>
      <Grid
        size={{ xs: 12, md: 3 }}
        sx={{
          maxHeight: '400px',
          overflowY: 'auto',
          backgroundColor: 'white',
        }}
      >
        <ol style={{ paddingLeft: '0' }}>
          {incidents?.map?.((incident, i) => (
            <ListItem key={i} component="div" disablePadding>
              <ListItemButton onClick={() => handleListClick(incident?.id)}>
                <ListItemText
                  primary={`
                  ${new Date(incident.incident_date).toLocaleString('el-GR')}
                  ${getIncidentTypeLabel(incident.incident_type)}
                  `}
                  slotProps={{
                    primary: {
                      sx: { fontSize: '0.85rem'},
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </ol>
      </Grid>
      <Grid size={{ xs: 12, md: 9 }}>
        <MapContainer
          center={[37.9838, 23.7275]}
          zoom={13}
          style={{ height: '400px', width: '100%' }}
        >
          {incidents?.map?.(marker => (
            <Marker
              key={marker.id}
              position={{
                lat: marker.latitude,
                lng: marker.longitude,
              }}
              ref={ref => {
                markerRefs.current[marker.id] = ref;
              }}
              icon={severityIconMap[marker.severity]}
            >
              <Popup>
                <Typography variant="subtitle2">
                                    Συμβάν: {marker.title}
                </Typography>
                <Typography variant="caption" display={'block'}>
                                    Κατηγορία: {getIncidentTypeLabel(marker.incident_type)}
                </Typography>
                <Typography variant="caption" display={'block'}>
                                    Ημερομηνία:{' '}
                  {new Date(marker.incident_date).toLocaleString('el-GR')}
                </Typography>
                <Typography variant="caption" display={'block'}>
                                    Περιγραφή: {marker.description}
                </Typography>
              </Popup>
            </Marker>
          ))}
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </Grid>
    </Grid>
  );
};
