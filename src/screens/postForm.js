import React, { Component } from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity,} from 'react-native';
import {auth, db} from '../firebase/config';

class PostForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            textoPost:''
        }
    }
    submitPost(){
        db.collection('posts').add({
            owner: auth.currentUser.email,
            texto: this.state.textoPost,
            createdAt: Date.now(),
            likes: [],
            comments: []
        })
        .then(
            this.setState({
                textoPost:''
            }),

            this.props.drawerProps.navigation.navigate('Home')
        )
        .catch( e => console.log(e))
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                    placeholder='Escribi Aqui' 
                    onChangeText={text => this.setState({textoPost:text})} 
                    style={styles.input}
                    multiline
                    value={this.state.textoPost}
                    />
                <TouchableOpacity onPress={() => this.submitPost()} style={styles.button}>
                    <Text style={styles.texto}>Guardar posteo</Text>
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
    input:{
        height: 100,
        paddingVertical: 15,
        paddingHorizontal: 10,
        border: 1,
        borderColor:'#ccc',
        borderStyle:'solid',
        borderRadius:6,
        marginVertical:10
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
    alert:{
        padding: 10,
        color: 'red'
    },
    texto:{
        color: '#fff'
    }
})

export default PostForm;
