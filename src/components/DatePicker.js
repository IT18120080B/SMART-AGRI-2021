import * as React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableHighlight,
  Platform,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const DatePicker = (props) => {
  const { containerStyle, textStyle, defaultDate, isBday } = props;
  const [date, setDate] = React.useState(moment(defaultDate));
  const [show, setShow] = React.useState(false);

  const onChange = (event, selectedDate) => {
    setDate(moment(selectedDate));
  };

  const onAndroidChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(moment(selectedDate));
      props.onDateChange(moment(selectedDate));
    }
  };

  const onCancelPress = () => {
    setDate(moment(defaultDate));
    setShow(false);
  };

  const onDonePress = () => {
    props.onDateChange(date);
    setShow(false);
  };

  const renderDatePicker = () => {
    return (
      <DateTimePicker
        timeZoneOffsetInMinutes={0}
        value={new Date(date)}
        mode={'date'}
        minimumDate={
          isBday
            ? new Date(moment().subtract(100, 'years').format('YYYY-MM-DD'))
            : new Date()
        }
        maximumDate={
          isBday
            ? new Date()
            : new Date(moment().add(10, 'years').format('YYYY-MM-DD'))
        }
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        onChange={Platform.OS === 'ios' ? onChange : onAndroidChange}
      />
    );
  };

  return (
    <TouchableHighlight
      style={containerStyle}
      activeOpacity={0}
      onPress={() => setShow(true)}
    >
      <View>
        <Text style={textStyle}>
          {isBday ? date.format('YYYY MMM DD') : date.format('MMM DD')}
        </Text>
        {Platform.OS !== 'ios' && show && renderDatePicker()}
        {Platform.OS === 'ios' && (
          <Modal
            transparent={true}
            animationType={'slide'}
            visible={show}
            supportedOrientations={['portrait']}
            onRequestClose={() => setShow(false)}
          >
            <View style={{ flex: 1 }}>
              <TouchableHighlight
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  flexDirection: 'row',
                }}
                activeOpacity={1}
                visible={show}
                onPress={() => setShow(false)}
              >
                <TouchableHighlight
                  underlayColor={'#fff'}
                  style={{
                    flex: 1,
                    borderColor: '#e9e9e9',
                    borderTopWidth: 1,
                  }}
                  onPress={() => console.log('datepicker clicked!')}
                >
                  <View
                    style={{
                      backgroundColor: '#fff',
                      height: 256,
                      overflow: 'hidden',
                    }}
                  >
                    <View style={{ marginTop: 20 }}>{renderDatePicker()}</View>
                    <TouchableHighlight
                      underlayColor={'transparent'}
                      onPress={onCancelPress}
                      style={[styles.btnTxt, styles.btnCancel]}
                    >
                      <Text>Cancel</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      underlayColor={'transparent'}
                      onPress={onDonePress}
                      style={[styles.btnTxt, styles.btnDone]}
                    >
                      <Text>Done</Text>
                    </TouchableHighlight>
                  </View>
                </TouchableHighlight>
              </TouchableHighlight>
            </View>
          </Modal>
        )}
      </View>
    </TouchableHighlight>
  );
};

DatePicker.defaultProps = {
  containerStyle: {},
  textStyle: {},
  defaultDate: moment(),
  onDateChange: () => {},
};

const styles = StyleSheet.create({
  btnTxt: {
    position: 'absolute',
    top: 0,
    height: 42,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCancel: {
    left: 0,
  },
  btnDone: {
    right: 0,
  },
});

export default DatePicker;
