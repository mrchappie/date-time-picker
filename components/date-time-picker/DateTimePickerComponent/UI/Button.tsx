import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  title: string;
  defaultSelected?: boolean;
  onButtonPress?: () => void;
};
type PropsStyle2 = {
  type: string;
  title?: string;
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

const ButtonStyle2 = (props: PropsStyle2) => {
  const { type, defaultSelected = false, onButtonPress } = props;
  function UpArrowIcon() {
    return <Icon name="arrow-up" color="white" size={10} />;
  }

  function DownArrowIcon() {
    return <Icon name="arrow-down" color="white" size={10} />;
  }

  return (
    <Pressable
      onPress={onButtonPress}
      style={({ pressed }) => [
        styles.button,
        { opacity: pressed ? 0.6 : defaultSelected ? 1 : 0.75 },
      ]}
    >
      <Text style={styles.title}>
        {type === 'decrement' ? <UpArrowIcon /> : <DownArrowIcon />}
      </Text>
    </Pressable>
  );
};

export { Button, ButtonStyle2 };

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#222',
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
