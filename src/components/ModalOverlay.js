import * as React from 'react';
import { Modal, View } from 'react-native';

const ModalOverlay = ({ visible, onRequestClose, children }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          backgroundColor: '#0a1c2e9e',
        }}>
        {children}
      </View>
    </Modal>
  );
};

export default ModalOverlay;
