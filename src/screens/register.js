import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput, Text} from 'react-native';


class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password: ''
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                    keyboardType='email-address' 
                    placeholder='Email' 
                    onChangeText={text => this.setState({email:text})} style={styles.input}/>
                <TextInput 
                    keyboardType='default' 
                    placeholder='User Name' 
                    onChangeText={text => this.setState({username:text})} style={styles.input}/>
                <TextInput 
                    placeholder='Password' 
                    secureTextEntry={true}
                    onChangeText={text => this.setState({password:text})} style={styles.input}/>
                <Text style={styles.alert}>{this.props.error}</Text>
                <TouchableOpacity onPress={() => this.props.register(this.state.email, this.state.password)} style={styles.button}>
                    <Text style={styles.texto}>Register</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 10,
        marginTop: 20,
    },
    input:{
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        border: 1,
        borderColor:'#ccc',
        borderStyle:'solid',
        borderRadius:6,
        marginVertical:10
    },
    alert:{
        padding: 10,
        color: 'red'
    },
    button:{
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign:'center',
        borderRadius:4,
        borderStyle:'solid',
        borderColor:'#28a745',
    },
    texto:{
        color: '#fff'
    }
})

export default Register;
