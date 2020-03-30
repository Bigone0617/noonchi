import React, {Component} from 'react';
import {View, ScrollView, Text, TextInput, Dimensions, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from "prop-types";

const {width, height} = Dimensions.get("window");

export default class ToDo extends Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }
    _split =(text)=> {
        var arr = text.split('&');
        var returnText = "성명 : "+arr[0]+" 직급 : "+arr[1];
        return returnText;
    }
    render(){
    const {list} = this.props;
        return(
            <View style={styles.container}>
                <View styel={styles.column}>
                    <Text style={styles.text}>{this._split(list[0])}</Text>
                </View>
            </View>
        )
    }
    
} 

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomWidth: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    column:{
        flexDirection:"row",
        alignItems: "center",
        width: width/2
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        marginRight: 20
    },
    completedCircle: {
        borderColor: "#bbb"
    },
    uncompletedCircle: {
        borderColor: "#F23657"
    },
    text: {
        fontSize: 20,
        fontWeight: "600",
        marginVertical: 20
    },
    input:{
        width: width/2,
        marginVertical: 10,
        paddingBottom: 5
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncompletedText: {
        color: "black"
    },
    actions: {
        flexDirection: "row"
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10
    }
});