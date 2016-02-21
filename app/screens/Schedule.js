import React, {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  NativeModules,
  TouchableHighlight,
} from 'react-native';

import {
  Button,
  CheckboxGroup,
  Avatar,
} from 'react-native-material-design';

import {
  MKCheckbox,
  MKButton,
  MKColor,
} from 'react-native-material-kit';

import Screen from '../components/Screen';
import { T }  from '../utils/';
import { Colors }  from '../utils/';
import { Actions } from 'react-native-router-flux';
import  moment  from 'moment';

const DateAndroid = NativeModules.DateAndroid;
const HH_MM = "HH:mm";
let t = T("screens.schedule");

class WeekdayCheck extends React.Component {

  constructor(props) {
    super(props);
    let stateColor = this.isCurrentDayWeek() ? Colors.Accent : null;
    this.state = { statusColor: stateColor, }
  }

  isCurrentDayWeek(){
    return (moment().format("d") == this.props.dayNumber);
  }

  toggle() {
    let color = this.state.statusColor ?  null : Colors.Accent;
    this.setState({ statusColor: color });
  }

  render() {
    let dayNames = t("date.abbr_day_names");
    return (
      <TouchableHighlight
        style={[styles.weekday, { backgroundColor: this.state.statusColor }]}
        underlayColor={Colors.Accent}
        onPress={ this.toggle.bind(this) }
      >
        <Text style={styles.label}>{ dayNames[this.props.dayNumber] }</Text>
      </TouchableHighlight>
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

        <View style={styles.row}>
          <WeekdayCheck dayNumber={0} />
          <WeekdayCheck dayNumber={1} />
          <WeekdayCheck dayNumber={2} />
          <WeekdayCheck dayNumber={3} />
        </View>

        <View style={styles.row}>
          <WeekdayCheck dayNumber={4} />
          <WeekdayCheck dayNumber={5} />
          <WeekdayCheck dayNumber={6} />
        </View>

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
  label: {
    color: "black",
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
