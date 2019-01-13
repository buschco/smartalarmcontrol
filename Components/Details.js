import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

type Props = {
  time: string,
  isActive: string,
  repeat: string,
  id: string
};

export default class App extends Component<Props> {

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1,width: '100%'}}>
          <DatePickerIOS mode={'time'} date={this.state.date} onDateChange={(newDate => this.setState({date: newDate}))}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c34e0',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
