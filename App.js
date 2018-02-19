import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView
} from "react-native";
import { StackNavigator } from "react-navigation";
import Currency from "./component/Currency";

const Navigation = StackNavigator(
  {
    Currency: { screen: Currency }
  },
  { headerMode: "screen" }
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  render() {
    return <Navigation />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
