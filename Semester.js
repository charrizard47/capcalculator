import React, {Component} from "react";
import {
  Text
} from 'react-native';

class Semester extends Component {

  //displays all module in this sem
  renderModule() {

  const moduleString = [];
  const period = this.props.period;
  const code = this.props.code;
  const grade = this.props.grade;
  var sems = 0;
    
  for (var i=0; i<this.props.numOfMod; i++) {
    const p = period[i];
    if (p > sems) {
      sems = p;
    }
  }
  console.log(sems+1);
  for (var j=1; j<Number(sems)+1; j++) {

    var year = Math.ceil(j / 2);
    var sem = "";

    if (j % 2 == 0) {
      sem = "2";
    } else {
      sem = "1";
    }

    var yearsem = "Year " + year + " Semester " + sem;
    moduleString.push(<Text>{yearsem}</Text>)

    for (var i = 0; i < this.props.numOfMod; i++) {
      const p = period[i];
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
}



export default Semester;