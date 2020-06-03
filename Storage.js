import React, { Component } from "react";
import { View, StyleSheet, Button, AsyncStorage, Text} from "react-native";

class Storage extends Component {

  async storeData(key, item) {
    try {
      var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
      alert("data saved at" );
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
      
    } catch (error) {
      alert("error");
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

  render() {
    return(
      <View style={styles.buttonContainer}>
          <Text>{this.props.data}</Text>
          <Button 
            onPress={
              () => this.storeData("key", this.props.data)
            }
            title="save"
          />
          <Button 
            onPress={
              () => this.retrieveData("key")
            }
            title="load"
          />
          <Button 
            onPress={
              () => this.removeData("key")
            }
            title="clear"
          />
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
export default Storage;