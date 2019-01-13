import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Switch, Button} from 'react-native';

type Props = {
  time: string,
  isActive: string,
  repeat: string,
  id: string
};

export default class Alarm extends Component<Props> {
  constructor(props){
    super(props)
    this.state = {
      isActive: props.isActive,
      repeat: props.repeat,
      date: new Date(props.time),
      url: undefined
    }
  }

  loadData = async () => {
    try {
    const value = await AsyncStorage.getItem('URL');
    if (value !== null) {
      this.setState({url: value})
    }
   } catch (error) {console.log(error);}
  }

  getMin(min) {
    return min<10 ? '0'+min : min
  }

  delete() {
    fetch(this.props.url + '/alarm?id=' + this.props.id, {method: 'DELETE'})
    .then(res => res.json())
    .then(json => {if(json.error===false) this.props.remove(this.props.id) })
  }

  switchRepeat() {
    fetch(this.props.url + '/alarm', {headers: {"Content-Type": "application/json",},method: 'PUT', body:
      JSON.stringify({
        id: this.props.id,
        repeat: !this.props.repeat
      })
    })
    .then(res => res.json())
    .then(json => {console.log(json);if(json.error===false) this.setState({repeat: json.alarm.repeat}) })
  }

  switchActive() {
    fetch(this.props.url + '/alarm', {headers: {"Content-Type": "application/json",},method: 'PUT', body:
      JSON.stringify({
        id: this.props.id,
        isActive: !this.props.isActive
      })
    })
    .then(res => res.json())
    .then(json => {console.log(json);if(json.error===false) this.setState({isActive: json.alarm.isActive}) })
  }

  render() {
    return (
      <View style={{height: 50, flexDirection: 'row', margin: 3, width: '90%', padding: 10}}>
        <Text style={{flex: 2, fontSize: 20}}>{this.state.date.getHours()}:{this.getMin(this.state.date.getMinutes())}</Text>
        <View style={{flex: 3, flexDirection: 'row'}}>
          <Button onPress={this.delete.bind(this)} style={{flex: 1}}title='Delete' />
          <Switch style={{flex: 1}} onValueChange={this.switchRepeat.bind(this)} value={this.state.repeat} />
          <Switch style={{flex: 1}} onValueChange={this.switchActive.bind(this)} value={this.state.isActive} />
        </View>
      </View>
    );
  }
}
