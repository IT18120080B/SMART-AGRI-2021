import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
//import RNPickerSelect from 'react-native-picker-select';

import { BASE_URL } from '../config';

const Profile = ({ navigation }) => {
  const [rainfall, setRainfall] = useState('');
  const [temp, setTemp] = useState('');
  const [wetdays, setWetDays] = useState('');
  const [crop_count, setCropCount] = useState('');
  const [region, setRegion] = useState('1');
  const [month, setMonth] = useState('1');

  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const Header = () => (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Yield Prediction</Text>
        <Text style={styles.headerSubText}>
          You can predict the future Yeild of vegetables through this
        </Text>
      </View>
    </View>
  );

  const getUser = async () => {
    const user = await AsyncStorage.getItem('user');
    const { _id } = JSON.parse(user);
    const url = `${BASE_URL}/api/auth/user/${_id}`;
    console.log(url);
    await axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = async () => {
    const url = `${BASE_URL}/yield`;
    const dataObj = {
      rainfall,
      temp,
      wetdays,
      crop_count,
      region,
      month,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataObj),
      });
      const responseJson = await response.json();
      Alert.alert(
        'Predicted Value',
        `${responseJson.result}Monthly Yield Prediction per coconut  tree : ${responseJson.yield}\n\nMonthly Yield Prediction for your state : ${responseJson.yield1}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  const onLogout = async () => {
    await AsyncStorage.removeItem('user');
    navigation.navigate('Splash');
  };

  return (
    <View>
      <ScrollView>
        <View
          style={{
            padding: 10,
            width: '100%',
            backgroundColor: '#30a014',
            height: 150,
          }}
        ></View>

        <View style={{ alignItems: 'center' }}>
          {user?.photo && (
            <Image
              source={{ uri: user?.photo }}
              style={{
                width: 140,
                height: 140,
                borderRadius: 100,
                marginTop: -70,
              }}
            />
          )}
          <Text style={{ fontSize: 25, fontWeight: 'bold', padding: 10 }}>
            {user?.username ? user.username : 'username'}
          </Text>

          <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'grey' }}>
            Kandy
          </Text>
        </View>
        <View style={styles.labelContainer}>
          <Image
            source={require('../images/name.png')}
            style={{ width: 25, height: 25 }}
          ></Image>
          <Text
            style={{
              fontSize: 18,
              color: '#818181',
              fontWeight: 'bold',
              marginLeft: 10,
            }}
          >
            {user?.name ? user.name : 'Name'}
          </Text>
        </View>
        <View style={styles.labelContainer}>
          <Image
            source={require('../images/email.png')}
            style={{ width: 25, height: 25 }}
          ></Image>
          <Text
            style={{
              fontSize: 18,
              color: '#818181',
              fontWeight: 'bold',
              marginLeft: 10,
            }}
          >
            {user?.email ? user.email : 'Email'}
          </Text>
        </View>
        <View style={styles.labelContainer}>
          <Image
            source={require('../images/cake.png')}
            style={{ width: 25, height: 25 }}
          ></Image>
          <Text
            style={{
              fontSize: 18,
              color: '#818181',
              fontWeight: 'bold',
              marginLeft: 10,
            }}
          >
            {user?.dob ? new Date(user.dob).toDateString() : 'Date of Birth'}
          </Text>
        </View>
        <View style={styles.labelContainer}>
          <Image
            source={require('../images/gender.png')}
            style={{ width: 25, height: 25 }}
          ></Image>
          <Text
            style={{
              fontSize: 18,
              color: '#818181',
              fontWeight: 'bold',
              marginLeft: 10,
            }}
          >
            {user?.gender ? user.gender : 'Male'}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'center',

            width: '90%',
            padding: 20,
            paddingBottom: 22,
            borderRadius: 10,

            elevation: 15,
            marginTop: 20,
            marginBottom: 40,
            backgroundColor: '#30a014',
          }}
          onPress={onLogout}
        >
          <Text
            style={{
              fontSize: 15,
              color: '#FDF5F5DB',
              fontWeight: 'bold',
              marginLeft: 10,
            }}
          >
            LOGOUT
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
  labelContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '90%',
    padding: 20,
    paddingBottom: 22,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 20,
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
  pickerContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#FFFF',
    borderRadius: 20,
  },
  picker: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: '#FFFF',
  },
});

export default Profile;
