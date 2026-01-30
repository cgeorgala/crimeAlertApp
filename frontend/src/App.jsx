import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './layout';
import './App.css';
import { RequireGuest } from './routes/requireGuest';
import { RequireAuth } from './routes/requireAuth';
import { getRoutesByAuthStatus } from './routes/constants';

export const App = () => {
  const { authRoutes, guestRoutes, publicRoutes } = getRoutesByAuthStatus();
  
  return (
    <AppLayout>
      <Routes>
        <Route element={<RequireGuest />}>
          {guestRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Route>
        <Route element={<RequireAuth />}>
          {authRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
          {publicRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
          
        </Route>
      </Routes>
    </AppLayout>
  );
};
