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

let t = T("screens.newCourt");

export default class Location extends React.Component {

  constructor(props) {
    super(props);
  }

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
        console.warn("google places autocomplete: request could not be completed or has been aborted");
      }
    };
    let key = "AIzaSyCBJd-XszceGyJtRP0KhTL09CSja0Yv7fc";
    let url = "https://maps.googleapis.com/maps/api/place/autocomplete/json";
    let input = encodeURI(text);
    request.open('GET', `${url}?key=${key}&input=${input}`);
    request.send();
  }

  handlePlacePress (data, details){
    let callback = this.props.onPlacePress;
    if (callback) {
      callback({ description: data.description });
    }
    Actions.pop();
  }

  render(){
    let getDefaultValue = () => { return ''; }
    return (
      <Screen {...this.props}
        icon="arrow-back"
        onIconPress={Actions.pop}
      >
        <GooglePlacesAutocomplete
          placeholder={t(".searchPlace")}
          minLength={2}
          autoFocus={true}
          fetchDetails={true}
          onPress={this.handlePlacePress.bind(this)}
          getDefaultValue={getDefaultValue}
          query={{ key: 'AIzaSyCBJd-XszceGyJtRP0KhTL09CSja0Yv7fc', language: "pt-BR",  }}
          nearbyPlacesAPI="GooglePlacesSearch"
          GooglePlacesSearchQuery={{ rankby: 'distance', }}
        />
      </Screen>
    );
  }
}
