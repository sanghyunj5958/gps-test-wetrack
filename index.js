import { AppRegistry } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import { setHeartBeat, store } from './store';
import DeviceInfo from 'react-native-device-info';
import * as Sentry from '@sentry/react-native';
import Geolocation from '@react-native-community/geolocation';


Sentry.init({
  dsn: 'https://97a96413a4f94d45b198860fc8063041@o448600.ingest.sentry.io/5430196',
  enableAutoSessionTracking: true,
});

const MyHeadlessTask = async () => {
  console.log('Receiving HeartBeat!');

  
  DeviceInfo.getMacAddress().then(mac => {
  //  console.log('mac :');
  //  console.log(store);

   store.dispatch(setHeartBeat(mac));
   Geolocation.getCurrentPosition(info => 
    {
      // location.push('2');
      console.log(info);

      let tempArray = [];

      tempArray.push({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
        device_id: mac,
        recorded_at: info.timestamp,
        speed: info.coords.speed,
        accuracy: info.coords.accuracy,
        heading: info.coords.heading
      });


      fetch(`https://api.dev-tako.shipsfocus.com/device_positions`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tempArray)
      })
        .then((response) => response.json())
        .then((responseJson) => {console.log(responseJson)})
        .catch((error) => {
          console.log(error);
        });


    })

  });


  // setTimeout(() => {
  //   store.dispatch(setHeartBeat(false));
  // }, 1000);


  // {"coords": {"accuracy": 20, "altitude": 0, "heading": 0, "latitude": 37.421998333333335, "longitude": -122.08400000000002, "speed": 0}, "mocked": false, "timestamp": 1603261072000}
};



const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);


AppRegistry.registerHeadlessTask('Heartbeat', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => RNRedux);
