/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @f
 */

 import React, { Component } from 'react';
 import {
   Alert,
   AppRegistry,
   Image,
   ListView,
   Modal,
   Navigator,
   ScrollView,
   StyleSheet,
   Text,
   ToastAndroid,
   TouchableHighlight,
   View,
 } from 'react-native';﻿

// https://github.com/anarchicknight/react-native-communications
// Open a web address or call, email, text or iMessage (iOS only) someone in React Native
// used to allow user to send feedback mail to developer
import Communications from 'react-native-communications';


class Settings extends Component {
  constructor(){
    super()

    this.state = {
      key: '',
      modalVisible: false,
      waehrung: '',
      alertMessage: 'Kleines, funktionales Haushaltsbuch. Perfekt um die alltäglichen Ausgaben im Auge zu behalten.\n\nEntwickelt von Daniel Schwenk mit react-native - Version: 0.0.1'
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onButtonHomePress(){
    this.props.navigator.push({
      id: 'Start'
    });
  }

  pressendWaehrung(){
    this.setModalVisible(true)
  }

  pressedButtonEuro(){
    this.setState({waehrung: '€'});
    this.setModalVisible(!this.state.modalVisible);
    ToastAndroid.show('Währung: Euro €', ToastAndroid.LONG)
  }

  pressedButtonDollar(){
    this.setState({waehrung: '$'});
    this.setModalVisible(!this.state.modalVisible);
    ToastAndroid.show('Währung: Dollar $', ToastAndroid.LONG)
  }

  pressedButtonCHF(){
    this.setState({waehrung: 'CHF'});
    this.setModalVisible(!this.state.modalVisible)
    ToastAndroid.show('Währung: Schweizer Franken CHF', ToastAndroid.LONG)
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
            <View>
              <Text style={styles.ueberschriftText}>
                ALLGEMEIN
              </Text>
              <View style={styles.borderBottomStyle}>
                <TouchableHighlight onPress={this.pressendWaehrung.bind(this)} style={styles.listButton}>
                  <Text style={styles.EinstellungenText}>
                    Währung
                  </Text>
                </TouchableHighlight>
              </View>

              <View>
                <Modal
                  animationType={"slide"}
                  transparent={false}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {alert("Modal has been closed.")}}
                  >
                 <View style={{marginTop: 22}}>
                  <View>
                    <Text style={{marginTop: 170}}>

                    </Text>
                    <View style={styles.borderBottomStyle}>
                      <TouchableHighlight onPress={this.pressedButtonEuro.bind(this)} style={styles.listButton}>
                        <Text style={styles.EinstellungenText}>
                          Euro - €
                        </Text>
                      </TouchableHighlight>
                    </View>
                    <View style={styles.borderBottomStyle}>
                      <TouchableHighlight onPress={this.pressedButtonDollar.bind(this)} style={styles.listButton}>
                        <Text style={styles.EinstellungenText}>
                          Dollar - $
                        </Text>
                      </TouchableHighlight>
                    </View>
                    <View style={styles.borderBottomStyle}>
                      <TouchableHighlight onPress={this.pressedButtonCHF.bind(this)} style={styles.listButton}>
                        <Text style={styles.EinstellungenText}>
                          Schweizer Franken - CHF
                        </Text>
                      </TouchableHighlight>
                    </View>

                    <View style={styles.stylesViewWaehrungButtons}>
                      <View style={styles.stylesViewWaehrungButtonX}>
                        <TouchableHighlight onPress={() => {
                          this.setModalVisible(!this.state.modalVisible)
                        }}>
                          <Text style={styles.stylesButtonXText}>Abbrechen</Text>
                        </TouchableHighlight>
                      </View>
                    </View>

                  </View>
                 </View>
                </Modal>
               </View>

              <View style={styles.borderBottomStyle}>
                <TouchableHighlight style={styles.listButton} onPress={() =>
                  ToastAndroid.show('"Tägliche Erinnerung" is not yet implemented. Wait for future versions.', ToastAndroid.LONG)}>
                  <Text style={styles.EinstellungenText}>
                    Tägliche Erinnerung
                  </Text>
                </TouchableHighlight>
              </View>
              <TouchableHighlight style={styles.listButton} onPress={() =>
                ToastAndroid.show('"Daten exportieren" is not yet implemented. Wait for future versions.', ToastAndroid.LONG)}>
                <Text style={styles.EinstellungenText}>
                  Daten exportieren
                </Text>
              </TouchableHighlight>
            </View>

            <View>
              <Text style={styles.ueberschriftText}>
                AUSGABEN
              </Text>
              <View style={styles.borderBottomStyle}>
                <TouchableHighlight style={styles.listButton} onPress={() =>
                  ToastAndroid.show('"Kategorien" is not yet implemented. Wait for future versions.', ToastAndroid.LONG)}>
                  <Text style={styles.EinstellungenText}>
                    Kategorien
                  </Text>
                </TouchableHighlight>
              </View>
              <TouchableHighlight style={styles.listButton} onPress={() =>
                ToastAndroid.show('"Fixkosten" is not yet implemented. Wait for future versions.', ToastAndroid.LONG)}>
                <Text style={styles.EinstellungenText}>
                  Fixkosten
                </Text>
              </TouchableHighlight>
            </View>

            <View>
              <Text style={styles.ueberschriftText}>
                ÜBER
              </Text>
              <View style={styles.borderBottomStyle}>
                <TouchableHighlight style={styles.listButton} onPress={() => Alert.alert(
                      'Über',
                      this.state.alertMessage,
                      [
                        {text: 'OK', onPress: () => console.log('OK Pressed!')},
                      ]
                    )}>
                  <Text style={styles.EinstellungenText}>
                    Über
                  </Text>
                </TouchableHighlight>
              </View>

              <TouchableHighlight  style={styles.listButton} onPress={() => Communications.email(['mail@danielschwenk.de', 'ausgaben@danielschwenk.de'],null,null,'Feedback Ausgaben-App','Vielen Dank für Ihr Feedback')}>
                <Text style={styles.EinstellungenText}>
                  Feedback senden
                </Text>
              </TouchableHighlight>
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
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'yellow'
  },
  ueberschriftText: {
    paddingLeft: 25,
    paddingTop: 15,
    fontSize: 21,
    textDecorationLine: 'underline',
    color: '#173e43',
  },
  EinstellungenText: {
    paddingLeft: 50,
    paddingTop: 13,
    paddingBottom: 15,
    fontSize: 20,
  },
  borderBottomStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0d1',
    marginBottom: 10,
  },
  stylesViewWaehrungButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stylesViewWaehrungButtonX: {
    backgroundColor: '#D3D3D3',
    margin: 25,
    padding: 12,
  },
  stylesButtonXText: {
    fontSize: 22
  }
})

module.exports = Settings;
