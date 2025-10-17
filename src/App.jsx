import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useTranslation } from 'react-i18next';

import store from './store/store';
import Router from './router/Router';
import { getCookie } from './utils/cookies';

import './utils/i18n';

function App() {
  const { i18n } = useTranslation();
  const LANG = getCookie('i18next') || 'en-US';

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
  }, [LANG]);

  return (
    <>
      <Provider store={store}>
        <Router />
      </Provider>
    </>
  );
}

export default App;
