import React, {
  StyleSheet,
  Text,
  View,
  NativeModules,
  TextInput,
  TouchableHighlight,
  Picker,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import {
  Button,
  Icon,
  Divider,
  Avatar,
  CheckboxGroup,
} from 'react-native-material-design';

import Screen from '../components/Screen';
import { T }  from '../utils/';

let t = T("screens.newCourt");

export default class NewCourt extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startAt: this.nextHour(),
      endAt: null,
      place: { },
    }
  }

  handleStartAtClick() {
    NativeModules.DateAndroid.showTimepicker(() => {}, (hour, minute) => {
      this.setState({ startAt: `${hour}:${minute}` });
    })
  }

  handleEndAtClick() {
    NativeModules.DateAndroid.showTimepicker(() => {}, (hour, minute) => {
      this.setState({ endAt: `${hour}:${minute}` });
    })
  }

  nextHour(){
    // TODO use moment to fetch the next hour
    return "00:00";
  }

  handleLocationPress() {
    Actions.location({ onPlacePress: this.setPlace.bind(this) })
  }

  setPlace(place) {
    this.setState({ place: place });
  }

  render(){
    let place = this.state.place.description || t("location");

    return (
      <Screen {...this.props} icon="close" onIconPress={Actions.courts} actions={[{ icon: "done", onPress: this.save }]}>
        <View style={styles.court}>
          <TextInput style={styles.courtName} placeholder={t("courtName")}></TextInput>
          <Avatar style={styles.photCamera} icon="photo-camera"></Avatar>
        </View>

        <TouchableHighlight underlayColor="#ccc" onPress={this.handleLocationPress.bind(this)}>
          <View style={styles.section}>
            <Icon name="location-on" />
            <Text style={styles.sectionTitle}>{ place }</Text>
          </View>
        </TouchableHighlight>

        <Divider></Divider>

        <View style={styles.scheduleSection}>
          <Icon name="schedule" />
          <Text style={styles.sectionTitle}>{t("schedule")}</Text>
        </View>

        <View style={styles.schedules}>

	        <TouchableHighlight style={[styles.addSchedule]} underlayColor="#ccc" onPress={Actions.schedule}>
	          <View style={[styles.row]}>
	            <Icon name="add" />
	            <Text>{t("addSchedule")}</Text>
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
  sectionTitle: {
    marginLeft: 10,
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

