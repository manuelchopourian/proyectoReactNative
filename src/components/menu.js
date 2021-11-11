import React, { Component } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { auth } from '../firebase/config'

import Home from '../screens/home'
import Register from '../screens/register'
import Login from '../screens/login';
import Profile from '../screens/profile';
import PostForm from '../screens/postForm';

const Drawer = createDrawerNavigator()
class Menu extends Component {
    constructor(){
        super();
        this.state = {
            loggedIn: false,
            dataUsuario:''
        }
    }
    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user){
            this.setState({
                loggedIn: true,
                dataUsuario: user,
             })
            }  
        })
}
    register(email, pass){
        auth.createUserWithEmailAndPassword(email, pass)
        .then((response)=> {
            this.setState({
                loggedIn:true
            });
            console.log(response)
        })
        .catch(error => {
            console.log(error),
            this.setState({
                error: error.message
            })
        })
    }
    login(email, pass){
        auth.signInWithEmailAndPassword(email, pass)
        .then((response)=> {
            console.log(response)
            this.setState({
                loggedIn:true,
                dataUsuario: response
            });
        })
        .catch(error => {
            console.log(error)
            this.setState({
                error: error.message
            })
        })
    }
    logout(){
        auth.signOut()
        .then(()=> {
            this.setState({
                loggedIn:false
            });
        })
    }
    render() {
        return (
        this.state.loggedIn == false ?
         <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name='Register' component={()=> <Register register={(email, pass) => this.register(email, pass)} error={(this.state.error)}/>}/>
                <Drawer.Screen name='Login' component={()=> <Login login={(email, pass) => this.login(email, pass)} error={(this.state.error)}/>}/> 
            </Drawer.Navigator>
        </NavigationContainer>:
         <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name='Home' component={()=> <Home />}/>
                <Drawer.Screen name='Profile' component={()=> <Profile dataUsuario={(this.state.dataUsuario)} logout={() => this.logout()}/>}/>
                <Drawer.Screen name='New Post' component={(drawerProps)=> <PostForm drawerProps={drawerProps}/>}/>
            </Drawer.Navigator>
        </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({})

export default Menu;
