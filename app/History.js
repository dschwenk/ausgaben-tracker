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
      dataSource: ds.cloneWithRows([]),
    }
  }

  componentWillMount(){
    this.setState({"isLoading" : true});
    console.log("------componentWillMount------")

    var newDs = [];
    // query all ausgaben items for the current month
    let realm = new Realm({schema: [ItemAusgabe]});
    let r = realm.objects('ItemAusgabe').sorted("date", true);
    // build output string depending on results
    var rlength = r.length
    // no results
    if (rlength == 0) {
        console.log("no entries")
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

      //this.state.myKey = parseFloat(amount).toFixed(2) + ' €'
      console.log("sum ammount: " + amount)
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

  render(){
    return (
      <View style={styles.container}>
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
    backgroundColor: '#f5f5f0',
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
    marginTop: 20,
    alignSelf: 'stretch',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
    alignSelf: 'stretch',
  },
})

module.exports = History;
