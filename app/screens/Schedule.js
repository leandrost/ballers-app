import React, {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  NativeModules,
  TouchableHighlight,
} from "react-native";

import {
  Button,
  Avatar,
} from 'react-native-material-design';

import { MKButton, } from 'react-native-material-kit';

import Screen from '../components/Screen';
import { Weekdays } from '../components/Weekdays';
import { T }  from '../utils/';
import { Colors }  from '../utils/';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import update from 'react-addons-update';

const DateAndroid = NativeModules.DateAndroid;
const t = T("screens.schedule");

const HH_MM = "HH:mm";

export default class Schedule extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      repetition: "weekly",
      startAt: this.nextHour(),
      endAt: null,
      weekdays: [],
      date: null,
    }
  }

  handleStartAtClick() {
    this.showTimePickerFor("startAt", this.nextHour());
  }

  handleEndAtClick() {
    this.showTimePickerFor("endAt", this.nextHour());
  }

  showTimePickerFor(attr, initialDate) {
    let setTime = (hour, minute) => {
      let attrState = {};
      attrState[attr] = moment(`${hour}:${minute}`, HH_MM).format(HH_MM);
      this.setState(attrState);
    }
    DateAndroid.showTimepickerWithInitialTime(initialDate, () => {}, setTime);
  }

  nextHour(){
    now = moment();
    now.add(1, "hour");
    return now.format("HH:00");
  }

  handleWeekdayChange(weekdays) {
    console.log(weekdays);
    this.setState({ weekdays: weekdays });
  }

  handlAddSchedule() {
    console.log(this.state);
  }

	render() {
		return (
			<Screen {...this.props}
			icon="arrow-back"
			onIconPress={Actions.pop}
			>

      <View style={ styles.container }>
        <Picker
          style={styles.repetition}
          selectedValue={this.state.repetition}
          onValueChange={(value) => this.setState({repetition: value})}>
          <Picker.Item label={ t(".weekly")  } value="weekly" />
          <Picker.Item label={ t(".oneTime") } value="one-time" />
        </Picker>

        <Weekdays onChange={ this.handleWeekdayChange.bind(this) } />

        <View style={[styles.row, styles.schedule]}>
          <Text style={styles.label}>
            { t(".from") }
          </Text>
          <TouchableHighlight style={styles.time} underlayColor="#ccc" onPress={this.handleStartAtClick.bind(this)}>
            <Text>
              {this.state.startAt}
            </Text>
          </TouchableHighlight>
          <Text style={styles.label}>
            { t(".to") }
          </Text>
          <TouchableHighlight style={styles.time} underlayColor="#ccc" onPress={this.handleEndAtClick.bind(this)}>
            <Text>
              {this.state.endAt || t(".endTime")}
            </Text>
          </TouchableHighlight>
        </View>

        <MKButton {...MKButton.coloredButton().toProps()} onPress={ this.handlAddSchedule.bind(this) }>
          <Text style={{color: 'white', fontWeight: 'bold',}}>
            { t("done") }
          </Text>
        </MKButton>
      </View>

			</Screen>
		)
	}
}

let styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  repetition: {
    width: 150,
  },
  time: {
    flex: 1,
    padding: 10,
    width: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  schedule: {
    margin: 12,
  },
});
