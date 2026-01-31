import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const RequireGuest = () => {
  const token = useSelector(s => s.auth.token);

  return token ? <Navigate to="/incidentsList" replace /> : <Outlet />;
};
