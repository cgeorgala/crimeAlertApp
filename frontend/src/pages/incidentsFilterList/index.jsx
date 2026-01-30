import { useEffect } from 'react';

import { FILTER_INCIDENT_FIELD_NAMES, DEFAULT_COORDINATES } from './constants';
import { IncidentsList } from '../../components/incidentsList';
import { useLazyGetMyIncidentsMapQuery } from '../../store/api';
import { IncidentsFilterForm } from '../../components/incidentFilterForm';

export const IncidentsFilterListPage = () => {
  const [getMapData, { data }] = useLazyGetMyIncidentsMapQuery();

  useEffect(() => {
    getMapData(DEFAULT_COORDINATES);
  }, [getMapData]);

  const onSubmit = data => {
    getMapData({
      ...data,
      [FILTER_INCIDENT_FIELD_NAMES.TO]:
        data[FILTER_INCIDENT_FIELD_NAMES.TO].toISOString(),
      [FILTER_INCIDENT_FIELD_NAMES.FROM]:
        data[FILTER_INCIDENT_FIELD_NAMES.FROM].toISOString(),
    });
  };

  return (
    <>
      <IncidentsFilterForm onSubmit={onSubmit} />
      <IncidentsList incidents={data} />
    </>
  );
};
