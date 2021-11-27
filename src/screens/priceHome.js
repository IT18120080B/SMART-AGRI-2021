
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import CropPrediction from './CropPrediction';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PricePrediction from './PricePrediction';
import InsectIdentifier from './InsectIdentifier';
import FertilizerIdentifier from './FertilizerIdentifier';
import coconutPrice from './coconutPrice';

import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URL = 'http://10.0.2.2:5000';

const priceHome = () => {
  const navigation = useNavigation();
  const Header = () => (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
      <Image
            source={{ uri: user?.photo }}
            style={{ width: 45, height: 45 ,marginStart:300,borderRadius:100}}></Image>
         
        <Text style={styles.headerText}>Price Prediction
          
          </Text>

        <Text style={styles.headerSubText}>
         Please select a crop to predict future price
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

  return (
    <View style={styles.container}>
      <Header />
      
      <View style={styles.bodyContainer}>
          

       <View style={styles.rowcontainer}>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => navigation.navigate('coconutPrice')}>
          <Image
            style={styles.icon}
            source={require('../images/coconut.png')}
          />

          <Text style={styles.btnTxtt}>Coconut</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnContainer}
          
          onPress={() => navigation.navigate('beansPrice')}>
          <Image
            style={styles.icon}
            source={require('../images/beans.png')}
          />
          <Text style={styles.btnTxtt}>Beans</Text>
        </TouchableOpacity>

        </View>
        <View style={styles.rowcontainer}>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => navigation.navigate('carrotPrice')}>
          <Image style={styles.icon} source={require('../images/carrot.png')} />

          <Text style={styles.btnTxtt}>Carrot</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => navigation.navigate('tomatoPrice')}>
          <Image style={styles.icon} source={require('../images/Tomato.png')} />
          <Text style={styles.btnTxtt}>Tomato</Text>
        </TouchableOpacity>
        </View>

        <View style={styles.rowcontainer}>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => navigation.navigate('brinjolPrice')}>
          <Image style={styles.icon} source={require('../images/brinjol.png')} />
          <Text style={styles.btnTxtt}>Brinjal</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    marginStart: 50,
    marginTop: 27,
  },
  icon: {
    alignSelf: 'flex-start',
    width: 70,
    height: 70,
    marginBottom: 60,
    marginLeft: 50,
  },
  headerText: {
    fontSize: 33,
    color: 'white',
    fontWeight: 'bold',
    marginTop:-20,
  },
  headerSubText: {
    fontSize: 18,
    color: 'white',
  },
  bodyContainer: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  itemContainer: {
    marginBottom: 30,
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
    marginTop: -50,

    alignItems: 'center',
    fontFamily: 'Poppins',
  },
  btnContainer: {
    backgroundColor: '#37B943',
    height: 160,
    width:160,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 20,
    marginVertical:-14,
    
    marginHorizontal:7,
    
  },
  rowcontainer:{

    flexDirection:'row',
    flexWrap:'wrap',
    padding:11,
  

  }
});

export default priceHome;
