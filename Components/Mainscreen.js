import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, Button} from 'react-native';

import Alarm from './Alarm'

type Props = {}
type State = {
  count: array,
}
export default class Mainscreen extends Component<Props, State> {
  constructor(props){
    super(props)
    this.state = {
      alarms: [],
      date: new Date()
    }
  }

  componentDidMount(){
    if(this.props.url===undefined) return
    fetch(this.props.url+'/alarms')
    .then((res) => res.json())
    .then((json) => {
      this.setState({alarms: json})
    })
    .catch((error) => {
      console.error(error);
    })
  }

  removeAlarm(id) {
    var copy = [...this.state.alarms]
    for (var i = 0; i < copy.length; i++) {
      if(copy[i].id===id) copy.splice(i, 1)
    }
    this.setState({alarms: copy});
  }

  render() {
    const alarmList = this.state.alarms.length<=0 ? <Text>no Alarms</Text> : this.state.alarms.map(alarm => {
      return <Alarm url={this.props.url} remove={this.removeAlarm.bind(this)} key={alarm.id} id={alarm.id} time={alarm.time} isActive={alarm.isActive} repeat={alarm.repeat} />
    })
    return (
      <ScrollView contentContainerStyle={{flex: 1, width: '100%', alignItems: 'center', marginTop: 50}}>
        <View style={{width: '90%', margin: 10, padding: 10, flexDirection: 'row'}}>
          <Text style={{flex: 4}}>time</Text>
          <Text style={{flex: 1}}>repeat</Text>
          <Text style={{flex: 1}}>active</Text>
        </View>
        {alarmList}
      </ScrollView>
    );
  }
}
