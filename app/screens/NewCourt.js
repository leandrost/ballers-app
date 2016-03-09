import React, {
  Image,
  NativeModules,
  Picker,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
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

import update from 'react-addons-update';


import Screen from '../components/Screen';
import ImagePickerButton from '../components/ImagePickerButton';

import { T }  from '../utils/';

let t = T("screens.newCourt");

const FlatButton = new MKButton.flatButton().build();

export default class NewCourt extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      description: null,
      imageSource: { },
      //imageSource: { uri: "http://brianaspinall.com/wp-content/uploads/2015/06/Uli%C4%8Dna-ko%C5%A1arka.jpg" },
      place: { },
      schedules: [],
      startAt: null,
      endAt: null,
    }
  }

  handleLocationPress() {
    Actions.location({ onPlacePress: this.setPlace.bind(this) });
  }

  handlePressSchedule() {
    Actions.schedule({ onSelect: this.addSchedule.bind(this) });
  }

  setImage(source) {
    this.setState({ imageSource: source });
  }

  removeImage(source) {
    this.setImage({});
  }

  setPlace(place) {
    this.setState({ place: place });
  }

  addSchedule(schedule) {
    let attr = { schedules: { $push : [schedule] } };
    let newState = update(this.state, attr);
    this.setState(newState);
    console.log(arguments);
    console.log("addSchedule: ", this.state);
  }

  renderSchedules() {
    return this.state.schedules.map(function(schedule){
      return (
        <View>
          <TouchableHighlight
            key={schedule.date}
            underlayColor="#ccc"
            onPress={this.handlePressSchedule}>
          
            <View style={ styles.section }>
              <Icon name="event" />
              <Text style={styles.sectionTitle}>
                { schedule.date.format("dddd DD MMMM YYYY") }  { schedule.startAt } - { schedule.endAt }
              </Text>
            </View>
          </TouchableHighlight>
          
          <Divider></Divider>
        </View>
      );
    });
  }

  render(){
    let location = this.state.place.description || t(".location");

    return (
      <Screen {...this.props} icon="close" onIconPress={Actions.courts} actions={[{ icon: "done", onPress: this.save }]}>

        <ScrollView>
          <Image style={styles.image} source={this.state.imageSource}>
            <FlatButton style={styles.removeImage} onPress={ this.removeImage.bind(this) }>
              <Icon name="delete" color="#fff" size={25} />
              <Text style={{ color: 'white', fontWeight: 'bold',}}>
                Remove
              </Text>
            </FlatButton>
          </Image>

          <View style={styles.court}>
            <TextInput style={styles.courtName} placeholder={t(".courtName")}></TextInput>
            <ImagePickerButton onSelect={ this.setImage.bind(this) }/>
          </View>

          <TouchableHighlight underlayColor="#ccc" onPress={this.handleLocationPress.bind(this)}>
            <View style={ styles.section }>
              <Icon name="location-on" />
              <Text style={ styles.sectionTitle } numberOfLines={2}>{ location }</Text>
            </View>
          </TouchableHighlight>

          <Divider></Divider>
          { this.renderSchedules() }

          <TouchableHighlight
            underlayColor="#ccc"
            onPress={this.handlePressSchedule.bind(this)}>

            <View style={ styles.section }>
              <Icon name="add" />
              <Text style={styles.sectionTitle}>{ t(".schedule" )}</Text>
            </View>
          </TouchableHighlight>

          <Divider></Divider>

        </ScrollView>
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
    justifyContent: 'flex-end',
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
  },
  removeImage: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "black",
    opacity: .8,
    flexDirection: 'row',
    padding: 10,
  },
});

