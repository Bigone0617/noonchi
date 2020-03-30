import React from 'react';
import {View, ScrollView, Text, TextInput, Dimensions, StyleSheet, Button, KeyboardAvoidingView, FlatList, AsyncStorage, Alert} from 'react-native';


const {width, height} = Dimensions.get('window');
const Id = 0;
const personInform=[
    {
        Id : "",
        name : "",
        rank : "",
        data : [
            {
                key: 0, 
                title:"title", 
                subTitle: "sub-title"
            },
        ]
    }
]
export default class person extends React.Component{
     constructor(props){
         super(props);
         this.state = {
            count : 1,
            refreshing : false
        }
    }
    _handleName = (text) => {
        personInform[Id].name = text
        this.personName = personInform[Id].name;
    }
    _handleRank = (text) => {
        personInform[Id].rank = text
        this.personRank = personInform[Id].rank;
    }
    _addTest = () => {
        const {data} = personInform[Id];
        data.push({
            key: this.state.count++,
            title: "title",
            subTitle: "subTitle"
        });
        this._refreshingList()
        this.setState({
            refreshing: false
        })
        console.log(this);
    }
    _refreshingList = () => {
        this.setState({
            refreshing: true,
            data: personInform[Id].data,
            page: 1
        }, )
    }
    _saveButton = async() => {
        personInform[Id].Id = this.personName+"&"+this.personRank;
        let data = JSON.stringify(personInform[Id]);
        let dataKey = personInform[Id].Id;
        if(this.personName.length != 0 && this.personRank.length != 0){
            try{
                await AsyncStorage.setItem(dataKey, data);
            }catch(error){
                console.log("Can't Save!!!!!!!!!!!");
            }
        }else{
            Alert.alert(
                '경고!',
                '이름 혹은 계급이 입력 안됐습니다!',
                [
                    {
                        text: '확인',
                        onPress : () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    }
                ],
                {cancelable: false}
            );
        }
        
       
    }
    _callData = async() => {
        let dataKey = personInform[Id].Id;
        try{
            const value = await AsyncStorage.getItem(dataKey);
            if(value !== null){
                console.log(value);
            }
        }catch(error){
            console.log("Can't Load!!!!!!!!!!!!!");
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={100}>
                <View style={styles.nameContainer}>
                    <TextInput 
                        style={styles.nameInput} 
                        placeholder="홍길동"
                        onChangeText = {this._handleName}    
                    />
                    <TextInput 
                        style={styles.rankInput} 
                        placeholder="부장"
                        onChangeText = {this._handleRank} 
                    />
                </View>
                <View style={styles.ectContainer}>
                        <ScrollView contentContainerStyle={styles.inputList}>
                            <FlatList
                                data = {personInform[Id].data}
                                renderItem={({item, index}) =>  {
                                    return (
                                        <View style={styles.inputCont}>
                                            <TextInput
                                                style={styles.etcInput} 
                                                placeholder="커피"
                                                onChangeText={text => { 
                                                        let {data} = personInform[Id];
                                                        data[index].title = text;
                                                        this.setState({
                                                            data
                                                        });
                                                    }
                                                }
                                            />
                                            <TextInput 
                                                style={styles.etcSubInput} 
                                                multiline={true}
                                                placeholder="따뜻한 아메리카노 샷 추가"
                                                onChangeText={text => {
                                                        let {data} = personInform[Id];
                                                        data[index].subTitle = text;
                                                        this.setState({
                                                            data
                                                        });
                                                    }
                                                }
                                            />
                                        </View>
                                    )
                                    }
                                }
                            refreshing={this.state.refreshing}
                            onRefresh={this._refreshingList}
                            />
                            <Button
                                title="list늘리기"
                                onPress={this._addTest}
                            />
                        </ScrollView>
                </View>
                <View style={styles.save}>
                    <Button
                        title="저장"
                        onPress={this._saveButton}
                    />
                </View>
                <View style={styles.save}>
                    <Button
                        title="불러오기"
                        onPress={this._callData}
                    />
                </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    nameContainer:{
        flex: 1.5,
        backgroundColor:"white",
        width: width - 25,
        justifyContent:"center",
        flexDirection: "row",
        alignItems:"center",
        marginTop: 30,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    save:{
        flex: 1,
        width: width -25,
        backgroundColor: "black"
    },
    inputList:{
    },
    ectContainer:{
        flex: 9,
        width: width - 25,
        backgroundColor:"white",
        justifyContent:"center",
        flexDirection: "row",
        alignItems: "center"
    },
    nameInput:{
        width: 120,
        height: 70,
        marginRight: 30,
        borderRadius: 10,
        borderColor: "#96DFD8",
        borderWidth: 3,
        fontWeight: "600",
        fontSize: 30,
        marginVertical: 20,
        alignSelf:"center"
    },
    rankInput:{
        width: 150,
        height: 70,
        borderRadius: 10,
        borderColor: "#96DFD8",
        borderWidth: 3,
        fontWeight: "600",
        fontSize: 30,
        marginVertical: 20
    },
    etcInput:{
        width: 100,
        height: 50,
        marginRight: 30,
        borderRadius: 10,
        borderColor: "#96DFD8",
        borderWidth: 3,
        fontWeight: "600",
        fontSize: 15,
        marginVertical: 20,
        alignSelf:"center"
    },
    etcSubInput:{
        width: 230,
        height: 50,
        borderRadius: 10,
        borderColor: "#96DFD8",
        borderWidth: 3,
        fontWeight: "600",
        fontSize: 15,
        marginVertical: 20,
        alignSelf:"center",
    },
    inputCont:{
        width: width -25,
        flexDirection:"row"
    }
})