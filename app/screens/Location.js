import React, {
  StyleSheet,
  Text,
  View,
  NativeModules,
  TextInput,
  TouchableHighlight,
  Picker,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import Screen from '../components/Screen';
import { T }  from '../utils/';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

let t = T("screens.newCourt");

export default class Location extends React.Component {

  search(text) {
    console.log(text);
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        const responseJSON = JSON.parse(request.responseText);
        console.log(responseJSON);
      } else {
        debugger
        console.warn("google places autocomplete: request could not be completed or has been aborted");
      }
    };
    let key = "AIzaSyCBJd-XszceGyJtRP0KhTL09CSja0Yv7fc";
    let url = "https://maps.googleapis.com/maps/api/place/autocomplete/json";
    let input = encodeURI(text);
    request.open('GET', `${url}?key=${key}&input=${input}`);
    request.send();
  }

  render(){
    let getDefaultValue = () => { return ''; }
    return (
      <Screen {...this.props}
        icon="arrow-back"
        onIconPress={Actions.newCourt}
        actions={[{ icon: "done", onPress: this.props.onSelect  }]}>

        <TextInput onChangeText={this.search}></TextInput>

        <GooglePlacesAutocomplete
          placeholder='Search'
          minLength={2}
          autoFocus={true}
          fetchDetails={true}
          onPress={this.handlePlacePress}
          getDefaultValue={getDefaultValue}
          query={{ key: 'AIzaSyCBJd-XszceGyJtRP0KhTL09CSja0Yv7fc' }}
          styles={{ description: { fontWeight: 'bold', }, predefinedPlacesDescription: { color: '#1faadb', }, }}
          currentLocationLabel="Current location"
          predefinedPlaces={[homePlace, workPlace]}
        />
      </Screen>
    );
  }
}
