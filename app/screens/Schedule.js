import React, {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  NativeModules,
  TouchableHighlight,
  ListView,
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
import { Actions } from 'react-native-router-flux';
import  moment  from 'moment';

let t = T("screens.schedule");

export default class Schedule extends React.Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let weekdays = this.getWeekDays();
    this.state = {
      repetition: "weekly",
      startAt: this.nextHour(),
      endAt: null,
      dataSource: ds.cloneWithRows(weekdays),
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

  getWeekDays() {
    let weekdays = [];
    let names = t("date.abbr_day_names");

    names.forEach((name, index) => {
      weekdays.push({ key: index, name: name, checked: false });
    });

    return weekdays;
  }

  renderWeekday(weekday) {
    return (
      <View key={weekday.key} style={styles.weekday}>
        <MKCheckbox checked={weekday.checked} />
        <Text style={styles.label}>{ weekday.name }</Text>
      </View>
    );
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
          {
            this.getWeekDays().map((weekday) => {
              return this.renderWeekday(weekday)
            })
          }
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

        <MKButton {...MKButton.coloredButton().toProps()}>
          <Text pointerEvents="none"
            style={{color: 'white', fontWeight: 'bold',}}>
            {t("done")}
          </Text>
        </MKButton>
      </View>

			</Screen>
		)
	}
}

var styles = StyleSheet.create({
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
