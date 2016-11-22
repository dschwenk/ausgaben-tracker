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
   Navigator,
   TouchableHighlight,
   Image
 } from 'react-native';﻿


class Settings extends Component {

  onButtonHomePress(){
    this.props.navigator.push({
      id: 'Start'
    });
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.headerText}>
          Einstellungen
        </Text>
          <TouchableHighlight onPress={this.onButtonHomePress.bind(this)} style={styles.headerButton}>
            <Image
              style={styles.homeButton}
              source={require('./home.png')}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.content}>
        <Text style={styles.smallText}>
          Content Start Text
        </Text>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dddfd4'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#808080',
    alignSelf: 'stretch'
  },
  content: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8ff',
    alignSelf: 'stretch'
  },
  headerText: {
    flex: 4,
    fontSize: 22,
    textAlign: 'left',
    paddingLeft: 15,
    color: 'white'
  },
  headerButton: {
    flex: 1,
    paddingLeft: 25
  },
  largeText: {
    flex: 1,
    fontSize: 52,
    paddingTop: 40,
    paddingRight: 20,
    paddingLeft: 20,
    color: '#173e43'
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'yellow'
  },
  buttonText: {
    color: '#fae596'
  }
})

module.exports = Settings;
