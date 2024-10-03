import { Modal, StyleSheet } from 'react-native';
import React, { ReactElement, useState } from 'react';

type ModalManagerProps = {
  visible: boolean;
  children: ReactElement;
};

const ModalManager = (props: ModalManagerProps) => {
  const { visible, children } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(visible);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Modal visible={isModalOpen} transparent onRequestClose={closeModal}>
      {children}
    </Modal>
  );
};

export default ModalManager;

const styles = StyleSheet.create({});
