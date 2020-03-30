import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, AsyncStorage, StatusBar,Image,KeyboardAvoidingView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {AppLoading} from 'expo';
import Home from './home';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import PersonList from './personList'
import PersonP from './person'

const {width,height} = Dimensions.get('window');

class Main extends React.Component {
  static navigationOptions = {
    title:'눈치껏 메모',
    headerStyle: {
       backgroundColor: '#96DFD8',
       height: 100
    },
    headerTintColor: "white",
    headerTitleStyle: {
      textAlign: 'center',
      fontWeight: 'bold',
      width: width - 30
    },
  };
  state = {
    loadedList : false,
    PersonList : {},
    dataList : []
  };
  componentWillMount(){
    AsyncStorage.getAllKeys((error,keys)=>{
            if(!error){
              AsyncStorage.multiGet(keys,(error,stores) =>{
                for(let n in stores){
                  this.state.dataList.push(stores[n][0]);
                }
              })
            }
          })

  }
  
  _console = () => {
    const list = this.state.dataList;
    console.log(list);
  }
 render(){
   return(
     <View style={styles.container}>
       <View style={styles.card}>
          <ScrollView contentContainerStyle={styles.toDos}>
            <PersonList
              list = {this.state.dataList}
            />
          </ScrollView>
       </View>
       <View style={styles.plus}>
         <TouchableOpacity onPress={()=> this.props.navigation.navigate("PersonPlus")}>
            <Image
              style={{width:50, height:50}}
              source={require('../img/plus.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.plus}>
         <TouchableOpacity onPress={()=> this._console()}>
           <Text>aaaa</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.plus}>
         <TouchableOpacity onPress={()=> this._deleteData()}>
           <Text>remove</Text>
          </TouchableOpacity>
        </View> */}
     </View>
   )
 }
}

class PersonPlus extends React.Component{
  static navigationOptions = {
    title:'눈치껏 메모',
    headerStyle: {
       backgroundColor: '#96DFD8',
       height: 100
    },
    headerTintColor: "white",
    headerTitleStyle: {
      textAlign: 'center',
      fontWeight: 'bold',
      width: width - 150
    },
  };
  render(){
    return(
      
      <View style={styles.container}>
        <PersonP/>
      </View>
    )
  }
}

class PersonDetail extends React.Component{
  render(){
    return(
      <View style={styles.container}>
        <Text> PersonDetail </Text>
      </View>
    )
  }
}

const AppNavigator = createStackNavigator(
  {
    Main: Main,
    PersonPlus: PersonPlus,
    Detail : PersonDetail
  },
  {
    initialRouteName: 'Main'
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#96DFD8',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height
  },
  card: {
    flex:9,
    width: width - 25,
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 30,
  },
  toDos: {
    alignItems: "center"
  },
  plus:{
    flex:1,
    width: width - 25,
    backgroundColor: 'white',
    justifyContent: "center",
    alignItems: "center"
  }
});


export default createAppContainer(AppNavigator);