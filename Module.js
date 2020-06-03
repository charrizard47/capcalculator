import React, { Component } from "react";
import { View, TextInput, Button } from "react-native";

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
    this.props.addNewModule(this.state.inputperiod, this.state.inputcode, this.state.inputgrade)
  }
  

  render() {

    return (
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
        
        <Button 
          onPress={
            this.handleAddModule
          }
          title="add"
        />
      </View>
    )
  }
}

export default Module;