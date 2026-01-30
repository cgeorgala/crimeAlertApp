import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { CircularProgress } from '@mui/material';

import { PersistGate } from 'redux-persist/integration/react';
import { App } from './App';
import { store, persistor } from './store';
import './index.css';
import { GlobalToast } from './components/toaster';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <StrictMode>
      <Provider store={store}>
        <GlobalToast />
        <BrowserRouter>
          <PersistGate
            loading={<CircularProgress color="secondary" />}
            persistor={persistor}
          >
            <App />
          </PersistGate>
        </BrowserRouter>
      </Provider>
    </StrictMode>,
  );
} else {
  throw new Error(
    'Root element with ID \'root\' was not found in the document. Ensure there is a corresponding HTML element with the ID \'root\' in your HTML file.',
  );
}
