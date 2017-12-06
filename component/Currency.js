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
import logo from './img/background.png'
import BitcoinList from './BitcoinList'

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 === r2});

class Currency extends Component {
  constructor(props) {
    super(props);

    console.ignoredYellowBox = ["Setting a timer"];
    this.state = {
      selectedMoneyIds: [],
      active: false,
      isLoading: true,
      selected: 1,
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      menu: false,
    };
  }

  static navigationOptions = { title: 'Welcome', header: null  };

  componentDidMount() {
    this.getData()
      .then((data) => {
        this.setState({
          data:data,
          dataSource: this.state.dataSource.cloneWithRows(data),
          isLoading: false,
          selected: 1,
        })
      });
   }

   async getData() {
     const response =
     await fetch("https://api.coinmarketcap.com/v1/ticker/?limit=0", {
             method: 'GET',
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
             }
         });
     const json = await response.json();
     return json;
   }

   renderRow(record) {
   viewStyle = this.state.active ? styles.liste: styles.liste;

   return (
     <TouchableHighlight onPress={this.toggleClass.bind(this, record.rank)}>
       <View style={{width: "100%"}}>
         <View style={this.state.selected === record.rank ? styles.active: styles.liste}>
           <Image
             style={this.state.selected === record.rank ? styles.activeImage: styles.image}
             source={{uri: 'https://files.coinmarketcap.com/static/img/coins/32x32/' + record.id + '.png'}}
           />
           <Text style={this.state.selected === record.rank ? styles.activeText: styles.text}>{record.id}</Text>

         </View>
         <View style={this.state.selected === record.rank ? styles.infos: styles.null}>
           <Text style={styles.infosText}>
             Price : {record.price_usd}$
           </Text>
           <Text style={[styles.infosText, record.percent_change_24h.indexOf("-") ? styles.green: styles.red]}>
             1 day %: {record.percent_change_24h}$
           </Text>
           <Text style={[styles.infosText, record.percent_change_7d.indexOf("-") ? styles.green: styles.red]}>
             7day %: {record.percent_change_7d}$
           </Text>
         </View>
       </View>
     </TouchableHighlight>
    );
  }


    toggleClass(rank) {
      console.log("fonctionne " + rank);
      currentState = this.state.active;
    rank =  ( rank === this.state.selected ? null: rank);
      this.setState({ active: !currentState,
        dataSource: this.state.dataSource.cloneWithRows(this.state.data),
        selected: rank,
      });

      console.log(!currentState);
  };

  toggleMenu() {
    console.log("lol");
    currentState = this.state.menu;
    this.setState({menu: !currentState,});
  }

    render() {
    if (this.state.isLoading) {
      return <Spinner />;
    }

    return (
      <ImageBackground
        style={{width: "100%", height: "100%"}}
        source={require('./img/background.png')}

      >
        <View style={styles.container}>


          <View>


            <View style={styles.containerList}>

              <ListView
                style={styles.containerListeView}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
              >
              </ListView>
              <View style={this.state.menu === true ? styles.menu: styles.null}>
                <TouchableHighlight onPress={this.toggleMenu.bind(this)}>
                  <Image style={styles.iconMenu}
                    source={{uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/462023-200.png'}} />
                </TouchableHighlight>
                <Text>
                  Home
                </Text>

              </View>
              <TouchableHighlight onPress={this.toggleMenu.bind(this)}>
                <Image style={styles.iconMenu}
                  source={{uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/462023-200.png'}} />
              </TouchableHighlight>
            </View>

          </View>


        </View>
        </ImageBackground>
        );
  }
}

const styles = {
  liste: {
    height: 80,
    borderRadius: 4,
    borderBottomWidth: 1,
    borderColor: '#d6d7da',
    alignItems:'center',
  },
  backgroundImage: {
    flex: 1,
  alignSelf: 'stretch',
  width: null,
},
containerListeView: {
  width: "80%",
},
  unactive : {
  },
  green: {
    color: "green",
  },
  red: {
    color: "red",
  },
  iconMenu: {
    height: 30,
    width: 30,
    margin: 20,
  },
  active: {
    height: 80,
    borderRadius: 4,
    alignSelf: "center",
    borderColor: '#d6d7da',
  },
  infos: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
  },
  infosText: {
    marginLeft: 10,
    marginBottom: 20,
    fontSize: 14,
    fontWeight: 'bold',
  },
  null: {
    display: "none",
  },
  menu: {
    width: 100,
  },
  activeImage: {
    height: 30,
    width: 30,
    alignSelf: "center",
    marginTop: 7,
  },
  activeText: {
    marginLeft: 5,
    alignSelf : "center",
    flex: 1,
    fontSize: 19,
    fontWeight: 'bold',
  },
  image: {
    margin: 16,
    height: 20,
    width: 20,
    alignSelf: "center",
  },
  text: {
    marginLeft: -7,
    flex: 1,
    alignSelf: "center",
    fontSize: 19,
    fontWeight: 'bold',
  },
  errorTextStyle: {
    color: "#E64A19",
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  container: {
    top: 35,
    flex: 1,
    flexDirection: 'row',
    width: "100%",
  },
  containerList: {
    flex: 1,
    flexDirection: 'row',
    width: "100%",
  },
};

export default Currency;
