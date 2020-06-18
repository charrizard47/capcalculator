import React, {Component} from "react";
import {
  Text,
  ScrollView,
  View,
} from 'react-native';

class Semester extends Component {

  //displays all module in this sem
  renderModule() {
  
  const data = this.props.data;
  const numOfMod = data.length;
  const moduleString = [];
  var sems = 0;
    
  for (var i=0; i<numOfMod; i++) {
    const p = data[i][0];
    if (p > sems) {
      sems = p;
    }
  }
  if (data != null || numOfMod > 1) {
    for (var j=1; j<Number(sems)+1; j++) {

      var year = Math.ceil(j / 2);
      var sem = "";

      if (j % 2 == 0) {
        sem = "2";
      } else {
        sem = "1";
      }

      var yearsem = "Year " + year + " Semester " + sem;
      moduleString.push(<Text style={{fontSize: 20, fontWeight: "bold"}}>{yearsem}</Text>)

      for (var i = 0; i < numOfMod; i++) {
        const p = data[i][0];
        if (p == j) {
          const c = data[i][1];
          const g = data[i][2];
          const string = c + ": " + g;
          moduleString.push(<Text>{string}</Text>)
        }
      }
    }
  }
  
  return (
    moduleString
      
    )
}

  render() {
    
    return (
      <View style={{padding: 10}}>
        {this.renderModule()}
      </View>
      
    )
  }
}



export default Semester;