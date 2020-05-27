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
import { Header } from 'react-native/Libraries/NewAppScreen';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      period: [],
      code: [],
      grade: [],
      moduleData: [],

      //helper
      numOfMod: 0,
      numOfSem: 0,
      cap: 0,

      //input
      inputPeriod: 0,
      inputCode: "",
      inputGrade: 0,

      //saved data
      savedData: [],
    };
  }

  addSem() {
    this.setState({
      numOfSem: this.state.numOfSem + 1,
      moduleData: [this.state.period, this.state.code,
        this.state.grade, this.state.numOfSem + 1, this.state.numOfMod],
    })
  }

  addModule() {
    const newperiod = this.state.period.concat(this.state.inputPeriod);
    const newcode = this.state.code.concat(this.state.inputCode);
    const newgrade = this.state.grade.concat(this.state.inputGrade);
    var totalcap = 0;
    
    for (var i=0; i<newgrade.length; i++) {
      totalcap += Number(newgrade[i]);
    }
    console.log(totalcap);
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

  async storeData(key, item) {
    try {
      var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
      console.log(JSON.stringify(item));
      alert("data saved");
      return jsonOfItem;
    } catch (error) {
      alert("error")
    }
  }

  async retrieveData(key) {
    try {
      const retrievedItem = await AsyncStorage.getItem(key).
        then((value) => this.updateState(JSON.parse(value)));
      alert("data loaded");
    } catch (error) {
      alert("error");
      console.log(error.message);
    }
  }

  async removeData(key) {
    try {
      await AsyncStorage.removeItem(key);
      alert("remove item");
    } catch {
      alert("error");
    }
  }

  updateState(data) {
    console.log(data);
    return this.setState({
      period: data[0],
      code: data[1],
      grade: data[2],
      numOfMod: data[4],
      numOfSem: data[3],
      moduleData: data,
    })
  }

  updateModules() {
    
  }

  updateCap() {
    var totalcap = 0;
    
    for (var i=0; i<this.state.numOfMod; i++) {
      totalcap += this.state.grade[i];
      console.log(this.state.grade[i]);
    }
    const newcap = totalcap / this.state.numOfMod;
    
    this.setState({
      cap: newcap,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        

        <Text>
            Period:
        </Text>
        
        <Text>
          Semesters: {"\n"}
        </Text>

        <Button 
          onPress={
            () => this.addSem()
          }
          title="ADD SEM"
        />
        <TextInput 
          style={{height: 40, borderColor: 'black', borderWidth: 2}}
          placeholder="Semester"
          onChangeText={(text) => this.setState({inputPeriod: text})}
        />
        <TextInput 
          style={{height: 40, borderColor: 'black', borderWidth: 2}}
          placeholder="Module"
          onChangeText={(text) => this.setState({inputCode: text})}
        />
        <TextInput 
          style={{height: 40, borderColor: 'black', borderWidth: 2}}
          placeholder="Grade"
          onChangeText={(text) => this.setState({inputGrade: text})}
        />
        
        <Button 
          onPress={
            () => this.addModule()
          }
          title="ADD MODULE"
        />
        <Button 
          onPress={
            () => this.storeData("key", this.state.moduleData)
          }
          title="store data"
        />
        <Button 
          onPress={
            () => this.retrieveData("key")
          }
          title="load data"
        />
        <Button 
          onPress={
            () => this.removeData("key")
          }
          title="remove data"
        />

        <Text>
          {"CAP: " + this.state.cap.toString()}
        </Text>

        <Text>{this.state.numOfSem}</Text>
        <Text>{this.state.numOfMod}</Text>

        <Semester
          modules = {this.state.modules}
          period = {this.state.period}
          code = {this.state.code}
          grade = {this.state.grade}
          numOfSem = {this.state.numOfSem}
          numOfMod = {this.state.numOfMod}
        />
      </View>
      
    )
  }
}

function Module(props) {
  const modstring = props.code + " " + props.grade;
  return (
    <Text>
      modstring
    </Text>
    )
}

class Semester extends Component {

  //displays all module in this sem
  renderModule() {

  const moduleString = [];
  const period = this.props.period;
  const code = this.props.code;
  const grade = this.props.grade;

    for (var j=0; j<this.props.numOfSem; j++) {

      moduleString.push(<Text>Semester {(j+1).toString()}</Text>)

      for (var i = 0; i < this.props.numOfMod; i++) {
        const p = period[i] -1;
        if (p == j) {
          const c = code[i];
          const g = grade[i];
          const string = c + ": " + g;
          moduleString.push(<Text>{string}</Text>)
        }


        
      }

    }
    return (
        moduleString
      )
  }

  render() {
    return (
      this.renderModule()
    )
  }
  //allows me to add modules
}
    

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  module: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

export default Calculator;
