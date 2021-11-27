import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import FullWidthImage from 'react-native-fullwidth-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import { Picker } from '@react-native-picker/picker';

const image = require('../images/backgroud.jpg');
import { BASE_URL } from '../config';
import { color } from 'react-native-reanimated';
import DatePicker from '../components/DatePicker';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState();
  const [gender, setGender] = useState('0');
  const [location, setLocation] = useState('0');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setrePassword] = useState('');
  const [username, setUsername] = useState('');
  const [photo, setPhoto] = useState(null);

  const storeUser = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const uploadImageToServer = async (data) => {
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
      .then((response) => {
        let insect = response.data;
        // const { file } = response;
        Alert.alert('Insect Name is :', insect);
      })
      .catch((err) => console.log(err));
  };

  const onRegister = async () => {
    const url = `${BASE_URL}/api/auth/register`;
    const dataObj = {
      email,
      password,
      username,
      name,
      gender,
      location,
      dob,
      photo,
    };
    console.log('DATA: ', dataObj);
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataObj),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('Success', response);
          storeUser(response);
          Alert.alert(
            'Success!',
            'You have successfully registered! Plese login',
            [
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('Login');
                },
              },
            ],
            { cancelable: false }
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkTextInput = () => {
    if (!email.trim()) {
      alert('Please Enter Email');
      return;
    } else if (!password.trim()) {
      alert('Please Enter Password');
      return;
    } else if (!username.trim()) {
      alert('Please Enter Username');
      return;
    } else if (!name.trim()) {
      alert('Please Enter Name');
      return;
    } else if (password != repassword) {
      alert('Password Doesnt Match');
      return;
    } else if (gender == 0) {
      alert('Please select a gender');
      return;
    } else if (location == 0) {
      alert('Please select a location');
      return;
    } else {
      onRegister();
      return;
    }
  };

  const choosePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then((image) => {
        console.log(image.path);
        setPhoto(image.path);
      })
      .catch((err) => console.log(err));
  };

  const setBirthDate = (date) => {
    setDob(date);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <Text style={styles.text}>
          How you manage your crops? If don't start from now!{' '}
        </Text>

        <View style={styles.itemContainer}>
          {/** Image */}
          <TouchableOpacity
            onPress={choosePhoto}
            style={[
              styles.textContainer1,
              { flexDirection: 'row', justifyContent: 'space-around' },
            ]}
          >
            <Text>Upload photo</Text>
            {photo && (
              <Image
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 45,
                  marginVertical: 10,
                }}
                source={{ uri: photo.path }}
              />
            )}
          </TouchableOpacity>

          <TextInput
            //keyboardType='numeric'
            style={styles.textContainer}
            placeholder="Enter your Name"
            onChangeText={(name) => setName(name)}
          />
        </View>
        <View style={styles.itemContainer}>
          <TextInput
            //keyboardType='numeric'
            style={styles.textContainer}
            placeholder="Enter  Username"
            onChangeText={(username) => setUsername(username)}
          />
        </View>

        <View style={styles.itemContainer}>
          <TextInput
            //keyboardType='numeric'
            style={styles.textContainer}
            placeholder="Enter your Email"
            onChangeText={(email) => setEmail(email)}
          />
        </View>

        <View style={styles.itemContainer}>
          <DatePicker
            textStyle={[styles.textContainer, { color: '#000' }]}
            defaultDate={new Date()}
            isBday={true}
            onDateChange={setBirthDate}
          />
        </View>

        <View
          style={{
            borderRadius: 30,
            borderWidth: 1,
            borderColor: '#bdc3c7',
            overflow: 'hidden',
            marginTop: -5,
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 11,
          }}
        >
          <Picker
            selectedValue={gender}
            style={{ backgroundColor: 'white' }}
            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
          >
            <Picker.Item label="Gender" value="0" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View>

        <View
          style={{
            borderRadius: 30,
            borderWidth: 1,
            borderColor: '#bdc3c7',
            overflow: 'hidden',
            marginTop: -5,
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 11,
          }}
        >
          <Picker
            selectedValue={location}
            style={{ backgroundColor: 'white' }}
            onValueChange={(itemValue, itemIndex) => setLocation(itemValue)}
          >
            <Picker.Item label="Location" value="0" />
            <Picker.Item label="Kandy" value="Kandy" />
            <Picker.Item label="Gampaha" value="Gampaha" />
            <Picker.Item label="Colombo" value="Colombo" />
          </Picker>
        </View>

        <View style={styles.itemContainer}>
          <TextInput
            //keyboardType='numeric'
            style={styles.textContainer}
            placeholder="Enter your Pasword"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <View style={styles.itemContainer}>
          <TextInput
            //keyboardType='numeric'
            style={styles.textContainer}
            placeholder="Enter your Pasword again"
            secureTextEntry={true}
            onChangeText={(repassword) => setrePassword(repassword)}
          />
        </View>

        {/* <View style={styles.itemContainer}>
        <TextInput
            //keyboardType='numeric'
            style={styles. textContainer}
            placeholder = 'Enter your password'
            onChangeText={(val) => setRainfall(val)} />
        </View>
        <View style={styles.itemContainer}>
        <TextInput
            //keyboardType='numeric'
            style={styles. textContainer}
            placeholder = 'Confirm password'
            onChangeText={(val) => setRainfall(val)} />
        </View>
        <View style={styles.itemContainer}>
         
          <TextInput
            //keyboardType='numeric'
            style={styles. textContainer}
            placeholder = 'Location'
            onChangeText={(val) => setRainfall(val)} />
        </View> */}
        <TouchableOpacity style={styles.btnContainer} onPress={checkTextInput}>
          <Text style={styles.btnText}>Register</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: -130,
  },

  logoImage: {
    width: 300,
    height: 300,
    marginBottom: 7,
    marginLeft: 14,
    marginTop: -150,
    alignSelf: 'center',
    alignItems: 'center',
  },
  bodyContainer: {
    marginTop: 25,
    marginHorizontal: 25,
  },
  itemContainer: {
    marginBottom: 10,
  },
  itemContainer1: {
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 16,
    color: '#000',
    paddingHorizontal: 16,
    paddingVertical: 15,
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
    marginTop: 20,
    marginBottom: -120,
    marginLeft: 35,
    marginRight: 35,
  },
  textContainer: {
    marginTop: -5,
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
  textContainer1: {
    marginTop: -5,
    marginLeft: 15,
    marginBottom: 10,
    borderRadius: 20,
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

  picker: {
    marginTop: -5,
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

export default Register;
