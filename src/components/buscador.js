import { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

class buscador extends Component{
    constructor(props){
        super(props);
        this.state={
            busqueda : '',
            posteos: '',
            isLoaded: false
        }
    }

    componentDidMount(){
        /*db.collection('posts').where(('owner' , '==', `${this.state.busqueda}`).onSnapshot(
        docs => {
            let posts = []
            docs.forEach(doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data()
                })
            this.setState({
                posteos: posts,
                isLoaded: true,
            })
            })
        }*/
    }

    render(){
        return (
            <View>
                <TextInput 
                    keyboardType='default' 
                    placeholder='Buscar' 
                    onChangeText={text => this.setState({busqueda:text})} style={styles.input}/>
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
})

export default buscador;
