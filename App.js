import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image,
} from 'react-native';
import { connect } from 'react-redux';
import Heartbeat from './Heartbeat';
import heart from './heart.png';
import Geolocation from '@react-native-community/geolocation';

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


const App = ({ heartBeat }) => {

  // test();
  const imageSize = 300;
 

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Image source={require('./assets/images/main.png')} style={{ width: imageSize, height: imageSize }} resizeMode="contain" />
      </View>
      <View style={styles.view}>
      <Text style={{ marginLeft: 15, marginRight: 15, fontSize: 28, fontWeight: 'bold' }}>{'WeTrack by ShipsFocus'}</Text>
        <Text style={{ marginTop: 10, marginLeft: 30, marginRight: 15,marginBottom:15, fontSize: 17, color: 'gray' }}>{'Keep app open, and let it run in the background until the end of the outbreak'}</Text>
        {heartBeat === '' &&  <Text style={{ marginTop: 15, marginLeft: 25, marginRight: 15,marginBottom:20, fontSize: 15, color: 'black' }}>{'Please Press Start Button'}</Text>}
        {heartBeat !== '' &&  <Text style={{ marginTop: 15, marginLeft: 25, marginRight: 15,marginBottom:20, fontSize: 15, color: 'black' }}>{'Your MAC Address: ' + heartBeat}</Text>}
        
       
        {heartBeat === '' &&  <TouchableOpacity style={styles.button} onPress={() => Heartbeat.startService()}>
          <Text style={styles.text}>Start</Text>
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

  // console.log('test');
  // Heartbeat.startService();
  
  
  
}

const mapStateToProps = store => ({
  heartBeat: store.App.heartBeat,
});

export default connect(mapStateToProps)(App);
