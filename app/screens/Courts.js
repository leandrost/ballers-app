import React, {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import {
  Button,
} from 'react-native-material-design';

import ActionButton from 'react-native-action-button';
import Screen from '../components/Screen';

import { T }  from '../utils/';

let t = T("screens.courts");

export default class Courts extends React.Component {
  render(){
    return(
      <Screen {...this.props}>
        <View style={styles.container}>
          <Text>{t(".noCourtsFound")}</Text>
        </View>
        <ActionButton
          buttonColor="#259b23"
          onPress={Actions.newCourt}
        />
      </Screen>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
