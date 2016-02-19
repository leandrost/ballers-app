import React, {
  StyleSheet,
  Text,
  View,
  NativeModules,
  TextInput,
  TouchableHighlight,
  Picker,
  Image,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import {
  Button,
  Icon,
  Divider,
  Avatar,
  CheckboxGroup,
} from 'react-native-material-design';

import {
  MKButton,
} from 'react-native-material-kit';


import Screen from '../components/Screen';
import { T }  from '../utils/';

let t = T("screens.newCourt");
var options = {
  title: 'Select Avatar', // specify null or empty string to remove the title
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
  customButtons: {
    'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
  },
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  videoQuality: 'high', // 'low', 'medium', or 'high'
  maxWidth: 100, // photos only
  maxHeight: 100, // photos only
  aspectX: 2, // aspectX:aspectY, the cropping image's ratio of width to height
  aspectY: 1, // aspectX:aspectY, the cropping image's ratio of width to height
  quality: 0.2, // photos only
  angle: 0, // photos only
  allowsEditing: false, // Built in functionality to resize/reposition the image
  noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
  storageOptions: { // if this key is provided, the image will get saved in the documents/pictures directory (rather than a temporary directory)
    skipBackup: true, // image will NOT be backed up to icloud
    path: 'images' // will save image at /Documents/images rather than the root
  }
};

/**
* The first arg will be the options object for customization, the second is
* your callback which sends bool: didCancel, object: response.
*
* response.didCancel will inform you if the user cancelled the process
* response.error will contain an error message, if there is one
* response.data is the base64 encoded image data (photos only)
* response.uri is the uri to the local file asset on the device (photo or video)
* response.isVertical will be true if the image is vertically oriented
* response.width & response.height give you the image dimensions
*/


export default class NewCourt extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      description: null,
      //imageSource: { uri: "http://www.recreiodajuventude.com.br/userfiles/Fotos%20site%20gerais/Quadra%20basquete.JPG" },
      imageSource: { },
      place: { },
      startAt: this.nextHour(),
      endAt: null,
    }
  }

  handleAddImagePress() {
    NativeModules.UIImagePickerManager.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('UIImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either data:
        const source = {uri: "data:image/jpeg;base64," + response.data, isStatic: true};
        // uri (on iOS)
        //const source = {uri: response.uri.replace("file://", ''), isStatic: true};
        // uri (on android)
        //const source = {uri: response.uri, isStatic: true};
        console.log(source);
        this.setState({ imageSource: source });
        }
      });
  }

  nextHour(){
    // TODO use moment to fetch the next hour
    return "00:00";
  }

  handleLocationPress() {
    Actions.location({ onPlacePress: this.setPlace.bind(this) })
  }

  setPlace(place) {
    this.setState({ place: place });
  }

  render(){
    let location = this.state.place.description || t(".location");

    return (
      <Screen {...this.props} icon="close" onIconPress={Actions.courts} actions={[{ icon: "done", onPress: this.save }]}>
          <Image style={styles.image} source={this.state.imageSource} >
          </Image>
        <View style={styles.court}>
          <TextInput style={styles.courtName} placeholder={t(".courtName")}></TextInput>
          <MKButton {...MKButton.coloredFab().toProps()} onPress={this.handleAddImagePress.bind(this)}>
            <Icon name="photo-camera"  />
          </MKButton>
        </View>

        <TouchableHighlight underlayColor="#ccc" onPress={this.handleLocationPress.bind(this)}>
          <View style={styles.section}>
            <Icon name="location-on" />
            <Text style={styles.sectionTitle} numberOfLines={2}>{ location }</Text>
          </View>
        </TouchableHighlight>

        <Divider></Divider>

        <View style={styles.scheduleSection}>
          <Icon name="schedule" />
          <Text style={styles.sectionTitle}>{t(".schedule")}</Text>
        </View>

        <View style={styles.schedules}>

	        <TouchableHighlight style={[styles.addSchedule]} underlayColor="#ccc" onPress={Actions.schedule}>
	          <View style={[styles.row]}>
	            <Icon name="add" />
	            <Text>{t(".addSchedule")}</Text>
	          </View>
	        </TouchableHighlight>
        </View>

        <Divider></Divider>
      </Screen>
    );
  }
}

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  court: {
    padding: 10,
    flexDirection: 'row',
  },
  courtName: {
    flex: 7,
    marginRight: 10,
  },
  image: {
    height: 150,
    alignSelf: 'stretch',
  },
  sectionTitle: {
    marginLeft: 10,
    flex: 1,
  },
  section: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleSection: {
    padding: 10,
    paddingBottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  schedules: {
    marginLeft: 40,
    marginRight: 10,
    paddingBottom: 10,
  },
  addSchedule: {
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    margin: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

