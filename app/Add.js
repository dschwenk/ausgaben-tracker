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
   ScrollView,
   TextInput
 } from 'react-native';﻿

//import { MaskedInput } from 'react-native-masked-input';
//import { MaskedInput from } './MaskedInput';
//module.exports = require('./lib/MaskedInput.js');
//import {MaskedInput} from 'react-native-masked-input'
var MaskedInput = require('./MaskedInput')

class Add extends Component {
  constructor(props) {
  super(props);
  this.state = { betrag: '0.00' };
}

  updateText = (text) => {
    this.setState((state) => {
      return {
        betrag: text
      };
    });
  };

  onButtonSavePress(){
    this.props.navigator.push({
      id: 'Start'
    });
  }

  onButtonCancelPress(){
    this.props.navigator.push({
      id: 'Start'
    });
  }


  render(){
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Hinzufügen
          </Text>
          <TouchableHighlight onPress={this.onButtonCancelPress.bind(this)} style={styles.headerButton}>
            <Image
              style={styles.homeButton}
              source={require('./cancel.png')}
            />
          </TouchableHighlight>
          <TouchableHighlight onPress={this.onButtonSavePress.bind(this)} style={styles.headerButton}>
            <Image
              style={styles.homeButton}
              source={require('./save.png')}
            />
          </TouchableHighlight>
          <TouchableHighlight onPress={this.onButtonSavePress.bind(this)} style={styles.headerButton}>
            <Image
              style={styles.homeButton}
              source={require('./settings.png')}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.content}>
          <ScrollView>
            <View style={styles.inputBetrag}>
              <MaskedInput maskType="money" currencySymbol="€" currencySeparator="," />
            </View>
            <View style={styles.liste}>
                <Text style={styles.listenEintraege}>Andere</Text>
                <Text style={styles.listenEintraege}>Auto</Text>
                <Text style={styles.listenEintraege}>Essen</Text>
                <Text style={styles.listenEintraege}>Trinken</Text>
                <Text style={styles.listenEintraege}>Miete</Text>
                <Text style={styles.listenEintraege}>Freizeit</Text>
                <Text style={styles.listenEintraege}>Urlaub</Text>
            </View>
          </ScrollView>

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
  },
  inputBetrag: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 20
  },
  inputTextBetrag: {
    fontSize: 28,
    height: 60,
    width: 120,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0
  },
  liste: {
    flex: 7,
    paddingLeft: 30,
    alignSelf: 'stretch'
  },
  listenEintraege: {
    alignSelf: 'stretch',
    flex: 1,
    fontSize: 18,
    paddingTop: 20,
    color: '#173e43'
  }
})

module.exports = Add;
