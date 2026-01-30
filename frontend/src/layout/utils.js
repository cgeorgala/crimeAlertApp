import { useLocation } from 'react-router-dom';
import { ROUTE_LIST } from '../routes/constants';


export const useGetPageTitle = () => {
  const {pathname} = useLocation();
  return ROUTE_LIST.find(route => route.path === pathname)?.title ?? '';
};