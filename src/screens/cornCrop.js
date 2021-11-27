import React, { useState } from 'react';
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
import { Picker } from '@react-native-picker/picker';
import DatePicker from '../components/DatePicker';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import ModalOverlay from '../components/ModalOverlay';
//import RNPickerSelect from 'react-native-picker-select';


const BASE_URL = 'http://10.0.2.2:5000';

const cornCrop = () => {
  const [rainfall, setRainfall] = useState('');
  const [temp, setTemp] = useState('');
  const [wetdays, setWetDays] = useState('');
  const [crop_count, setCropCount] = useState('');
  const [region, setRegion] = useState("1");
  const [month, setMonth] = useState("1");
  const [crop_type, setCrop] = useState("4");
  const [modal, setModal] = useState(false);
  const [imageDate, setImageData] = useState(null);
  const [data, setData] = useState(null)


  const Header = () => (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Corn Yield Prediction</Text>
        <Text style={styles.headerSubText}>
          You can predict the future Yeild of corn through this
        </Text>
      </View>
    </View>
  );


  const onSubmit = async () => {
    const url = `${BASE_URL}/yield`;
    const dataObj = {
      rainfall ,
      temp,
      wetdays,
      crop_count,
      region,
      month,
      crop_type

    };  
    console.log("Data", dataObj);
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
      setData(responseJson.yield_count)
      console.log(responseJson);
      setModal(true)
      // Alert.alert(
      //   'Predicted Value',
      //   `${
      //     responseJson.result
          
      //   }Monthly Yield Prediction per coconut tree:${responseJson.yield}\n\nMonthly Yield Prediction for your state:${responseJson.yield_count}`

        
      // );
    } catch (err) {
      console.log(err);
    }
  };




  const checkTextInput = () => {
    
    if (!rainfall.trim()) {
      alert('Please Enter Rainfall');
      return;
    }else if(!temp.trim()){
      alert('Please Enter Temperature');
      return;
    }else if(!wetdays.trim()){
      alert('Please Enter Wetdays');
      return;
    }else if(!crop_count.trim()){
      alert('Please Enter Crop Count');
      return;
    }else {

      onSubmit();
      return;
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
          
          <Text style={{ marginBottom: 20,fontWeight: 'bold',fontSize:20 }}>Predicted Corn Yield :</Text>
          <Image
             source={require('../images/corn.png')}
              resizeMode="contain"
              style={{ width: '50%', height: 100 }}
            />

          
          <Text style={{ marginVertical: 15,fontSize:20,marginLeft:-4,marginTop:40 }}>Monthly Yield Prediction for Corn: </Text>
          <Text style={{ marginVertical: 15,fontSize:20, fontWeight: 'bold',marginTop:-13}}> {data} KG</Text>
         
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
            <Text style={styles.bodyText}>Crop</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={crop_type}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  setCrop(itemValue)
                }>
                <Picker.Item label="Corn" value="4" />
               
              </Picker>
            </View>
          </View>

      

      <View style={styles.itemContainer}>
          <Text style={styles.bodyText}>Region</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={region}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  setRegion(itemValue)
                }>
                <Picker.Item label="Kurunagala" value="1" />
                <Picker.Item label="Gampaha" value="2" />
                <Picker.Item label="Puttlam" value="3" />
              </Picker>
            </View>
          </View>

          
          
          <View style={styles.itemContainer}>
            <Text style={styles.bodyText}>Month</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={month}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  setMonth(itemValue)
                }>
                <Picker.Item label="Jan" value="1" />
                <Picker.Item label="Feb" value="2" />
                <Picker.Item label="Mar" value="3" />
                <Picker.Item label="Apr" value="4" />
                <Picker.Item label="May" value="5" />
                <Picker.Item label="Jun" value="6" />
                <Picker.Item label="Jul" value="7" />
                <Picker.Item label="Aug" value="8" />
                <Picker.Item label="Sept" value="9" />
                <Picker.Item label="Oct" value="10" />
                <Picker.Item label="Nov" value="11" />
                <Picker.Item label="Dec" value="12" />
              </Picker>
            </View>
          </View>

        <View style={styles.itemContainer}>
          <Text style={styles.bodyText}>Rainfall</Text>
          <TextInput
            keyboardType='numeric'
            style={styles. textContainer}
            placeholder = 'Please give Rainfall'
            onChangeText={(rainfall) => setRainfall(rainfall)} />
        </View>
        <View style={styles.itemContainer}>
        <Text style={styles.bodyText}>Wet Days</Text>
          <TextInput
            keyboardType='numeric'
            style={styles. textContainer}
            placeholder = 'Please give Wet Days '
            onChangeText={(wetdays) => setWetDays(wetdays)} />
        </View>
        <View style={styles.itemContainer}>
        <Text style={styles.bodyText}>Temperature</Text>
          <TextInput
            keyboardType='numeric'
            style={styles. textContainer}
            placeholder = 'Please give temperature '
            onChangeText={(temp) => setTemp(temp)} />
        </View>
        
        <View style={styles.itemContainer}>
        <Text style={styles.bodyText}>Hectares</Text>
          <TextInput
            keyboardType='numeric'
            style={styles. textContainer}
            placeholder = 'Please give hectares '
            onChangeText={(crop_count) => setCropCount(crop_count)} />
        </View>

         
          <TouchableOpacity
            style={{
              width: '100%',
              alignSelf: 'center',
              padding: 15,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#00a680',
              borderRadius: 8,
              marginBottom: 100,
            }}
            onPress={checkTextInput}>
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
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    overflow:'hidden',
    height: 50,
    marginLeft: -12,
    marginRight: -12,

    
    
  },
  picker: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: '#FFFF',
    paddingStart: 15,
    borderColor: '#ccc',
    
    
  },
  textContainer: {
    marginTop: 5,
    marginLeft: -12,
    marginRight: -12,
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

export default cornCrop;