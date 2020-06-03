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
      period: [],
      code: [],
      grade: [],
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

  addModule = (period, code, grade) => {

    const newperiod = this.state.period.concat(period);
    const newcode = this.state.code.concat(code);
    const newgrade = this.state.grade.concat(grade);
    var totalcap = 0;
    
    for (var i=0; i<newgrade.length; i++) {
      totalcap += Number(newgrade[i]);
    }
    const newcap = totalcap / newgrade.length;

    this.setState({  
      period: newperiod,
      code: newcode,
      grade: newgrade,
      numOfMod: this.state.numOfMod+1,
      
      moduleData: [newperiod, newcode, newgrade, this.state.numOfSem, this.state.numOfMod +1],
      cap: newcap,
    })
  }


  updateState = (data) => {
    //console.log(data);
    if (data != null) {
      this.setState({
        period: data[0],
        code: data[1],
        grade: data[2],
        numOfSem: data[3],
        numOfMod: data[4],
        moduleData: data,
      });
      this.updateCap();
    } else {
      alert("no data saved");
    }
  }

  updateCap() {
    var totalcap = 0;
    
    for (var i=0; i<this.state.numOfMod; i++) {
      totalcap += Number(this.state.grade[i]);
      console.log(totalcap);
    }
    const newcap = totalcap / this.state.numOfMod;
    
    this.setState({
      cap: newcap,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        
        {<Semester
          modules = {this.state.modules}
          period = {this.state.period}
          code = {this.state.code}
          grade = {this.state.grade}
          numOfSem = {this.state.numOfSem}
          numOfMod = {this.state.numOfMod}
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
          <Module  addNewModule={this.addModule}/>}
       
        {<Storage 
          loadModule = {this.updateState}
          data = {this.state.moduleData}
        />}



      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 50
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
});

export default Calculator;
