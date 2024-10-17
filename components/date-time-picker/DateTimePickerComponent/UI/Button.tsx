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
      style={({ pressed }) => [
        styles.button,
        { opacity: pressed ? 0.6 : defaultSelected ? 1 : 0.75 },
      ]}
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
    minWidth: 100,
    maxWidth: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  title: {
    textAlign: 'center',
    userSelect: 'none',
    color: 'white',
    fontWeight: '600',
  },
});
