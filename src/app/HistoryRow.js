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
    backgroundColor: '#f5f5f0',
  },
  container: {
    flexDirection: 'row',
    flex: 7,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f0',
  },
  containerDatum: {
    flex: 1,
    alignItems: 'center',
  },
  containerCat: {
    flex: 4,
    alignItems: 'flex-start',
  },
  containerAmount: {
    flex: 2,
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 14,
  },
  textDatum: {
    marginLeft: 0,
    fontSize: 14,
  },
  textCat: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textAmount: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const Row = (props) => (
  <View style={styles.content}>
    <View style={styles.container}>
      <View style={styles.containerDatum}>
        <Text style={styles.textDatum}>
          {`${props.day}.${props.month}`}
        </Text>
        <Text style={styles.textDatum}>
          {`${props.year}`}
        </Text>
      </View>
      <View style={styles.containerCat}>
        <Text style={styles.textCat}>
          {`${props.category}`}
        </Text>
        <Text style={styles.text}>
          {`${props.note}`}
        </Text>
      </View>
      <View style={styles.containerAmount}>
        <Text style={styles.textAmount}>
          {`${props.amount} €`}
        </Text>
      </View>
    </View>
  </View>
);

export default Row;
