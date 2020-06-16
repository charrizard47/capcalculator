import React, { Component } from "react";
import { View, StyleSheet, Button, AsyncStorage, Text} from "react-native";

class Storage extends Component {

  async storeData(key, item) {
    try {
      var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
      alert("Modules saved." );
      return jsonOfItem;
    } catch (error) {
      alert("error")
    }
  }


  handleLoadData = () => {
    this.props.loadModule(this.retrieveData("key"));
    
  }

  async retrieveData(key) {
    try {
      const retrievedItem = await AsyncStorage.getItem(key)
        .then((value) => {
          this.props.loadModule(JSON.parse(value));
        });
        alert("Modules loaded.")
      
    } catch (error) {
      alert("error");
    }
  }

  async removeData(key) {
    try {
      await AsyncStorage.removeItem(key);
      alert("All modules cleared.");
    } catch {
      alert("error");
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button 
            onPress={
              () => this.storeData("key", this.props.data)
            }
            title="save"
          />
        </View>
        <View>
          <Button 
            onPress={
              () => this.retrieveData("key")
            }
            title="load"
          />
        </View>
        <View>
          <Button 
            onPress={
              () => this.removeData("key")
            }
            title="clear"
          />
        </View>
      </View>   
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  


  
});1
export default Storage;