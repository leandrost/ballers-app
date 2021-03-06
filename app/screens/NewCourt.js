import React, {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  NativeModules,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import {
  Button,
  Icon,
  Divider,
  Avatar,
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

  render(){
    return (
      <Screen {...this.props} icon="close" onIconPress={Actions.courts}>
        <View style={styles.court}>
          <TextInput style={styles.courtName}  placeholder={t("courtName")}></TextInput>
          <Avatar style={styles.photCamera} icon="photo-camera"></Avatar>
        </View>

        <TouchableHighlight underlayColor="#ccc">
          <View style={styles.section}>
            <Icon name="location-on" />
            <Text style={styles.sectionTitle}>{t("location")}</Text>
          </View>
        </TouchableHighlight>

        <Divider></Divider>

        <View style={styles.scheduleSection}>
          <Icon name="schedule" />
          <Text style={styles.sectionTitle}>{t("schedule")}</Text>
        </View>

        <View style={styles.schedules}>
          <TextInput style={styles.when}>
          </TextInput>
          <View style={[styles.row, {marginBottom: 10}]}>
            <TouchableHighlight style={styles.time} underlayColor="#ccc" onPress={this.handleStartAtClick.bind(this)}>
              <Text>
                {this.state.startAt}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.time} underlayColor="#ccc" onPress={this.handleEndAtClick.bind(this)}>
              <Text>
                {this.state.endAt || t("endTime")}
              </Text>
            </TouchableHighlight>
          </View>
          <TouchableHighlight style={[styles.addSchedule]} underlayColor="#ccc">
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
  time: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
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

