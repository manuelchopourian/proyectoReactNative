import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity, Text, FlatList, ActivityIndicator} from 'react-native';
import {db} from '../firebase/config'

import Post from '../components/post';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state= {
            
            posteos : []
        }
    }

    componentDidMount(){
        db.collection('posts').where('owner' , '==', this.props.dataUsuario.displayName ).onSnapshot(
        docs => {
            let posts = []
            docs.forEach(doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data()
                })
            this.setState({
                posteos: posts,

            })
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.container}>
                <Text style={styles.text}> Email: {this.props.dataUsuario.email}</Text>
                <Text style={styles.text}> {this.props.dataUsuario.displayName}</Text>
                <Text style={styles.text}> Ultimo inicio de sesión: {this.props.dataUsuario.metadata.lastSignInTime} </Text>
                <Text style={styles.text}> Fecha de creación del usuario: {this.props.dataUsuario.metadata.creationTime} </Text>
                <Text style={styles.text}> Cantidad de posteos: {this.state.posteos.length} </Text>

                  
                {this.state.posteos.length === 0 ? <Text>Este Usuario no tine publicaciones aun</Text> :  <FlatList data={this.state.posteos} keyExtractor={post => post.id} renderItem={({item}) => <Post postData={item}/>} /> }
                
              
               
               
               
               
               
                <TouchableOpacity onPress={() => this.props.logout()} style={styles.button}>
                    <Text style={styles.texto}>Cerrar sesión</Text>
                </TouchableOpacity>
                </View>

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
