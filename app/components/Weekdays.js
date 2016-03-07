import React, {
  StyleSheet,
  Text,
  View,
  NativeModules,
  TouchableHighlight,
} from "react-native";

import { Colors }  from '../utils/';
import { t }  from '../utils/';
import moment from 'moment';
import update from 'react-addons-update';

const DateAndroid = NativeModules.DateAndroid;

const DAY_NAMES = t("date.abbr_day_names");

export class Weekdays extends React.Component {

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
    this.props.onChange(this.state.selected);
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

let styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
});
