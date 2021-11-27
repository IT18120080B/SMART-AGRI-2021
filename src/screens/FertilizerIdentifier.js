import React, { useState,useEffect } from 'react';
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

const FertilizerIdentifier = () => {
  const [imageDate, setImageData] = useState(null);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState(null)
 

  const Header = () => (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
      <Image
            source={{ uri: user?.photo }}
            style={{ width: 45, height: 45 ,marginStart:300,borderRadius:100,marginTop:-30,marginBottom:-20}}></Image>
        <Text style={styles.headerText}>Fertilizer Identifier</Text>
        <Text style={styles.headerSubText}>
          You can Identify the fertilizers through this
        </Text>
      </View>
    </View>
  );

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
    .post('http://10.0.2.2:5000/plant', formdata)
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
        <Text style={{ marginBottom: 20,fontSize:23}}>Plant Details :</Text>
        {imageDate && (
            <Image
              source={{ uri: imageDate.path }}
              resizeMode="contain"
              style={{ width: '100%', height: 300 }}
            />
          )}

          
        
          <Text style={{ marginVertical: 15,fontSize:17,marginTop:18,marginLeft:-193,fontWeight:'bold' }}> Plant Name : </Text>
          <Text style={{alignSelf: 'flex-start',fontSize:17,marginTop:-18}}>  {data.Name}</Text>

          <Text style={{ marginVertical: 15,fontSize:17,marginTop:8,marginLeft:-220,fontWeight:'bold' }}> Fertilizer :</Text>
          <Text style={{alignSelf: 'flex-start',fontSize:17,marginTop:-18, }}>  {data.Fertilizer}</Text>

          <Text style={{ marginVertical: 15,marginLeft:-158 ,fontSize:17,marginTop:8,fontWeight:'bold'}}> Fertilizer Amount:</Text>
          <Text style={{ alignSelf: 'flex-start',fontSize:17,marginTop:-18,}}>  {data.FertilizerAmount}</Text>
          
          <Text style={{ marginVertical: 15,fontSize:17,marginTop:8,marginLeft:-180,fontWeight:'bold'}}> Water Amount:</Text>
          <Text style={{ alignSelf: 'flex-start',fontSize:17,marginTop:-18, }}>  {data.WaterAmount}</Text>
          
          
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
        <Text style={styles.txt}> OR</Text>
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
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#2bc058',
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

export default FertilizerIdentifier;
