import { useEffect } from 'react';

import { FILTER_INCIDENT_FIELD_NAMES, DEFAULT_COORDINATES } from './constants';
import { IncidentsList } from '../../components/incidentsList';
import { useLazyGetAllIncidentsQuery } from '../../store/api';
import { IncidentsFilterForm } from '../../components/incidentFilterForm';

export const IncidentsAllFilterListPage = () => {
  const [getAllData, { data }] = useLazyGetAllIncidentsQuery();

  useEffect(() => {
    getAllData(DEFAULT_COORDINATES);
  }, [getAllData]);

  const onSubmit = data => {
    getAllData({
      ...data,
      [FILTER_INCIDENT_FIELD_NAMES.TO]:
        data[FILTER_INCIDENT_FIELD_NAMES.TO].toISOString(),
      [FILTER_INCIDENT_FIELD_NAMES.FROM]:
        data[FILTER_INCIDENT_FIELD_NAMES.FROM].toISOString(),
    });
  };

  if (!data) {return null;}
  

  return (
    <>
      <IncidentsFilterForm onSubmit={onSubmit} />
      <IncidentsList incidents={data.incidents} />
    </>
  );
};
