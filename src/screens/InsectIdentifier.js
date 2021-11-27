/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

import ImagePicker from 'react-native-image-crop-picker';
import ModalOverlay from '../components/ModalOverlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URL = 'http://10.0.2.2:5000';

const InsectIdentifier = () => {
  const [imageDate, setImageData] = useState(null);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState(null)

  const Header = () => (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
      <Image
            source={{ uri: user?.photo }}
            style={{ width: 45, height: 45 ,marginStart:300,borderRadius:100,marginTop:20,marginBottom:-20}}></Image>
        <Text style={styles.headerText}>Insect Identifier</Text>
        <Text style={styles.headerSubText}>
          You can Identify the Insects through this
        </Text>
      </View>
    </View>
  );

  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      setUser(JSON.parse(jsonValue));
    } catch (error) {
      console.error(error);
    }
  };

  const takePhotoFromCamera = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(response => {
        uploadImageToServer(response);
      })
      .catch(err => console.log(err));
  };

  const uploadImageToServer = async data => {
    setImageData(data);
    console.log(data);
    let result;
    let formdata = new FormData();
    formdata.append('image', {
      uri: data.path,
      type: 'image/jpg',
      name: `${data.modificationDate}.jpg`,
    });
    console.log(formdata);
    await axios
      .post('http://10.0.2.2:5000/insect', formdata)
      .then(response => {
        let { data } = response;
        const parsedData = JSON.parse(data);
        // const { file } = response;
        console.log('DATA == ', data);
        console.log('DATA1 JSON Parsed', parsedData);
        setData(parsedData)
        setModal(true);
      })
      .catch(err => console.log(err));
  };

  const choosePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(response => {
        uploadImageToServer(response);
      })
      .catch(err => console.log(err));
  };

  const _renderModal = () => {
    console.log('imageDate', imageDate);
    return (
      <ModalOverlay visible={modal} onRequestClose={!modal}>
        <View
          style={{
            padding: 20,
            backgroundColor: '#fff',
            borderRadius: 8,
            width: '80%',
            alignItems: 'center',
          }}>
            
          <Text style={{ marginBottom: 20,fontWeight: 'bold',fontSize:23}}>Insect  Details</Text>
          {imageDate && (
            <Image
              source={{ uri: imageDate.path }}
              resizeMode="contain"
              style={{ width: '100%', height: 300 }}
            />
          )}
          <Text style={{ fontSize:20,marginTop:9,marginLeft:-230,fontWeight: 'bold'}}>
           Name :</Text>
           <Text style={{alignSelf: 'flex-start', fontSize:20,marginTop: -2}}>
           {data.name}</Text>

           <Text style={{ fontSize:20,marginTop:9,marginLeft: -145,fontWeight: 'bold'}}>
            How to manage :</Text>
            <Text style={{ alignSelf: 'flex-start',fontSize:20,marginTop: -2 }}>
           {data.howtoManage}</Text>
            <Text style={{ fontSize:20,marginTop:9,marginLeft: -200 ,fontWeight: 'bold'}}>
            Crop Type </Text>
            <Text style={{ alignSelf: 'flex-start',fontSize:20,marginTop:-2 }}>
            {data.cropType}</Text>
         
          <TouchableOpacity
            style={{
              backgroundColor: '#2bc058',
              width: '100%',
              borderRadius: 8,
              padding: 8,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}
            onPress={() => setModal(false)}>
            <Text style={{ color: '#fff' }}>OK</Text>
          </TouchableOpacity>
        </View>
      </ModalOverlay>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.bodyContainer}>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={takePhotoFromCamera}
          //onPress={() => navigation.navigate('Dashboard')}
        >
          <Image
            style={styles.logoImage}
            source={require('../images/cam.png')}
          />

          <Text style={styles.btnTxtt}>Take a Photo</Text>
        </TouchableOpacity>
        <Text style={styles.txt}>        OR</Text>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={choosePhoto}
          //onPress={() => navigation.navigate('Dashboard')}
        >
          <Image
            style={styles.logoImage}
            source={require('../images/upload.png')}
          />
          <Text style={styles.btnTxtt}>Upload an Image</Text>
        </TouchableOpacity>
      </View>
      {modal && _renderModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  headerContainer: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#2bc058',
    height: 150,
  },
  header: {
    marginHorizontal: 25,
  },
  headerText: {
    fontSize: 33,
    color: 'white',
    fontWeight: 'bold',
  },
  headerSubText: {
    fontSize: 18,
    color: 'white',
  },
  bodyContainer: {
    marginTop: 25,
    marginHorizontal: 25,
  },
  itemContainer: {
    marginBottom: 20,
  },
  textContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 20,
    paddingStart: 15,
    borderColor: '#ccc',
    height: 40,
    justifyContent: 'center',
  },
  txt: {
    fontSize: 24,
    color: '#000000',
    marginTop: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  btnTxtt: {
    fontSize: 23,
    color: '#FDF5F5DB',
    marginTop: 10,

    alignItems: 'center',
    fontFamily: 'Poppins',
  },

  btnContainer: {
    marginHorizontal: 20,
    backgroundColor: '#37B943',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 20,
  },
});

export default InsectIdentifier;
