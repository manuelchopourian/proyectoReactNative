import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Camera} from 'expo-camera';
import {db, storage} from '../firebase/config';

class MyCamera extends Component{
    constructor(props){
        super(props);
        this.state = {
            permission : false, // Permisos de la camara en el dispositivo
            photo : '', // Guardar la url/uri de c/ foto.
            showCamera : true,
        }
        this.camera // Es la referencia a esta cámara (camera).
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
            .then( () => {
                this.setState({
                    permission : true,
                })
            })
            .catch( error => console.log(error) )
    }

    takePicture(){
        this.camera.takePictureAsync()
            .then( (photo) => {
                this.setState({
                    photo : photo.uri, // Guardo la ruta interna temporal a la foto en el estado
                    showCamera : false,
                })
            })
            .catch( error => console.log(error) )
    }

    savePhoto(){
        fetch(this.state.photo) // Busca la ruta temporal de la foto
            .then( res => res.blob() )
            .then( image => {
                // Guardamos la foto en storage y obetenemos la url pública.
                const ref = storage.ref(`photos/${Date.now()}.jpg`) // Creamos nombre del archivo/foto
                ref.put(image) // Método de fireBase que se encarga de guardar datos
                    .then( () => {
                        ref.getDownloadURL() // Recupero la url de la foto para verla
                            .then( (url) => {
                                this.props.onImageUpload(url);
                                this.setState({
                                    photo : '',
                                    showCamera: true,
                                })
                            // .catch( error => console.log(error) )
                            })
                    .catch( error => console.log(error) )
                    })
            })
            .catch( error => console.log(error) )
    }

    clear(){
        this.setState({
            photo : '',
            showCamera: true,
        })
    }

    render(){
        return(
            <View style = {styles.container} >
            {
                this.state.permission ?
                    this.state.showCamera == false ?
                        <React.Fragment>
                            <Image 
                                style={{width: '100%', height: 250, borderRadius: '10px',}}
                                source = { {uri : this.state.photo } }
                            />
                            <View style = {styles.buttonsContainer}>
                                <TouchableOpacity onPress={ () => this.clear()} style={styles.buttonDecline}>
                                    <Text style={styles.texto}>RECHAZAR</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ () => this.savePhoto() } style={styles.buttonAccept}>
                                    <Text style={styles.texto}>ACEPTAR</Text>
                                </TouchableOpacity>
                            </View>
                        </React.Fragment>
                    :
                        // Renderizo camara
                        <View style = {styles.container} >
                            <Camera
                                style={{width: '100%', height: 250, borderRadius: '10px',}} // Estilo
                                type = {Camera.Constants.Type.back} // Que camára permite: frontal, trasera o ambas. 
                                ref = { reference => this.camera = reference } // Indica a que cámara refiere el componente. 
                            />
                            <TouchableOpacity onPress={ () => this.takePicture() } style={styles.button}>
                                <Text style={styles.texto}>Sacar foto</Text>
                            </TouchableOpacity>
                        </View>
                :
                    // Renderizo mensaje
                    <Text style = {styles.error}>No tienes permisos para usar la cámara.</Text>
            }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    cameraBody : {
        flex: 7,
    },
    button:{
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign:'center',
        borderRadius:4,
        borderStyle:'solid',
        borderColor:'#28a745',
        marginVertical: 5,
    },
    buttonsContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    buttonAccept:{
        backgroundColor: '#28a745',
        borderRadius:4,
        paddingHorizontal: 12,
        paddingVertical: 6,
        
    },
    buttonDecline:{
        backgroundColor: '#CB4335',
        borderRadius:4,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    texto:{
        color: 'white',
    },
    error:{
        color:  '#CB4335',
        textAlign: 'center',
        fontSize: 16,
    }
})

export default MyCamera;