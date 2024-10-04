import { Modal, StyleSheet, View } from 'react-native';
import React, { ReactElement, useEffect, useState } from 'react';

type ModalManagerProps = {
  visible: boolean;
  children: ReactElement;
  onCloseModal: () => void;
};

const ModalManager = (props: ModalManagerProps) => {
  const { visible, children, onCloseModal } = props;

  return (
    <Modal transparent visible={visible} onRequestClose={onCloseModal}>
      <View style={styles.insideView}>{children}</View>
    </Modal>
  );
};

export default ModalManager;

const styles = StyleSheet.create({
  insideView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
