import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const image = require('../images/backgroud.jpg');
import { BASE_URL } from '../config';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const storeUser = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const onLogin = async () => {
    const url = `${BASE_URL}/api/auth`;
    const data = {
      email,
      password,
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        const user = await response.json();
        storeUser(user);
        navigation.navigate('Dashboard');
      } else {
        Alert.alert('Error', 'Invalid email or password');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkTextInput = () => {
    if (!email.trim()) {
      alert('Please Enter Email');
      return;
    } else if (!password.trim()) {
      alert('Please Enter Password');
      return;
    } else {
      onLogin();
      return;
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <Text style={styles.text}>Welcome to App Again</Text>

        <Image
          style={styles.logoImage}
          source={require('../images/farmm.png')}
        />

        <View style={styles.itemContainer}>
          <TextInput
            style={styles.textContainer}
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View style={styles.itemContainer}>
          <TextInput
            //keyboardType='numeric'
            style={styles.textContainer}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <TouchableOpacity style={styles.btnContainer} onPress={checkTextInput}>
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnContainer1}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 156,
    marginTop: -150,
  },

  logoImage: {
    width: 300,
    height: 300,
    marginBottom: 7,
    marginLeft: 14,
    marginTop: -170,
    alignSelf: 'center',
    alignItems: 'center',
  },
  bodyContainer: {
    marginTop: 25,
    marginHorizontal: 25,
  },
  itemContainer: {
    marginBottom: 20,
  },
  text2: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  text3: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '400',
  },
  btnContainer: {
    marginHorizontal: 20,
    backgroundColor: '#30a014',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 35,
    marginRight: 35,
  },
  textInputStyle: {
    width: '100%',
    height: 40,
    paddingHorizontal: 5,
    borderWidth: 0.5,
    marginTop: 15,
  },
  btnContainer1: {
    marginHorizontal: 20,
    backgroundColor: '#30a014',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    // marginTop: 10,
    marginBottom: -120,
    marginLeft: 35,
    marginRight: 35,
  },

  textContainer: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    borderWidth: 1,
    borderRadius: 20,
    paddingStart: 15,
    borderColor: '#ccc',
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

export default Login;
