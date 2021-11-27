
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
import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URL = 'http://10.0.2.2:5000';



const Home = () => {
  const navigation = useNavigation();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const Header = () => (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
      <Image
             source={{ uri: user?.photo }}
            style={{ width: 45, height: 45 ,marginStart:300,borderRadius:100}}></Image>
        <Text style={styles.headerText}>Hello {""}
          {user?.username ? user.username :'username'}
          
          </Text>

        <Text style={styles.headerSubText}>
          Let,s Learn More About Agriculture
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
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => navigation.navigate('cropHome')}>
          <Image
            style={styles.icon}
            source={require('../images/coconut.png')}
          />

          <Text style={styles.btnTxtt}>Yield Prediction</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => navigation.navigate('priceHome')}>
          <Image
            style={styles.icon}
            source={require('../images/pricing.png')}
          />
          <Text style={styles.btnTxtt}>Price Prediction</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => navigation.navigate('InsectIdentifier')}>
          <Image style={styles.icon} source={require('../images/bee.png')} />

          <Text style={styles.btnTxtt}>Insect Identifier</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => navigation.navigate('FertilizerIdentifier')}>
          <Image style={styles.icon} source={require('../images/sprout.png')} />
          <Text style={styles.btnTxtt}>Fertilizer Identifier</Text>
        </TouchableOpacity>
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
    width: 50,
    height: 50,
    marginBottom: 7,
    marginLeft: 14,
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
    marginTop: -50,

    alignItems: 'center',
    fontFamily: 'Poppins',
  },
  btnContainer: {
    backgroundColor: '#37B943',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 20,
  },
});

export default Home;
