export const ADD_INCIDENT_FIELD_NAMES = {
  TITLE: 'title',
  INCIDENT_TYPE: 'incident_type',
  INCIDENT_DATE: 'incident_date',
  SEVERITY: 'severity',
  ADDRESS: 'address',
  LATITUDE: 'latitude',
  LONGITUDE: 'longitude',
  VERIFY_STATUS: 'verify_status',
  DESCRIPTION: 'description',
};

export const ADD_INCIDENT_FIELD_LABELS = {
  TITLE: 'Συμβάν',
  INCIDENT_TYPE: 'Κατηγορία',
  INCIDENT_DATE: 'Ημερομηνία',
  SEVERITY: 'Σοβαρότητα',
  ADDRESS: 'address',
  LATITUDE: 'latitude',
  LONGITUDE: 'longitude',
  VERIFY_STATUS: 'verify_status',
  DESCRIPTION: 'Περιγραφή',
};

export const INCIDENT_TYPE_OPTIONS = [
  {
    label: 'Ληστεία',
    value: 'Robbery',
  },
  {
    label: 'Διάρρηξη',
    value: 'Burglary',
  },
  {
    label: 'Βανδαλισμός',
    value: 'Vandalism',
  },
  {
    label: 'Κλοπή οχήματος',
    value: 'Vehicle Theft',
  },
  {
    label: 'Ανθρωποκτονία',
    value: 'Murder',
  },
  {
    label: 'Επίθεση',
    value: 'Assault',
  },
  {
    label: 'Άλλο',
    value: 'Other',
  },
];

export const SEVERITY_TYPE_OPTIONS = [
  {
    label: 'Κρίσιμο',
    value: 'Critical',
  },
  {
    label: 'Σημαντικό',
    value: 'Major',
  },
  {
    label: 'Δευτερεύον',
    value: 'Minor',
  },
  {
    label: 'Μη εφαρμόσιμο',
    value: 'Not Applicable',
  },
];