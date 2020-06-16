import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet, Div } from "react-native";

class Module extends Component {
  constructor() {
    super();
    this.state = {
      inputperiod: "",
      inputcode: "",
      inputgrade: "",
    };
  }
  
  handleAddModule = () => {
    this.props.addNewModule([this.state.inputperiod, this.state.inputcode, this.state.inputgrade]);
  }

  handleEditModule = () => {
    this.props.editModule([this.state.inputperiod, this.state.inputcode, this.state.inputgrade])
  }

  handleDeleteModule = () => {
    this.props.deleteModule(this.state.inputcode);
  }
  

  render() {

    return (
      <View>
        <View>
          <TextInput 
            style={{height: 40, borderColor: 'black', borderWidth: 2}}
            placeholder="Semester"
            onChangeText={(text) => this.setState({inputperiod: text})}
          />
          <TextInput 
            style={{height: 40, borderColor: 'black', borderWidth: 2}}
            placeholder="Module"
            onChangeText={(text) => this.setState({inputcode: text})}
          />
          <TextInput 
            style={{height: 40, borderColor: 'black', borderWidth: 2}}
            placeholder="Grade"
            onChangeText={(text) => this.setState({inputgrade: text})}
          />
        </View>
        <View style={styles.buttonContainer}>     
          <Button 
            onPress={
              this.handleAddModule
            }
            title="add"
          />
          <Button 
            onPress={
              this.handleEditModule
            }
            title="edit"
          />
          <Button 
            onPress={
              this.handleDeleteModule
            }
            title="delete"
          />
          


        </View>
      </View>
      
    )
  }
}

function addModule() {
    return (
      <Text>asd</Text>
    )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row'
  },
  semester: {
    fontSize: 24
    
  },
  cap: {
    
    fontSize: 24
  },
});

export default Module;