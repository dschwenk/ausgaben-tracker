/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  DatePickerAndroid,
  Navigator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';﻿

import Realm from 'realm';
import RadioButtons from 'react-native-radio-buttons'
import ItemAusgabe from './ItemAusgabe'


class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      betrag: '0.00',
      note: '',
      category: "",
      presetDate: new Date(),
      presetText: 'Heute',
      selectedOption: 'Andere',
      date: "",
      year: "",
      month: "",
      day: "",
      options: [
        "Miete",
        "Auto & Verkehr",
        "Lebensmittel",
        "Freizeit",
        "Gesundheit & Pflege",
        "IT & Kommunikation",
        "Klammoten & Schuhe",
        "Studium und Bildung",
        "Andere"
      ]
    };
  }


  setCategory(value){
    this.setState({"category": value});
  };

  saveData(value){
    this.setState({"betrag": value});
  };

  saveNote(value){
    this.setState({"note": value});
  };

  setDate(){
    // get date values
    var date = new Date();
    this.setState({"date": date});
    var year = Number(date.getFullYear())
    this.setState({"year": year});
    var month = Number(('0'+(date.getMonth()+1)).slice(-2))
    this.setState({"month": month});
    var day = Number(('0' + date.getDate()).slice(-2))
    this.setState({"day": day});
  }


  onButtonSavePress(){
    // store data
    var amount = parseFloat(this.state.betrag)

    let realm = new Realm({schema: [ItemAusgabe]});
    // only save if user entered amount
    if(amount > 0){
      realm.write(() => {
          realm.create('ItemAusgabe', { amount: amount, category: this.state.selectedOption, date: this.state.date, year: this.state.year, month: this.state.month, day: this.state.day, note: this.state.note });
      })
    }

    // switch to start view
    this.props.navigator.push({
      id: 'Start'
    });
  }

  onButtonCancelPress(){
    this.props.navigator.push({
      id: 'Start'
    });
  }

  onButtonSettingsPress(){
    this.props.navigator.push({
      id: 'Settings'
    });
  }



  showPicker = async (stateKey, options) => {
    try {
      var newState = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action === DatePickerAndroid.dismissedAction) {
        newState[stateKey + 'Text'] = 'dismissed';
      } else {
        var date = new Date(year, month, day);
        newState[stateKey + 'Text'] = date.toLocaleDateString();
        newState[stateKey + 'Date'] = date;

        this.setState({"date": date});
        var year = Number(date.getFullYear())
        this.setState({"year": year});
        var month = Number(('0'+(date.getMonth()+1)).slice(-2))
        this.setState({"month": month});
        var day = Number(('0' + date.getDate()).slice(-2))
        this.setState({"day": day});

      }
      this.setState(newState);
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  };


  setSelectedOption(selectedOption){
    this.setState({
      selectedOption
    });
  }

  renderOption(option, selected, onSelect, index){
    const style = selected ? { fontWeight: 'bold', fontSize: 24, 'margin': 5} : {fontSize: 18, 'margin': 5};

    return (
      <TouchableWithoutFeedback onPress={onSelect} key={index}>
        <View>
          <Text style={style}>{option}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderContainer(optionNodes){
    return <View>{optionNodes}</View>;
  }

  componentWillMount(){
    this.setDate();
  };



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
          <TouchableHighlight onPress={this.onButtonSettingsPress.bind(this)} style={styles.headerButton}>
            <Image
              style={styles.homeButton}
              source={require('./settings.png')}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.content}>
          <ScrollView>

          <View style={styles.stats}>
            <TextInput style={styles.inputBetrag}
              placeholder="  0,00 €"
              keyboardType="numeric"
              maxLength={6}
              onChangeText={(text) => this.saveData(text)}
              value={this.state.betrag}
            />
          </View>

              <View style={styles.liste}>
                <RadioButtons
                  options={ this.state.options }
                  onSelection={ this.setSelectedOption.bind(this) }
                  selectedOption={this.state.selectedOption }
                  renderOption={ this.renderOption }
                  renderContainer={ this.renderContainer }
                />
              </View>

              <View style={styles.moreInfo}>
                  <Text style={styles.NotizText}>
                      Notiz
                  </Text>
                  <TextInput style={styles.inputNotiz}
                    placeholder=" Notiz"
                    keyboardType="default"
                    onChangeText={(text) => this.saveNote(text)}
                    value={this.state.note}
                  />
              </View>

              <View style={styles.moreInfo}>
                  <Text style={styles.NotizText}>
                      Datum
                  </Text>
                  <TouchableWithoutFeedback
                    onPress={this.showPicker.bind(this, 'preset', {date: this.state.presetDate})}>
                    <View>
                        <Text style={styles.DatumText}>{this.state.presetText}</Text>
                    </View>
                  </TouchableWithoutFeedback>
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
    alignSelf: 'stretch',
  },
  stats: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
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
  inputBetrag: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 20,
    fontSize: 28,
    width: 120,
    height: 90,
  },
  liste: {
    flex: 7,
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    alignSelf: 'stretch'
  },
  moreInfo: {
    flex: 4,
    flexDirection: 'row'
  },
  NotizText: {
    flex: 1,
    fontSize: 24,
    marginTop: 50,
    marginLeft: 30,
    marginRight: 10,
    color: '#173e43',
  },
  DatumText: {
    flex: 1,
    fontSize: 24,
    marginTop: 50,
    marginLeft: 30,
    marginRight: 160,
    color: '#173e43',
  },
  inputNotiz: {
    flex: 3,
    fontSize: 20,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
})

module.exports = Add;
