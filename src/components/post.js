import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Modal, TextInput, FlatList} from 'react-native';
import firebase from 'firebase';
import {auth, db} from '../firebase/config';


class Post extends Component {
    constructor(props){
        super(props);
        this.state={
            likes: 0,
            myLike: false,
            showModal: false,
            comment:''
        }
    }
    componentDidMount(){
        if(this.props.postData.data.likes){
        this.setState({
            likes: this.props.postData.data.likes.length,
            myLike: this.props.postData.data.likes.includes(auth.currentUser.email)
            })
        }
    }
    darLike(){
        db.collection('posts').doc(this.props.postData.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(
            this.setState({
               likes: this.state.likes + 1,
               myLike: true
            }),
        )
    }
    quitarLike(){
        db.collection('posts').doc(this.props.postData.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(
            this.setState({
               likes: this.state.likes - 1,
               myLike: false
            }),
        )
    }
    showModal(){
        this.setState({
            showModal: true
        })
    }
    hideModal(){
        this.setState({
            showModal: false
        })
    }
    saveComment(){
        let oneComment = {
            createdAt: Date.now(),
            author: auth.currentUser.email,
            comment: this.state.comment, 
        }
         db.collection('posts').doc(this.props.postData.id).update({
           comments:firebase.firestore.FieldValue.arrayUnion(oneComment)
        })
        .then(
            this.setState({
                comment: '',
            })
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.postData.data.texto}</Text>
                <Text>Owner: {this.props.postData.data.owner}</Text>
                {
                this.state.myLike === false ?
                <TouchableOpacity onPress={() => this.darLike()}>
                    <Text>Me Gusta</Text>
                </TouchableOpacity> 
                :
                <TouchableOpacity onPress={() => this.quitarLike()}>
                    <Text>Quitar Like</Text>
                </TouchableOpacity>
                }
                <Text>Likes: {this.state.likes}</Text>

                {
                this.state.showModal === true ?
                <View>
                    <Modal 
                    visible={this.state.showModal}
                    animationType='slide'
                    transparent={false}
                    style={styles.modalContainer}>
                        <TouchableOpacity onPress={() => this.hideModal()}>
                            <Text  style={styles.closeButton}>X</Text>
                        </TouchableOpacity> 
                        <FlatList
                         data={this.props.postData.data.comments} //el array
                        keyExtractor={(comment)=> comment.createdAt.toString()}
                        renderItem = {({item}) => <Text> {item.author}: {item.comment}</Text>}
                         />
                        <TextInput 
                        placeholder='Comentar...' 
                        style={styles.input}
                        multiline
                        onChangeText={text => this.setState({comment: text})}
                        />
                        <TouchableOpacity onPress={() => this.saveComment()} style={styles.button}>
                            <Text style={styles.texto}>Guardar Comentario </Text>
                        </TouchableOpacity> 
                    </Modal>
                </View>
                :
                    <View>
                        <TouchableOpacity onPress={() => this.showModal()}>
                        <Text>Mostrar Comentarios</Text>
                        </TouchableOpacity> 
                        <Text></Text>
                    </View>
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 10,
        marginTop: 20,
        borderColor: "#ccc",
        borderWidth: 1,
    },
    modalContainer:{
        width: '97%',
        borderRadius: 4,
        padding: 5,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,
        borderColor: 'black'
    },
    input:{
        height: 40,
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
    closeButton:{
        color: '#fff',
        padding: 5,
        backgroundColor: '#CB4335',
        alignSelf: 'flex-end',
        borderRadius: 4,
        paddingHorizontal: 8,
    },
    texto:{
        color: '#fff'
    }
})

export default Post;