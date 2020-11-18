import { AppRegistry } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import { setHeartBeat, store } from './store';
// import DeviceInfo from 'react-native-device-info';
import * as Sentry from '@sentry/react-native';
// import Geolocation from '@react-native-community/geolocation';


Sentry.init({
  dsn: 'https://97a96413a4f94d45b198860fc8063041@o448600.ingest.sentry.io/5430196',
  enableAutoSessionTracking: true,
});



const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
