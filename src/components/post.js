import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Modal, TextInput, FlatList, Image} from 'react-native';
import firebase from 'firebase';
import {auth, db} from '../firebase/config';
import{FontAwesome} from '@expo/vector-icons'

class Post extends Component {
    constructor(props){
        super(props);
        this.state={
            likes: 0,
            myLike: false,
            showModal: false,
            comment:'',
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
            author: auth.currentUser.displayName,
            comment: this.state.comment, 
        }
        db.collection('posts').doc(this.props.postData.id).update({
            comments:firebase.firestore.FieldValue.arrayUnion(oneComment)
        })
        .then(()=> {
            this.setState({
                comment: '',
            })
        })
    }

    borrarposteo(){
        db.collection('posts').doc(this.props.postData.id).delete()
        .then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    render() {
        return (
            
            <View style={styles.container}>
                {console.log(this.props.postData)}
                <Text style={styles.autor}> {this.props.postData.data.owner}</Text>
                {<Image 
                    style={{width: '100%', height: 250, borderRadius: '10px',}}
                    source = { {uri : this.props.postData.data.photo } }
                />}
                <View style = {styles.informacion}>
                {
                this.state.myLike === false ?
                <TouchableOpacity onPress={() => this.darLike()}>
                    <Text style={styles.like}>Me Gusta</Text>
                    <FontAwesome name= "heart-o" size={24} color="black" />
                </TouchableOpacity> 
                :
                <TouchableOpacity onPress={() => this.quitarLike()}>
                    <FontAwesome name= "heart" size={24} color="red" />
                </TouchableOpacity>
                }
                <Text style={styles.like}>Likes: {this.state.likes}</Text>
                </View>

                <Text style={styles.data}>{this.props.postData.data.texto}</Text>

                
                <Text style={styles.data}>Comentarios: {this.props.postData.data.comments.length} </Text>
                
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
                        {
                            this.props.postData.data.comments.length === 0 ?
                            <Text>Aún no hay comentarios. Sé el primero en opinar. </Text> :
                            <FlatList
                            data={this.props.postData.data.comments} //el array
                            keyExtractor={(comment)=> comment.createdAt.toString()}
                            renderItem = {({item}) => <Text> {item.author}: {item.comment}</Text>}
                            />
                        }
                        <TextInput 
                        placeholder='Comentar...' 
                        style={styles.input}
                        onChangeText={text => this.setState({comment: text})}
                        />
                        {
                            this.state.comment === '' ?
                            <TouchableOpacity disabled onPress={() => this.saveComment()} style={styles.buttonDisabled}>
                            <Text style={styles.texto}>Guardar Comentario </Text>
                            </TouchableOpacity> 
                            :
                            <TouchableOpacity onPress={() => this.saveComment()} style={styles.button}>
                            <Text style={styles.texto}>Guardar Comentario </Text>
                            </TouchableOpacity> 
                        }
                    </Modal>
                </View>
                :
                    <View>
                        <TouchableOpacity onPress={() => this.showModal()}>
                        <Text style={styles.data}>Mostrar Comentarios</Text>
                        </TouchableOpacity> 
                        <Text></Text>
                    </View>
                }

                { this.props.postData.data.owner == auth.currentUser.displayName ? 
                <View>
                        <TouchableOpacity onPress={() => this.borrarposteo()}>
                        <FontAwesome name='trash' size={24} style = {styles.delete}/>
                        </TouchableOpacity> 
                    </View>
                    :
                    <Text></Text>
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
        borderColor: 'black',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
        borderWidth : 1,
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
    buttonDisabled: {
        backgroundColor: '#9c9c9c',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign:'center',
        borderRadius:4,
        borderStyle:'solid',
        borderColor:'#9c9c9c',
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
    },
    autor:{
        paddingBottom: 5,
        paddingLeft: 15,
        fontSize: 18,
        fontFamily: 'HelveticaNeue-Bold',
        paddingVertical: 10,
    },
    informacion:{
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingVertical: 5,
    },
    like:{
        fontFamily: 'HelveticaNeue-Bold',
        paddingHorizontal: 5,
        marginBottom: 5,
        fontSize: 13
    },
    data:{
        fontFamily: 'HelveticaNeue',
        paddingHorizontal: 5,
        marginBottom: 5,
    },
    delete:{
        textAlign: 'right',
        marginBottom: 5,
    }
})

export default Post;