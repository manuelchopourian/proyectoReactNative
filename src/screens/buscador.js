import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import {db} from '../firebase/config'

import Post from '../components/post';

class buscador extends Component{
    constructor(props){
        super(props);
        this.state={
            busqueda : '',
            posteos: {},
            isLoaded: false
        }
    }

    onSubmit(){
        db.collection('posts').where('owner' , '==', this.state.busqueda).onSnapshot(
        docs => {
            let posts = []
            docs.forEach(doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data(),
                })
            this.setState({
                posteos: posts,
                isLoaded: true,
            })
            })
        })
        }
    

    render(){
        return (
            <View style={styles.container} >
                <TextInput 
                    keyboardType='default' 
                    placeholder='Busca un Usuario' 
                    onChangeText={text => this.setState({busqueda:text})} style={styles.input}/>

                <TouchableOpacity  style={styles.button} onPress={()=> this.onSubmit()}>
                    <Text>Buscar</Text>
                </TouchableOpacity>
            
            {this.state.posteos.length !== 0 
            ?
            <FlatList
                data={this.state.posteos}
                keyExtractor={posteo => posteo.id}
                renderItem={({item}) => <Post  postData={item} />} />
            :
            <Text>El usuario no existe o aún no tiene publicaciones</Text>
            }
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
    container:{
        paddingHorizontal: 10,
        marginTop: 20,
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
})

export default buscador;
