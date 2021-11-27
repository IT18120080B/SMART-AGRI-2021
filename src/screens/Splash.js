import * as React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const image = require('../images/backgroud.jpg');

const Splash = ({ navigation }) => {
  const onGetStart = async () => {
    await AsyncStorage.getItem('user').then(user => {
      if (user) {
        navigation.navigate('Dashboard');
      } else {
        navigation.navigate('Login');
      }
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <Text style={styles.text}>SMART ANALYZER FOR</Text>
        <Text style={styles.text}>AGRICULTURIST</Text>
        <Image
          style={styles.logoImage}
          source={require('../images/logo.png')}
        />
        <Text style={styles.text2}>Say hello to the future of Agiriculture </Text>
      
        <Text style={styles.text3}>Meke Decisions </Text>
        <Text style={styles.text3}>to your agricultural need</Text>
        <Text style={styles.text3}>with us</Text>
        <Text style={styles.text3}></Text>
        <TouchableOpacity style={styles.btnContainer} onPress={onGetStart}>
          <Text style={styles.btnText}>Get Started</Text>
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
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoImage: {
    alignSelf: 'center',
    width: 220,
    height: 220,
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
  },
});

export default Splash;
