import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    flex: 7,
    padding: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  liste: {
    flex: 7,
    paddingLeft: 10,
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
});

const Row = (props) => (
  <View style={styles.content}>
    <View style={styles.container}>
      <View style={styles.liste}>
        <Text style={styles.listenEintraege}>
          {`${props.category} ${props.amount_string}`}
        </Text>
      </View>
    </View>
  </View>
);

export default Row;
