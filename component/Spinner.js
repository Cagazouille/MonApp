import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

class Spinner extends Component {
    render() {
        return (
            <View style={styles.liste}>
              <Text style={styles.text}> Charging, please wait</Text>
              <ActivityIndicator size='large' />
            </View>
        );
    }
}

const styles = {
  liste: {
    alignItems:'center',
    justifyContent:'center',
    margin: 60,
    width: 300
  },
  text: {
    margin: 80,
    fontSize: 19,
    fontWeight: 'bold',
  },
};

export default Spinner;
