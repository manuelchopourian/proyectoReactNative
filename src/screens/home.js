import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import { ActivityIndicator, FlatList } from 'react-native';
import {db} from '../firebase/config'

import Post from '../components/post';
import Buscador from '../components/buscador';

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            isLoaded: false,
            posteos: []
        }
    }
    componentDidMount(){
        db.collection('posts').orderBy('createdAt' , 'desc').onSnapshot(
        docs => {
            let posts = []
            docs.forEach(doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data()
                })
            this.setState({
                posteos: posts,
                isLoaded: true
            })
            })
        })
    }
    render() {
        return (
                <View>
            {
                this.state.isLoaded === false ?
                <ActivityIndicator size='large' color='green'/> 
                :
                <FlatList data={this.state.posteos} keyExtractor={post => post.id} renderItem={({item}) => <Post postData={item}/>} />
            }
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        textAlign: 'center',
        padding:10,
    },
    clickeado:{
        backgroundColor:'#ccc',
        padding: 4,
        marginBottom: 10,
        borderRadius: 4,
        fontWeight: 700,

    },
})


export default Home;
