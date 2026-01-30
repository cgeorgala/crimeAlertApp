export const FILTER_INCIDENT_FIELD_NAMES = {
  FROM: 'from',
  TO: 'to',
  SEVERITY: 'severity',
  VERIFY_STATUS: 'verify_status',
};

export const FILTER_INCIDENT_FIELD_LABELS = {
  FROM: 'Ημερομηνία από',
  TO: 'Ημερομηνία μέχρι',
  SEVERITY: 'Σοβαρότητα',
  VERIFY_STATUS: 'Κατάσταση Επαλήθευσης',
};

export const VERIFY_STATUS_OPTIONS = [
  {
    label: 'Επίσημα-Επιβεβαιωμένο',
    value: 'Verified-official',
  },
  {
    label: 'Ανεπίσημα-Επιβεβαιωμένο',
    value: 'Verified-Unofficial',
  },
  {
    label: 'Μη Επιβεβαιωμένο',
    value: 'Unverified',
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

// Added so the map shows all incidents by default
export const DEFAULT_COORDINATES = {
  south: -90,
  west: -180,
  north: 90,
  east: 180,
};