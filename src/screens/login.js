import React, { Component } from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, Text} from 'react-native';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password: '',
            userName:''
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
                    placeholder='Contraseña' 
                    secureTextEntry={true}
                    onChangeText={text => this.setState({password:text})} style={styles.input}/>
                <Text style={styles.alert}>{this.props.error}</Text>
                
                {
                    this.state.email === '' || this.state.password === ''  ?
                    <TouchableOpacity disabled onPress={() => this.props.login(this.state.email, this.state.password)} style={styles.buttonDisabled}>
                    <Text style={styles.texto}>Iniciar sesión</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => this.props.login(this.state.email, this.state.password)} style={styles.button}>
                    <Text style={styles.texto}>Iniciar sesión</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        marginTop: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        padding: 3,
        borderRadius: 10,
        backgroundColor: "#E6E1E1"
        
    },
    input:{
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginVertical: 10,
    },
    button:{
        backgroundColor: '#28a745',
        paddingHorizontal: 6,
        paddingVertical: 6,
        textAlign:'center',
        borderRadius: 4,
        borderStyle: 'solid',
        borderColor: '#28a745',
    },
    buttonDisabled: {
        backgroundColor: '#9c9c9c',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderStyle: 'solid',
        borderColor: '#9c9c9c',
    },
    alert:{
        padding: 10,
        color: 'red'
    },
    texto:{
        color: '#fff'
    }
})

export default Login;
