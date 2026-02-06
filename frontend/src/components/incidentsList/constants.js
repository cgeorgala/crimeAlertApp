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

export const getIncidentTypeLabel = (value) => {
    const option = INCIDENT_TYPE_OPTIONS.find(opt => opt.value === value);
    return option ? option.label : value;
}