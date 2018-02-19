import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ListView,
  TouchableHighlight,
  TextInput
} from "react-native";

class SearchBarre extends Component {

  render() {
    let button = <View />;

      return (
        <View style={styles.containerSearch}>
          <View style={styles.searchArea}>
            <TextInput
              style={styles.search}
              editable={true}
              maxLength={40}
              onChangeText={text => this.props.obj.onChangeText(text)}
              onKeyPress={text => this.props.obj.onClearText(text)}

              placeholder="Search..."
            />
          </View>
        </View>
      );
    return <View />;
  }
}

const styles = {
  containerSearch: {
    borderWidth: 0.8,
    borderColor: "white",
    width: "90%",
    marginLeft: 15,
    marginTop: 10,
  },
  searchArea: {
    marginLeft: 30
  },
  containerListeView: {
    width: "100%"
  },
};

export default SearchBarre;
