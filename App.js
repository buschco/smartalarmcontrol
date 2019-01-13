/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, Button, AsyncStorage} from 'react-native';

import Mainscreen from './Components/Mainscreen'
import Initscreen from './Components/Initscreen'


type Props = {}
type State = {
  count: array,
}
export default class App extends Component<Props, State> {
  state = {
    active: 'main',
    url: undefined
  }

  componentDidMount(){
    this.loadData()
  }

  loadData = async () => {
    try {
    const value = await AsyncStorage.getItem('URL')
    if (value !== null) {
      this.setState({url: value})
    }
   } catch (error) {console.log(error);}
  }

  removeAlarm(id) {
    var copy = [...this.state.alarms]
    for (var i = 0; i < copy.length; i++) {
      if(copy[i].id===id) copy.splice(i, 1)
    }
    this.setState({alarms: copy});
  }

  render() {
    const main = (this.state.url === undefined ? <Text>Loading</Text> : <Mainscreen url={this.state.url}/>)

    return (
      <View style={{flexDirection: 'column', width: '100%', height: '100%'}}>
        <View style={{flex: 8}}>{this.state.active==='main' ?
           main :
          <Initscreen />}</View>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Button disabled={this.state.active==='main'} onPress={() => this.setState({active: 'main'})} style={{flex: 1}}title='main' />
          <Button disabled={this.state.active==='init'} onPress={()=> this.setState({active: 'init'})} style={{flex: 1}}title='init' />
        </View>
      </View>
    );
  }
}
