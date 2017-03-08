/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';﻿

import Realm from 'realm';
import ItemAusgabe from './ItemAusgabe'
import Row from './HistoryRow';



class History extends Component {
  constructor(){
    super()

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      keyx: "",
      noEntries: false,
      dataSource: ds.cloneWithRows([]),
    }
  }

  componentWillMount(){
    this.setState({"isLoading" : true});

    var newDs = [];
    // query all ausgaben items for the current month
    let realm = new Realm({schema: [ItemAusgabe]});
    let r = realm.objects('ItemAusgabe').sorted("date", true);
    // build output string depending on results
    var rlength = r.length
    // no results
    if (rlength == 0) {
        console.log("no entries")
        this.setState({noEntries: true})
    } // there are results
    else {
      var amount = 0.00
      for (var i = 0; i < rlength; i++) {
          amount = amount + r[i].amount
          console.log("amount: " + r[i].amount)
          var amount_string = r[i].amount.toFixed(2)
          // newDs.push("hallo" + r[i].amount);
          var newData = {note:r[i].note, category:r[i].category, amount:amount_string, day:r[i].day, month:r[i].month, year:r[i].year};
          newDs.push(newData)
      }

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newDs)
      })
    }
    this.setState({"isLoading" : false});
  }

  onButtonStartPress(){
    this.props.navigator.push({
      id: 'Start'
    });
  }

  onButtonAddPress(){
    this.props.navigator.push({
      id: 'Add'
    });
  }

  onButtonSettingsPress(){
    this.props.navigator.push({
      id: 'Settings'
    });
  }

  returnHeader(){
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Verlauf
        </Text>
        <TouchableHighlight onPress={this.onButtonStartPress.bind(this)} style={styles.headerButton}>
          <Image
            style={styles.homeButton}
            source={require('./home.png')}
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
    )
  }

  render(){
    if (this.state.noEntries == true){
      return (
        <View style={styles.container}>
          {this.returnHeader()}
          <View style={styles.content}>
              <Text style={styles.textStyle}>
                keine Ausgaben :)
              </Text>
          </View>
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          {this.returnHeader()}
          <View style={styles.content}>
              <ListView
                style={styles.listcontainer}
                dataSource={this.state.dataSource}
                renderRow={(data) => <Row {...data} />}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                enableEmptySections={true}
              />
          </View>
        </View>
      )
    }
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
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'yellow'
  },
  listcontainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
    alignSelf: 'stretch',
  },
  textStyle: {
    fontSize: 22,
    color: 'black',
  }
})

module.exports = History;
