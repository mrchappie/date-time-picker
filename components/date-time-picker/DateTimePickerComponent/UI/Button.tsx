import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';

type Props = {
  title: string;
  defaultSelected?: boolean;
  onButtonPress?: () => void;
};

const Button = (props: Props) => {
  const { title, defaultSelected = false, onButtonPress } = props;
  return (
    <Pressable
      onPress={onButtonPress}
      style={{ ...styles.button, opacity: !defaultSelected ? 0.75 : 1 }}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'black',
    flex: 1,
    minWidth: 80,
  },
  title: {
    textAlign: 'center',
    userSelect: 'none',
    color: 'white',
  },
});
