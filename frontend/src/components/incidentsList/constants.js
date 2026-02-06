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

export const VERIFY_STATUS_OPTIONS = [
  {
    label: 'Επίσημο',
    value: 'Verified-official',
  },
  {
    label: 'Ανεπίσημο',
    value: 'Verified-Unofficial',
  },
  {
    label: 'Μη Επιβεβαιωμένο',
    value: 'Unverified',
  },
];

export const getIncidentTypeLabel = (value) => {
    const option = INCIDENT_TYPE_OPTIONS.find(opt => opt.value === value);
    return option ? option.label : value;
}

export const getVerifyStatusLabel = (value) => {
    const option = VERIFY_STATUS_OPTIONS.find(opt => opt.value === value);
    return option ? option.label : value;
}
