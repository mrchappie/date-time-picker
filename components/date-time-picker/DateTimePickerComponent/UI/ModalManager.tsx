import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { ReactElement } from 'react';

type ModalManagerProps = {
  visible: boolean;
  children: ReactElement;
  onCloseModal: () => void;
};

const ModalManager = (props: ModalManagerProps) => {
  const { visible, children, onCloseModal } = props;

  return (
    <Modal transparent visible={visible} onRequestClose={onCloseModal}>
      <TouchableWithoutFeedback onPress={onCloseModal}>
        <View style={styles.background}></View>
      </TouchableWithoutFeedback>
      <View style={styles.insideView}>{children}</View>
    </Modal>
  );
};

export default ModalManager;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  insideView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
