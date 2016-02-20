import React, {
  StyleSheet,
  Text,
  View,
  NativeModules,
  TextInput,
  TouchableHighlight,
  Picker,
  Image,
  Animated,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import {
  Button,
  Icon,
  Divider,
  Avatar,
  CheckboxGroup,
} from 'react-native-material-design';

import {
  MKButton,
} from 'react-native-material-kit';


import Screen from '../components/Screen';
import ImagePickerButton from '../components/ImagePickerButton';

import { T }  from '../utils/';

let t = T("screens.newCourt");

export default class NewCourt extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      description: null,
      imageSource: { },
      place: { },
      startAt: null,
      endAt: null,
    }
  }

  handleLocationPress() {
    Actions.location({ onPlacePress: this.setPlace.bind(this) })
  }

  setImage(source) {
    this.setState({ imageSource: source });
  }

  setPlace(place) {
    this.setState({ place: place });
  }

  render(){
    let location = this.state.place.description || t(".location");

    return (
      <Screen {...this.props} icon="close" onIconPress={Actions.courts} actions={[{ icon: "done", onPress: this.save }]}>
        <Image style={styles.image} source={this.state.imageSource}></Image>
        <View style={styles.court}>
          <TextInput style={styles.courtName} placeholder={t(".courtName")}></TextInput>
          <ImagePickerButton onSelect={ this.setImage.bind(this) }/>
        </View>

        <TouchableHighlight underlayColor="#ccc" onPress={this.handleLocationPress.bind(this)}>
          <View style={styles.section}>
            <Icon name="location-on" />
            <Text style={styles.sectionTitle} numberOfLines={2}>{ location }</Text>
          </View>
        </TouchableHighlight>

        <Divider></Divider>

        <TouchableHighlight underlayColor="#ccc" >
          <View style={styles.section}>
            <Icon name="schedule" />
            <Text style={styles.sectionTitle}>{t(".schedule")}</Text>
          </View>
        </TouchableHighlight>

        <View style={styles.schedules}>

	        <TouchableHighlight style={[styles.addSchedule]} underlayColor="#ccc" onPress={Actions.schedule}>
	          <View style={[styles.row]}>
	            <Icon name="add" />
	            <Text>{t(".addSchedule")}</Text>
	          </View>
	        </TouchableHighlight>
        </View>

        <Divider></Divider>
      </Screen>
    );
  }
}

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  court: {
    padding: 10,
    flexDirection: 'row',
  },
  courtName: {
    flex: 7,
    marginRight: 10,
  },
  image: {
    height: 150,
    alignSelf: 'stretch',
  },
  sectionTitle: {
    marginLeft: 10,
    flex: 1,
  },
  section: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleSection: {
    padding: 10,
    paddingBottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  schedules: {
    marginLeft: 40,
    marginRight: 10,
    paddingBottom: 10,
  },
  addSchedule: {
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    margin: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

