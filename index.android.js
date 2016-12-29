/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

var Start = require('./app/Start');
var Add = require('./app/Add');
var History = require('./app/History');
var Settings = require('./app/Settings');

export default class Ausgaben extends Component {
  render(){
    return (
      <Navigator
        initialRoute = {{
          id: 'Start'
        }}
        renderScene={
          this.navigatorRenderScene
        }
      />
    );
  }

  navigatorRenderScene(route,navigator){
    _navigator = navigator;
    switch (route.id) {
      case 'Start':
          return(<Start navigator={navigator} title="Start"/>);
          break;
      case 'Add':
          return(<Add navigator={navigator} title="Add"/>);
          break;
      case 'History':
          return(<History navigator={navigator} title="History"/>);
          break;
      case 'Settings':
          return(<Settings navigator={navigator} title="Settings"/>);
          break;
      // more to come ...
      default:

    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Ausgaben', () => Ausgaben);
