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
                <Text style={styles.saludo}>Hola {this.props.dataUsuario.displayName}</Text>
                <View style = {styles.informacion}>
                <Text style={styles.text}>Email: </Text> 
                <Text style = {styles.data}>{this.props.dataUsuario.email}</Text> 
                </View>
                <View style = {styles.informacion}>
                <Text style={styles.text}>Ultimo inicio de sesión: </Text>
                <Text style={styles.data}>{this.props.dataUsuario.metadata.lastSignInTime} </Text>
                </View>
                <View style = {styles.informacion}>
                <Text style={styles.text}>Fecha de creación del usuario: </Text>
                <Text style={styles.data}>{this.props.dataUsuario.metadata.creationTime} </Text>
                </View>
                <View style = {styles.informacion}>
                <Text style={styles.text}>Cantidad de posteos: </Text>
                <Text style={styles.data}>{this.state.posteos.length} </Text>
                </View>

        
                {this.state.posteos.length === 0 ? <Text style={styles.text}>Este Usuario no tiene publicaciones aún</Text> 
                :  
                <FlatList data={this.state.posteos} keyExtractor={post => post.id} renderItem={({item}) => <Post postData={item}/>} /> }
                
              
               
               
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
        paddingHorizontal: 5,
        marginTop: 10,
    },
    informacion:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'nowrap',
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginVertical:5,
    },
    text:{
        fontFamily: 'HelveticaNeue-Bold',
    },
    data:{
        fontFamily: 'HelveticaNeue',
    },
    button:{
        backgroundColor: '#CB4335',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign:'center',
        borderRadius:4,
        borderStyle:'solid',
        borderColor:'#28a745',
        marginVertical: 20,

    },
    saludo:{
        fontFamily: 'HelveticaNeue-Bold',
        fontSize: 20,
        paddingHorizontal: 5,
    },
    texto:{
        fontFamily: 'HelveticaNeue',
        color: '#fff'
    }
})

export default Profile;
