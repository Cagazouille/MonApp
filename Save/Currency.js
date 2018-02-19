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
  ImageBackground
} from "react-native";
import Spinner from "./Spinner";
import Row from "./Row";
import logo from "./img/background.png";
import BitcoinList from "./BitcoinList";
import Search from "./Search";
import { SearchBar } from "react-native-elements";
import SearchBarre from "./SearchBarre";

var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 === r2 });

class Currency extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMoneyIds: [],
      active: false,
      isLoading: true,
      selected: 1,
      dataSource: ds.cloneWithRows(["row 1", "row 2"]),
      menu: false
    };
  }

  static navigationOptions = { title: "Welcome", header: null };

  componentDidMount() {
    this.getData().then(data => {
      this.setState({
        data: data,
        dataSource: this.state.dataSource.cloneWithRows(data),
        isLoading: false,
        selected: 1
      });
    });
  }

  async getData() {
    console.log("Requete API des DATA :");
    const response = await fetch(
      "https://api.coinmarketcap.com/v1/ticker/?limit=0",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
    const json = await response.json();
    console.log("     DONE");
    return json;
  }

  toggleMenu() {
    currentState = this.state.menu;
    this.setState({ menu: !currentState });
  }

  render() {
    if (this.state.isLoading) {
      return <Spinner />;
    }

    return (
      <ImageBackground
        style={{ width: "100%", height: "100%" }}
        source={require("./img/background.png")}
      >
        <View style={styles.container}>
            <View style={styles.containerList}>
              <Search list={this.state.dataSource} data={this.state.data} />

              <View
                style={this.state.menu === true ? styles.menu : styles.null}
              >
                <TouchableHighlight onPress={this.toggleMenu.bind(this)}>
                  <Image
                    style={styles.iconMenu}
                    source={{
                      uri:
                        "https://d30y9cdsu7xlg0.cloudfront.net/png/462023-200.png"
                    }}
                  />
                </TouchableHighlight>
                <Text>Home</Text>
              </View>

              <TouchableHighlight onPress={this.toggleMenu.bind(this)}>
                <Image
                  style={styles.iconMenu}
                  source={{
                    uri:
                      "https://d30y9cdsu7xlg0.cloudfront.net/png/462023-200.png"
                  }}
                />
              </TouchableHighlight>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = {
  iconMenu: {
    height: 30,
    width: 30,
    marginLeft: 0
  },
  null: {
    display: "none",
  },
  menu: {
    width: 100,
  },
  container: {
    top: 35,
    flexDirection: "column"
  },
  containerList: {
    flexDirection: "row",
  },
};

export default Currency;
