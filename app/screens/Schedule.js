import React, {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  NativeModules,
  TouchableHighlight,
} from 'react-native';

import Screen from '../components/Screen';
import { T }  from '../utils/';
import { Actions } from 'react-native-router-flux';

let t = T("screens.schedule");

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

	render() {
		return (
			<Screen {...this.props}
			icon="close"
			onIconPress={Actions.newCourt}
			actions={[{ icon: "done", onPress: this.props.onSelect  }]}>

				<Picker
				selectedValue={this.state.repetition}
				onValueChange={(value) => this.setState({repetition: value})}>
					<Picker.Item label="Semanalmente" value="weekly" />
					<Picker.Item label="Mensalmente" value="monthly" />
					<Picker.Item label="Evento Único" value="one-time" />
				</Picker>

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

			</Screen>
		)
	}
}

var styles = StyleSheet.create({
  time: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
