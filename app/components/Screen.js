import React, {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import {
  Toolbar,
} from 'react-native-material-design';

import { T }  from '../utils/';

let t = T("screens");

export default class Screen extends React.Component {

  getTitle() {
    let name = this.props.name;
    return t(`.${name}.title`, { defaultValue: name });
  }

  render() {
    return(
      <View style={ styles.container }>
        <Toolbar
          title={ this.getTitle() }
          styles={ styles.toolbar }
          overrides={ { backgroundColor: "#292929" } }
          icon={ this.props.icon || "menu" }
          onIconPress={ this.props.onIconPress }
          actions={ this.props.actions }
        />
        <View style={ styles.children }>
          { this.props.children }
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
  },
  toolbar: {
    marginBottom: 100,
  },
  children: {
    flex: 1,
    marginTop: 56,
  }
});
