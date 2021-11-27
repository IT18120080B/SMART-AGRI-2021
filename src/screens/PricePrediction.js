import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DatePicker from '../components/DatePicker';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import ModalOverlay from '../components/ModalOverlay';

const BASE_URL = 'http://10.0.2.2:5000';

const PricePrediction = () => {
  const [priceType, setPriceType] = useState('1');
  const [vegitable, setVegitable] = useState('1');
  const [district, setDistrict] = useState('1');
  const [month, setMonth] = useState('01');
  const [date, setDate] = useState('01');
  const [modal, setModal] = useState(false);
  const [imageDate, setImageData] = useState(null);
  
  const [data, setData] = useState(null)

  const Header = () => (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Price Prediction</Text>
        <Text style={styles.headerSubText}>
          You can predict the future price of vegetables through this
        </Text>
      </View>
    </View>
  );

  const onSubmit = async () => {
    const url = `${BASE_URL}/price`;
    const dataObj = {
      user_type: priceType,
      Dis_type: district,
      vegi_type: vegitable,
      Month_type: month,
      date_type: date,
      
    };
    console.log('Data', dataObj);

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
      console.log('Data', responseJson.price.toFixed(2));
      setData(responseJson.price.toFixed(2))
      setModal(true)
      // Alert.alert(
      //   'Success',
      //   `Prediction ${
      //     responseJson.result
      //   } and price is ${responseJson.price.toFixed(2)}`,
       
      // );
    } catch (err) {
      console.log(err);
    }
  };

  const _renderModal = () => {
   
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
          <Text style={{ marginBottom: 20,fontWeight: 'bold',fontSize:20 }}>Predicted  Carrot Price :</Text>
          <Text style={{ marginVertical: 15,fontSize:20 }}>Rs. {data}</Text>
          <Text style={{ marginBottom: 20 ,fontSize:19}}>Per KG</Text>
          {imageDate && (
            <Image
             source={require('../images/backgroud.jpg')}
              resizeMode="contain"
              style={{ width: '100%', height: 300 }}
            />
          )}

          
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
      <ScrollView>
        <View style={styles.bodyContainer}>
          <View style={styles.itemContainer}>
            <Text style={styles.bodyText}>Price Type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={priceType}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  setPriceType(itemValue)
                }>
                <Picker.Item label="Retail" value="1" />
                <Picker.Item label="Intermediate" value="2" />
              </Picker>
            </View>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.bodyText}>District</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={district}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  setDistrict(itemValue)
                }>
                <Picker.Item label="Kandy" value="1" />
                <Picker.Item label="Colombo" value="2" />
                <Picker.Item label="Kurunagala" value="3" />
              </Picker>
            </View>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.bodyText}>Vegitable</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={vegitable}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  setVegitable(itemValue)
                }>
                <Picker.Item label="Carrots" value="1" />
                <Picker.Item label="Beans" value="2" />
                <Picker.Item label="Coconut" value="3" />
              </Picker>
            </View>
          </View>

          <View style={styles.itemContainer}>
            <Text style={styles.bodyText}>Month</Text>
            <View style={styles.pickerContainer}>
              <DatePicker
                textStyle={styles.textStyle}
                defaultDate={new Date()}
                type={'month'}
                onDateChange={value => setMonth(moment(value).format('MM'))}
              />
            </View>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.bodyText}>Date</Text>
            <View style={styles.pickerContainer}>
              <DatePicker
                textStyle={styles.textStyle}
                defaultDate={new Date()}
                type={'date'}
                onDateChange={value => setDate(moment(value).format('DD'))}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{
              width: '100%',
              alignSelf: 'center',
              padding: 16,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#00a680',
              borderRadius: 8,
              marginBottom: 50,
            }}
            onPress={onSubmit}>
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>
              SUBMIT
            </Text>
            
          </TouchableOpacity>
        </View>
        {modal && _renderModal()}
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
  header: {
    marginHorizontal: 25,
  },
  textStyle: {
    fontSize: 16,
    color: '#000',
    paddingHorizontal: 16,
    paddingVertical: 15,
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
    backgroundColor: '#fff',
  },
  picker: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: '#FFFF',
  },
});

export default PricePrediction;
