import { useGetMyIncidentsQuery } from '../../store/api';
import { IncidentsList } from '../../components/incidentsList';

export const IncidentsListPage = () => {
  const { data } = useGetMyIncidentsQuery({ refetchOnMountOrArgChange: true });

  return <IncidentsList incidents={data?.incidents} />;
};
