import React, {
  View,
  StyleSheet,
  NativeModules,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons'

import { MKButton, } from 'react-native-material-kit';

import { Colors }  from '../utils/';
import { T }  from '../utils/';

const UIImagePickerManager = NativeModules.UIImagePickerManager;
const ColoredFab = new MKButton.coloredFab().build();

let t = T("components.imagePickerButton");

export default class ImagePickerButton extends React.Component {

  constructor(props){
    super(props);
    this.options = {
      title: t(".title"),
      cancelButtonTitle: t("cancel"),
      takePhotoButtonTitle: t(".takePhoto"),
      chooseFromLibraryButtonTitle: t(".chooseFromLibrary"),
      cameraType: "back",
      mediaType: "photo",
      maxWidth: 1280,
      maxHeight: 720,
      aspectX: 2,
      aspectY: 1,
      allowsEditing: true,
      storageOptions: { skipBackup: true, path: "images/Ballers" },
    };
  }

  showPicker() {
    UIImagePickerManager.showImagePicker(this.options, (response) => {
      if (response.didCancel) { return; }
      if (response.error) {
        console.log('UIImagePickerManager Error: ', response.error);
        return;
      }
      this.fireSelectEvent(response.data);
    })
  }

  fireSelectEvent(data) {
    const source = {
      uri: "data:image/jpeg;base64," + data,
      isStatic: true,
    };
    this.props.onSelect && this.props.onSelect(source);
  }

  render(){
    return (
      <ColoredFab onPress={this.showPicker.bind(this)}>
        <Icon name="photo-camera" color={ Colors.White } size={30} />
      </ColoredFab>
    );
  }
}
