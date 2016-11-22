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
   Image,
   ScrollView
 } from 'react-native';﻿


class Start extends Component {

  onButtonAddPress(){
    this.props.navigator.push({
      id: 'Add'
    });
  }

  onButtonHistoryPress(){
    this.props.navigator.push({
      id: 'History'
    });
  }

  onButtonSettingsPress(){
    this.props.navigator.push({
      id: 'Settings'
    });
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Übersicht
          </Text>
          <TouchableHighlight onPress={this.onButtonHistoryPress.bind(this)} style={styles.headerButton}>
            <Image
              style={styles.homeButton}
              source={require('./history.png')}
            />
          </TouchableHighlight>
          <TouchableHighlight onPress={this.onButtonAddPress.bind(this)} style={styles.headerButton}>
            <Image
              style={styles.homeButton}
              source={require('./add.png')}
            />
          </TouchableHighlight>
          <TouchableHighlight onPress={this.onButtonSettingsPress.bind(this)} style={styles.headerButton}>
            <Image
              style={styles.homeButton}
              source={require('./settings.png')}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.content}>
          <View style={styles.stats}>
            <Text style={styles.dateText}>
              November
            </Text>
            <Text style={styles.betragText}>
              796,23€
            </Text>
          </View>
          <View style={styles.liste}>
            <ScrollView>
              <Text style={styles.listenEintraege}>Miete 434,23€</Text>
              <Text style={styles.listenEintraege}>Auto 123,23€</Text>
              <Text style={styles.listenEintraege}>Essen 34,43€</Text>
              <Text style={styles.listenEintraege}>Liste</Text>
              <Text style={styles.listenEintraege}>Liste</Text>
              <Text style={styles.listenEintraege}>Liste</Text>
              <Text style={styles.listenEintraege}>Liste</Text>
              <Text style={styles.listenEintraege}>Liste</Text>
              <Text style={styles.listenEintraege}>Liste</Text>
              <Text style={styles.listenEintraege}>Liste</Text>
              <Text style={styles.listenEintraege}>Liste</Text>
              <Text style={styles.listenEintraege}>Liste</Text>
              <Text style={styles.listenEintraege}>Liste</Text>
              <Text style={styles.listenEintraege}>Liste</Text>
              <Text style={styles.listenEintraege}>Liste</Text>
            </ScrollView>
          </View>
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
    flex: 3,
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
    fontSize: 42,
    paddingTop: 40,
    paddingRight: 20,
    paddingLeft: 20,
    color: '#173e43'
  },
  betragText: {
    flex: 2,
    fontSize: 40,
    paddingBottom: 20,
    color: '#173e43'
  },
  smallText: {
    flex: 1,
    fontSize: 24,
    paddingTop: 10,
    paddingRight: 20,
    paddingLeft: 20,
    color: '#173e43'
  },
  dateText: {
    flex: 1,
    fontSize: 20,
    paddingTop: 25,
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
  },
  stats: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  liste: {
    flex: 7,
    paddingLeft: 30,
    alignSelf: 'stretch'
  },
  listenEintraege: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    fontSize: 24,
    paddingTop: 30,
    color: '#173e43'
  }
})

module.exports = Start;
