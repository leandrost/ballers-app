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
import { T }  from '../utils/';
import { Colors }  from '../utils/';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import update from 'react-addons-update';

const DateAndroid = NativeModules.DateAndroid;
const t = T("screens.schedule");

const DAY_NAMES = t("date.abbr_day_names");
const HH_MM = "HH:mm";

class Weekdays extends React.Component {

  constructor(props) {
    super(props);
    let selected = this.props.selected || [this.currentDay()];
    this.state = { selected: selected };
  }

  currentDay() {
    let day =  moment().format("d");
    return parseInt(day);
  }

  isCurrentWeekday(dayNumber){
    return (this.currentDay() == dayNumber);
  }

  isSelected(dayNumber) {
    let index = this.state.selected.indexOf(dayNumber);
    return index >= 0;
  }

  handlePress(day) {
    let data = { selected: { $push : [day] } };
    if (this.isSelected(day)) {
      let index = this.state.selected.indexOf(day);
      let newSelected = this.state.selected.filter((x,i) => i != index);
      console.log(newSelected);
      data = { selected: { $set : newSelected } };
    }
    let selectedState = update(this.state, data);
    this.setState(selectedState);
  }

  renderWeekday(day){
    let isSelected = this.isSelected(day);
    let selectedWeekday = isSelected ? styles.selected : null;
    let selectedLabel = isSelected ? styles.selectedLabel : null;

    return (
      <TouchableHighlight
        style={ [styles.weekday, selectedWeekday] }
        underlayColor={Colors.Accent}
        onPress={ () => this.handlePress(day) }
      >
        <Text style={ [styles.label, selectedLabel] } >
          { DAY_NAMES[day] }
        </Text>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View>
        <View style={styles.row}>
          { this.renderWeekday(0) }
          { this.renderWeekday(1) }
          { this.renderWeekday(2) }
          { this.renderWeekday(3) }
        </View>

        <View style={styles.row}>
          { this.renderWeekday(4) }
          { this.renderWeekday(5) }
          { this.renderWeekday(6) }
        </View>
      </View>
    );
  }

}

export default class Schedule extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      repetition: "weekly",
      startAt: this.nextHour(),
      endAt: null,
      weekdays: [];
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
          <Picker.Item label={ t(".monthly") } value="monthly" />
          <Picker.Item label={ t(".oneTime") } value="one-time" />
        </Picker>

        <Weekdays />

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
  weekday: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
    borderRadius: 35,
    borderWidth: 0.5,
    borderColor: Colors.Accent,
    padding: 10,
    width: 70,
    height: 70,
  },
  selected: {
    backgroundColor: Colors.Accent,
  },
  label: {
    color: "black",
  },
  selectedLabel: {
    color: "white",
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
