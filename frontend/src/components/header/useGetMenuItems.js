import { useLazyLogoutUserQuery, useDeleteUserMutation } from '../../store/api';
import { getRoutesByAuthStatus } from '../../routes/constants';

export const useGetMenuItems = () => {

  const [logoutUser] = useLazyLogoutUserQuery();
  const [deleteUser] = useDeleteUserMutation();

  const { authRoutes } = getRoutesByAuthStatus();

  return [
    ...authRoutes.map(route => ({
      label: route.title,
      route: route.path,
      onClick: null,
    })),
    {
      label: 'Διαγραφή προφίλ',
      route: null,
      onClick: deleteUser,
    },
    {
      label: 'Έξοδος',
      route: null,
      onClick: logoutUser,
    },
  ];
};








