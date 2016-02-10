import React, {
  Navigator,
} from 'react-native';

import {
  Toolbar,
} from 'react-native-material-design';

import Courts from './app/screens/Courts';
import NewCourt from './app/screens/NewCourt';
import MapExample from './app/screens/MapExample';
import Location from './app/screens/Location';
import Schedule from './app/screens/Schedule';

import { Router, Route, Schema, Actions } from 'react-native-router-flux';

export default class Ballers extends React.Component {
  render() {
    return (
      <Router hideNavBar={true}>
        <Schema name="fadeAndroid" sceneConfig={Navigator.SceneConfigs.FadeAndroid}/>
        <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
        <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
        <Schema name="toTheback" sceneConfig={Navigator.SceneConfigs.toTheBack}/>
        <Schema name="withoutAnimation"/>

        <Route name="newCourt" component={NewCourt} type="jump" />
        <Route name="courts" component={Courts}  type="reset" />
        <Route name="location" component={Location} type="jump" />
        <Route name="schedule" component={Schedule} />
        <Route name="map" component={MapExample} />
      </Router>
    );
  }
}
