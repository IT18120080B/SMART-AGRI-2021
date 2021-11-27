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

const coconutPrice = () => {
  const [priceType, setPriceType] = useState('1');
  const [vegitable, setVegitable] = useState('2');
  const [district, setDistrict] = useState('1');
  const [month, setMonth] = useState('01');
  const [date, setDate] = useState('01');
  const [fertilizer, setFertilizer] = useState('0');
  const [disaster, setDisaster] = useState('0');
  const [modal, setModal] = useState(false);
  const [imageDate, setImageData] = useState(null);
  const [data, setData] = useState(null)

  const Header = () => (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
          
        <Text style={styles.headerText}>Coconut Price Prediction</Text>
        <Text style={styles.headerSubText}>
          You can predict the future price of coconut through this
        </Text>
      </View>
    </View>
  );

  const onSubmit = async () => {
    const url = `${BASE_URL}/price`;
    const dataObj = {
      price_types: priceType,
      fertilizer_prices:fertilizer,
      disasters:disaster,
      districts: district,
      crop_name: vegitable,
      months: month,
      days: date,
      
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
          
          <Text style={{ marginBottom: 20,fontWeight: 'bold',fontSize:20 }}>Predicted  coconut Price :</Text>
          <Image
             source={require('../images/coconut.png')}
              resizeMode="contain"
              style={{ width: '50%', height: 100 }}
            />
          <Text style={{ marginVertical: 15,fontSize:20,fontWeight: 'bold' }}>Rs. {data}</Text>
          <Text style={{ marginBottom: 20 ,fontSize:19}}>Per Unit</Text>
          

          
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

  const setMonthDate = value => {
    setDate(moment(value).format('DD'));
    setMonth(moment(value).format('MM'));
  }

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.bodyContainer}>
        <View style={styles.itemContainer}>
            <Text style={styles.bodyText}>Crop Name</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={vegitable}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  setVegitable(itemValue)
                }>
               
                <Picker.Item label="Coconut" value="3" />
               
              </Picker>
              
            </View>
          </View>
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
            <Text style={styles.bodyText}>Fertilizer Price</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={fertilizer}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  setFertilizer(itemValue)
                }>
                <Picker.Item label="High" value="1" />
                <Picker.Item label="Low" value="0" />
                
              </Picker>
            </View>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.bodyText}>Disaster</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={disaster}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  setDisaster(itemValue)
                }>
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
                
              </Picker>
            </View>
          </View>

          <View style={styles.itemContainer}>
            <Text style={styles.bodyText}>Date</Text>
            <View style={styles.pickerContainer1}>
              <DatePicker
                textStyle={styles.textStyle}
                defaultDate={new Date()}
                minimumDate={new Date()}
                onDateChange={setMonthDate}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{
              width: '100%',
              alignSelf: 'center',
              padding: 12,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#00a680',
              borderRadius: 8,
              marginBottom: 120,
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
    paddingVertical: 15
  
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
    marginTop: 28,
    marginHorizontal: 22,
   

    
  },
  itemContainer: {
    marginBottom: 20,
  
  
    
  },
  pickerContainer: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    overflow:'hidden',
    height: 50,
    marginLeft: -12,
    marginRight: -12,

    
  },
  pickerContainer1: {
    backgroundColor: '#fff',
    borderRadius:25,
    borderColor: '#ccc',
    marginLeft: -12,
    marginRight: -12,
    borderWidth: 1,

    
  },
  picker: {
    backgroundColor: 'white',
    borderRadius: 25,
    borderColor: '#FFFF',
  },
});

export default coconutPrice;
