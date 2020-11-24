import React, {useState}  from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image, PermissionsAndroid, TextInput
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import Heartbeat from './Heartbeat';
import heart from './heart.png';
// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';
import Geolocation2 from '@react-native-community/geolocation';
import Geolocation3 from 'react-native-location';

import { setHeartBeat, store } from './store';
import NetInfo from "@react-native-community/netinfo";


import DeviceInfo from 'react-native-device-info';
import { AppRegistry } from 'react-native';
const tempArray = [];
const location = ['1'];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  view: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  view2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'gray',
    padding: 10,
    margin: 10,
    width:120
  },
  text: {
    fontSize: 20,
    color: 'white',

    textAlign:'center'
  },
});


const MyHeadlessTask = async () => {
  console.log('Receiving HeartBeat22');
  // let uniqueId = DeviceInfo.getUniqueId();
  // DeviceInfo.getMacAddress().then(mac => {
  //  console.log('mac :');
  //  console.log(store);

  //  store.dispatch(setHeartBeat(mac));



   console.log('uniq');
   console.log(DeviceInfo.getUniqueId());
   console.log(store.getState().App.heartBeat);

  //  const status =  Geolocation.requestAuthorization('whenInUse');

  // this.setState({ updatesEnabled: true }, () => {
    this.watchId = Geolocation.watchPosition(
      (position) => {


  AsyncStorage.getItem('any_key_here').then(
    (value) =>
     {
      //  if(value)
      //  {
      //   setTextInputValue(value);
      //   setGetValue(true);
      //  }
    
           
        Geolocation2.getCurrentPosition(info => 
          {
            console.log('position1 :');
            console.log(info);
     


        Geolocation3.configure({ distanceFilter: 0 });
        Geolocation3.getLatestLocation({ timeout: 60000 })
.then(latestLocation => {
  console.log("position3 : ");
  console.log(latestLocation);





  NetInfo.fetch().then(state => {
    console.log("position2 : ");
    console.log(position);

        tempArray.push({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,

          latitude_2: info.coords.latitude,
          longitude_2: info.coords.longitude,

          latitude_3: latestLocation.latitude,
          longitude_3: latestLocation.longitude,
          device_id: value,
          recorded_at: position.timestamp,
          speed: position.coords.speed,
          accuracy: position.coords.accuracy,
          heading: position.coords.heading,
          is_wifi : state.type === 'wifi' ? 1 : 0,
          srctime_at : Date.now()
        });



        // console.log('tempArray 2 ');
        // console.log(tempArray);


        fetch(`https://api.dev-tako.shipsfocus.com/device_positions`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tempArray)
        })
          .then((response) => response.json())
          .then((responseJson) => {
           
            tempArray.length = 0;
          
          })
          .catch((error) => {
            console.log(error);
          });

        });
      })
      });

        // 

     }
     );
          
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 30000,
        fastestInterval: 12000,
        forceRequestLocation: true,
        showLocationDialog: true,
        useSignificantChanges: true,
      },
    );


};



const App = ({ heartBeat }) => {

  const [value, onChangeText] = useState('');

  // getValueFunction();


   // To get the value from the TextInput
   const [textInputValue, setTextInputValue] = useState('');
   // To set the value on Text
   const [getValue, setGetValue] = useState(false);
 

   AsyncStorage.getItem('any_key_here').then(
    (value) =>
     {
       if(value)
       {
        setTextInputValue(value);
        setGetValue(true);
       }
    
     }
  );

   const saveValueFunction = () => {
     // Function to save the value in AsyncStorage


     if (textInputValue) {
       // To check the input not empty

       Heartbeat.startService();
       setGetValue(true);
       AsyncStorage.setItem('any_key_here', textInputValue);
     }
   };


   const changeValueFunction = () => {
    // Function to save the value in AsyncStorage

    AsyncStorage.setItem('any_key_here', '');
    setGetValue(false);
  };
 
  //  const getValueFunction = () => {

  //   alert('in getValueFunction');
  //    // Function to get the value from AsyncStorage
  //    AsyncStorage.getItem('any_key_here').then(
  //      (value) =>
  //        // AsyncStorage returns a promise
  //        // Adding a callback to get the value
  //        setTextInputValue(value),
  //      // Setting the value in Text
  //    );
  //  };

   


  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );


  test();
  const imageSize = 300;
 

  return (
    <View style={styles.container}>
      {/* <View style={styles.view}>
        <Image source={require('./assets/images/main.png')} style={{ width: imageSize, height: imageSize }} resizeMode="contain" />
      </View> */}
      <View style={styles.view2}>
      <Image source={require('./assets/images/main.png')} style={{ width: imageSize, height: imageSize, marginBottom:50 }} resizeMode="contain" />
      <Text style={{ marginLeft: 15, marginRight: 15, fontSize: 28, fontWeight: 'bold' }}>{'WeTrack by ShipsFocus'}</Text>
        {/* <Text style={{ marginTop: 10, marginLeft: 30, marginRight: 15,marginBottom:15, fontSize: 17, color: 'gray' }}>{'Keep app open, and let it run in the background until the end of the outbreak'}</Text> */}
        {getValue === false &&  <Text style={{ marginTop: 15, marginLeft: 25, marginRight: 15,marginBottom:20, fontSize: 15, color: 'black' }}>{'Please Input boat number and Press Start Button'}</Text>}
        {getValue !== false &&  <Text style={{ marginTop: 15, marginLeft: 25, marginRight: 15,marginBottom:20, fontSize: 15, color: 'black' }}>{'Your Boat Number: ' + textInputValue}</Text>}

        {getValue === false &&     <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom:10 }}
      keyboardType={'numeric'}
      value={textInputValue}
      onChangeText={(data) => setTextInputValue(data)}
      placeholder={'       Boat Number       '}
    />}

     
        
       
        {getValue === false &&  <TouchableOpacity style={styles.button}    onPress={saveValueFunction}>
          <Text style={styles.text}>Start</Text>
        </TouchableOpacity>}

        {getValue === true &&  <TouchableOpacity style={styles.button}    onPress={changeValueFunction}>
          <Text style={styles.text}>Change</Text>
        </TouchableOpacity>}
      </View>
    </View>
  );
};

function timeout(milliseconds, promise) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("timeout exceeded"))
    }, milliseconds)
    promise.then(resolve, reject)
  })
}


function test()
{


//   Geolocation.watchPosition(info => 
//     {
//       console.log('test');
//       console.log(info);
// })

  // console.log('test');
  // Heartbeat.startService();
  
  
  
}

const mapStateToProps = store => ({
  heartBeat: store.App.heartBeat,
});


AppRegistry.registerHeadlessTask('Heartbeat', () => MyHeadlessTask);
export default connect(mapStateToProps)(App);
