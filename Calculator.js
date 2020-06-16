import React, {
  Component
} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Input,
  TextInput,
  AsyncStorage,
} from 'react-native';
import Semester from './Semester';
import Module from './Module';
import Storage from './Storage';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {

      //mod info
      moduleData: [],

      //info
      numOfMod: 0,
      numOfSem: 0,
      cap: 0,

      //saved data
      savedData: [],

      //add module textboxes
      showAddModule: false,
    };
  }

  showAddModule() {
    this.setState({
      showAddModule: true
    })
  }

  addModule = (module) => {
    const numOfMod = this.state.moduleData.length;
    var totalcap = Number(module[2]);
    
    var newData = [];
    if (numOfMod != 0) {
      for (var i=0; i<numOfMod; i++) {
        totalcap += Number(this.state.moduleData[i][2]);
        newData.push(this.state.moduleData[i]);

      }
    }
    newData.push(module);

    const newcap = totalcap / (numOfMod+1);
    this.setState({  
      moduleData: newData,
      cap: newcap,
    })
  }

  editModule = (module) => {
    const data = this.state.moduleData;
    const numOfMod = data.length;
    var totalcap = Number(module[2]);
    
    var newData = [];
    if (numOfMod != 0) {
      for (var i=0; i<numOfMod; i++) {
        console.log(module[1]);
        if (module[1] == data[i][1]) {
          newData.push(module);
        } else {
          totalcap += Number(data[i][2]);
          newData.push(data[i]);
        }
      }
    }

    const newcap = totalcap / (numOfMod);
    this.setState({  
      moduleData: newData,
      cap: newcap,
    })
  }

  deleteModule = (code) => {
    const data = this.state.moduleData;
    const numOfMod = data.length;
    var totalcap = 0;
    var newData = [];

    if (numOfMod != 0) {
      for (var i=0; i<numOfMod; i++) {
        if (code == data[i][1]) {
          //do nothing
        } else {
          totalcap += Number(data[i][2]);
          newData.push(data[i]);
        }
      }
    }

    const newcap = totalcap / (numOfMod);
    this.setState({  
      moduleData: newData,
      cap: newcap,
    })
  }

  

  updateState = (data) => {
    //console.log(data);
    if (data != null) {
      this.setState({
        moduleData: this.state.moduleData.concat(data),
      });
      this.updateCap();
    } else {
      alert("No saved data.");
    }
  }

  updateCap() {
    data = this.state.moduleData;
    var totalcap = 0;
    
    for (var i=0; i<data.length; i++) {
      totalcap += Number(data[i][2]);
    }
    const newcap = totalcap / data.length;
    
    this.setState({
      cap: newcap,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        
        {<Semester
          data = {this.state.moduleData}
        />}

        <Text style={styles.cap}>
          {"CAP: " + this.state.cap.toString()}
        </Text>

        <Button 
          onPress = {
            () => this.showAddModule()
          }
          title="Add Module"
        />

        {this.state.showAddModule && 
          <Module  
          addNewModule={this.addModule}
          editModule={this.editModule}
          deleteModule={this.deleteModule}
          />}
       
        {<Storage style={styles.storage}
          loadModule = {this.updateState}
          data = {this.state.moduleData}
        />}



      </View>
      
    )
  }
}

const styles = StyleSheet.create({

  container: {
    borderTopWidth: 50,
    borderColor: 'darkturquoise'
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  semester: {
    fontSize: 24
    
  },
  cap: {

    fontSize: 24
  },
  storage: {
    position: "absolute",
    bottom: 0,
  }
});

export default Calculator;
