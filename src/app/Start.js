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
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';﻿

import Realm from 'realm';
import ItemAusgabe from './ItemAusgabe'
import Row from './OverviewRow';


class Start extends Component {
  constructor(){
    super()

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      monthAmount: "",
      monthNames: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
      currentMonth: "",
      isLoading: false,
      dataSource: ds.cloneWithRows([]),
    }
  }


  componentWillMount(){
    this.setState({"isLoading" : true});

    // get cuurent year and month
    var date = new Date();
    var year = Number(date.getFullYear())
    var month = Number(('0'+(date.getMonth()+1)).slice(-2))
    var monthName = this.state.monthNames[month-1]
    this.setState({currentMonth: monthName})

    // query all ausgaben items for the current month
    let realm = new Realm({schema: [ItemAusgabe]});
    let r = realm.objects('ItemAusgabe').filtered('year <= $0 && month <= $1', year, month);
    // build output string depending on results
    var rlength = r.length
    var newDs = [];
    // no results
    if (rlength == 0) {
        this.state.monthAmount = '0.00 €'
    } // there are results
    else {
      var amount = 0.00
      for (var i = 0; i < rlength; i++) {
          // sum up current month amount
          amount = amount + r[i].amount
          // verify if current category was seen before
          var isin = false;
          for (var j = 0; j < newDs.length; j++) {
            if (r[i].category == newDs[j].category) {
              newDs[j].amount = newDs[j].amount + r[i].amount
              isin = true;
              break;
            }
          }
          // there are no objects in array or category is not in arry
          if (isin == false || newDs.length == 0) {
            var newData = {category:r[i].category, amount:r[i].amount, amount_string: ''};
            newDs.push(newData)
          }

      }
      // set current month amount string
      this.state.monthAmount = parseFloat(amount).toFixed(2) + ' €'
    }

    // build amount string for listview
    for (var j = 0; j < newDs.length; j++) {
        newDs[j].amount_string = newDs[j].amount.toFixed(2) + ' €'
      }

    if (newDs.length > 0) {
      // sort array with objects depending on category amount
      newDs.sort(function(a, b) {
        // absteigend sortieren
        return parseFloat(b.amount) - parseFloat(a.amount);
      });
      // set new datasource
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newDs)
      })
    }


    this.setState({"isLoading" : false});
  }

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
    if (this.state.isLoading == true){
      return (
        <View>
          <Text>
            loading data ...
          </Text>
        </View>
      )
    }
    else {
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
                {this.state.currentMonth}
              </Text>
              <Text style={styles.betragText}>
                {this.state.monthAmount}
              </Text>
            </View>
            <View style={styles.liste}>
              <ListView
                style={styles.listcontainer}
                dataSource={this.state.dataSource}
                renderRow={(data) => <Row {...data} />}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                enableEmptySections={true}
              />
            </View>
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
  betragText: {
    flex: 2,
    fontSize: 40,
    paddingBottom: 20,
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
})

module.exports = Start;
