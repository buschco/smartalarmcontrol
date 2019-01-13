import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Switch, Button, TextInput, AsyncStorage} from 'react-native';

type Props = {
  time: string,
  isActive: string,
  repeat: string,
  id: string
};

export default class Initscreen extends Component<Props> {
  constructor(props){
    super(props)
    this.state = {
      url: undefined,
      test: false
    }
  }

  storeData = async () => {
    try {
      await AsyncStorage.setItem('URL', this.state.url);
    } catch (error) {console.log(error);}
  }

  loadData = async () => {
    try {
    const value = await AsyncStorage.getItem('URL');
    if (value !== null) {
      this.setState({url: value})
    }
   } catch (error) {console.log(error);}
  }

  componentDidMount() {
    this.loadData()
    this.test()
  }

  test() {
    fetch(this.state.url + '/test')
    .then(res => res.json())
    .then(json => {this.setState({test: json.error}); console.log(json.error); })
    .catch(error => this.setState({test: true}) );
  }

  render() {
    return (
      <View style={{height: 70, flexDirection: 'column', margin: 3, marginTop: 50, width: '100%', padding: 10}}>
        <TextInput
          style={{flex: 2, height: 40, borderColor: this.state.test == true ? 'red' : 'green', borderWidth: 1, width: '100%'}}
          onChangeText={(text) => this.setState({url: text})}
          value={this.state.url}
        />
        <View style={{flex: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Button onPress={this.test.bind(this)} style={{flex: 1}}title='test' />
          <Button onPress={this.storeData.bind(this)} style={{flex: 1}}title='save' />
        </View>
      </View>
    );
  }
}
