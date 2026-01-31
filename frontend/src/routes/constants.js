import { HomePage } from '../pages/home';
import { UserRegisterPage } from '../pages/userRegister';
import { IncidentCreatePage } from '../pages/incidentCreate';
import { IncidentsListPage } from '../pages/incidentsList';
import { UserProfilePage } from '../pages/userProfile';
import {ContactUsPage} from '../pages/contactUs';
import { TermsPage } from '../pages/terms';
import { AboutUsPage } from '../pages/aboutUs';
import { PrivacyPage } from '../pages/privacy';
import { IncidentsFilterListPage } from '../pages/incidentsFilterList';
import { IncidentsAllFilterListPage } from '../pages/incidentsAllFilterList';

export const ROUTES_MAP = {
  login: {
    path: '/',
    title: 'Είσοδος',
    requireAuth: false,
    requireGuest: true,
    component: HomePage,
  },
  register: {
    path: '/register',
    title: 'Εγγραφή',
    requireAuth: false,
    requireGuest: true,
    component: UserRegisterPage,
  },
  incidentsList: {
    path: '/incidentsList',
    title: 'Τα Συμβάντα μου',
    requireAuth: true,
    requireGuest: false,
    component: IncidentsListPage,
  },
  incidentCreate: {
    path: '/incidentCreate',
    title: 'Δημιουργία Συμβάντος',
    requireAuth: true,
    requireGuest: false,
    component: IncidentCreatePage,
  },
  incidentsFilterList: {
    path: '/incidentsFilterList',
    title: 'Αναζήτηση Συμβάντων',
    requireAuth: true,
    requireGuest: false,
    component: IncidentsFilterListPage,
  },
  incidentsAllFilterList: {
    path: '/incidentsAllFilterList',
    title: 'Προβολή όλων των συμβάντων',
    requireAuth: true,
    requireGuest: false,
    component: IncidentsAllFilterListPage,
  },
  userProfile: {
    path: '/userProfile',
    title: 'Επεξεργασία στοιχείων',
    requireAuth: true,
    requireGuest: false,
    component: UserProfilePage,
  },
  contactUs: {
    title: 'Επικοινωνία',
    path: '/contact-us',
    requireAuth: false,
    requireGuest: false,
    component: ContactUsPage,
  },
  aboutUs: {
    title: 'Ποιοι είμαστε',
    path: '/about-us',
    requireAuth: false,
    requireGuest: false,
    component: AboutUsPage,
  },
  terms: {
    title: 'Όροι Χρήσης',
    path: '/terms-of-service',
    requireAuth: false,
    requireGuest: false,
    component: TermsPage,
  },
  privacyPolicy: {
    title: 'Πολιτική Απορρήτου',
    path: '/privacy-policy',
    requireAuth: false,
    requireGuest: false,
    component: PrivacyPage,
  },
};

export const ROUTE_LIST = Object.values(ROUTES_MAP);

export const getRoutesByAuthStatus = () => {
  let authRoutes = [];
  let guestRoutes = [];
  let publicRoutes = [];

  Object.values(ROUTES_MAP).forEach(route => {
    if (route.requireAuth) {
      authRoutes = [...authRoutes, route];
    } else if (route.requireGuest) {
      guestRoutes = [...guestRoutes, route];
    } else {
      publicRoutes =  [...publicRoutes, route];
    }
  });

  return {authRoutes, guestRoutes, publicRoutes};
};