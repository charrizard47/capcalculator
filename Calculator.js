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
  SafeAreaView,
  ScrollView,
  Dimensions,
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

  showPlusButton() {
    this.setState({
      showAddModule: true
    })
  }

  hidePlusButton() {
    this.setState({
      showAddModule: false
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

    this.hidePlusButton();
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
    this.hidePlusButton();
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
      this.hidePlusButton();
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
    const screenHeight = Dimensions.get('window').height;

    return (
      <View style={styles.container}>
        
        {<
          Semester 
          style={styles.semester}
          data={this.state.moduleData}
          
        />}

        <Text style={styles.cap}>
          {"CAP: " + this.state.cap.toFixed(2).toString()}
        </Text>

        <View style={styles.plusButton}>
          <Button 
          onPress = {
            () => this.showPlusButton()
          }
          title="+"
        />
        </View>
        

        {this.state.showAddModule && 
          <Module  
          addNewModule={this.addModule}
          editModule={this.editModule}
          deleteModule={this.deleteModule}
          />}
       
       <View style={styles.storageButton}>
         {<Storage 
          loadModule = {this.updateState}
          data = {this.state.moduleData}
        />}
       </View>
       


      </View>
      
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    borderTopWidth: 50,
    borderBottomWidth: 50,
    borderColor: 'darkturquoise'
    
  },
  
  cap: {
    padding: 10,
    fontSize: 24,
    position: "absolute",
    bottom: 0,
  },
  storageButton: {
    padding: 5,
    position: 'absolute',
    right: 0,

    bottom: 0,
  },
  plusButton: {
    padding: 20,
    position: 'absolute',
    right: 0,
  },

  //semester
  
  semester: {
    padding: 10,
  }

});

export default Calculator;
