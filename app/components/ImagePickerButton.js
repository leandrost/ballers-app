import React, {
  View,
  StyleSheet,
  NativeModules,
} from 'react-native';

import {
  Icon,
} from 'react-native-material-design';

import {
  MKButton,
} from 'react-native-material-kit';

import { Colors }  from '../utils/';

let options = {
  title: "Select Avatar",
  cancelButtonTitle: "Cancel",
  takePhotoButtonTitle: "Take Photo...",
  chooseFromLibraryButtonTitle: "Choose from Library...",
  cameraType: "back",
  mediaType: "photo",
  maxWidth: 1280,
  maxHeight: 720,
  aspectX: 2,
  aspectY: 1,
  allowsEditing: true,
  storageOptions: { skipBackup: true, path: "images/Ballers" },
};

const ColoredFab = new MKButton.coloredFab().build();

export default class ImagePickerButton extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      backgroundColor: Colors.LightGray,
      textColor: "#666",
    };
  }

  showPicker() {
    NativeModules.UIImagePickerManager.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) { return; }
      if (response.error) {
        console.log('UIImagePickerManager Error: ', response.error);
        return;
      }

      const source = {uri: "data:image/jpeg;base64," + response.data, isStatic: true};
      this.active();
      this.props.onSelect && this.props.onSelect(source);
    })
  }

  active() {
    this.setState({
      backgroundColor: Colors.Accent,
      textColor: "#fff",
    });
  }

  render(){
    return (
      <ColoredFab backgroundColor={this.state.backgroundColor} onPress={this.showPicker.bind(this)}>
        <Icon name="photo-camera" color={this.state.textColor} />
      </ColoredFab>
    )
  }
}
