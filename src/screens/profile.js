import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state= {

        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}> Email: {this.props.dataUsuario.email}</Text>
                <Text style={styles.text}> Ultimo inicio de sesión: {this.props.dataUsuario.metadata.lastSignInTime} </Text>
                <Text style={styles.text}> Fecha de creación del usuario: {this.props.dataUsuario.metadata.creationTime} </Text>
                {/* <Text>{this.props.dataUsuario.userName} </Text> */}
                <TouchableOpacity onPress={() => this.props.logout()} style={styles.button}>
                    <Text style={styles.texto}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 10,
        marginTop: 20,
    },
    text:{
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        border: 1,
        borderColor:'#ccc',
        borderStyle:'solid',
        borderRadius:6,
        marginVertical:10
    },
    button:{
        backgroundColor: '#CB4335',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign:'center',
        borderRadius:4,
        borderStyle:'solid',
        borderColor:'#28a745',
        marginTop: 20,

    },
    texto:{
        color: '#fff'
    }
})

export default Profile;
