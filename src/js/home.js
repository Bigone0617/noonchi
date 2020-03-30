import React from 'react'
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native'

export default class home extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>
                    hi!!!!
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red'
    }
})