import { useLazyLogoutUserQuery, useDeleteUserMutation } from '../../store/api';
import { getRoutesByAuthStatus } from '../../routes/constants';
import { useSelector } from 'react-redux';

export const useGetMenuItems = () => {

  const [logoutUser] = useLazyLogoutUserQuery();
  const [deleteUser] = useDeleteUserMutation();

  const user = useSelector(state => state.auth.user);
  const { authRoutes } = getRoutesByAuthStatus();

  return [
    ...authRoutes
    .filter(route => {
      if (!route.roles) return true;
      return route.roles.includes(user?.role);
    })
    .map(route => ({
      label: route.title,
      route: route.path,
      onClick: null,
    })),
    {
      label: 'Διαγραφή προφίλ',
      route: null,
      onClick: null,
    },
    {
      label: 'Έξοδος',
      route: null,
      onClick: logoutUser,
    },
  ];
};








