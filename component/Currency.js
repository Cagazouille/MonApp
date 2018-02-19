import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  LayoutAnimation,
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
      changed: false,
      active: false,
      isLoading: true,
      selected: 1,
      dataSource: ds.cloneWithRows(["row 1", "row 2"]),
      menu: false
    };
    this.handler = this.handler.bind(this);
    this.CustomLayoutLinear = {
      duration: 100,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.curveEaseInEaseOut,
      },
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

  handler() {
  this.setState({
    changed: true
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
    console.log("DONE");
    return json;
  }

  toggleMenu() {
    LayoutAnimation.configureNext(this.CustomLayoutLinear);
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

            <View
              style={this.state.menu === true ? styles.containerListOFF : styles.containerList}>
              <Search list={this.state.dataSource} data={this.state.data} handler = {this.handler}/>
            </View>

              <View
                style={this.state.menu === true ? styles.menu : styles.null}
              >
                <View style={styles.menuRight}>
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
                <View style={styles.containerMenuTitles}>
                <Text>Home</Text>
              </View>
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
    width: 100
  },
  menu: {
    width: 100,
  },
  container: {
    top: 35,
    flexDirection: "row"
  },
  containerList: {
    width: "90%",
  },
  containerListOFF: {
    width: "70%",
  },
  containerMenu: {
  },
  containerMenuTitles: {
    marginLeft: 40,
    backgroundColor: 'rgba(0,0,0, 0)',
  },
};

export default Currency;
