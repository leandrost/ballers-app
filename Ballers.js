import React, {
  Navigator,
} from 'react-native';

import {
  Toolbar,
} from 'react-native-material-design';

import Courts from './app/screens/Courts';
import NewCourt from './app/screens/NewCourt';
import MapExample from './app/screens/MapExample';

import { Router, Route, Schema, Actions } from 'react-native-router-flux';

export default class Example extends React.Component {
    render() {
        return (
          <Router hideNavBar={true}>
            <Schema name="fadeAndroid" sceneConfig={Navigator.SceneConfigs.FadeAndroid}/>
            <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
            <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
            <Schema name="withoutAnimation"/>

            <Route name="newCourt" component={NewCourt} schema="fadeAndroid" />
            <Route name="courts" component={Courts} schema="fadeAndroid" />
            <Route name="map" component={MapExample} />
          </Router>
        );
    }
}
