import { StyleSheet, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ButtonStyle2 } from '../DateTimePickerComponent/UI/Button';

const ITEM_HEIGHT = 40;

type MinutesPickerStyle2Props = {
  onChangeMinutes: (minutes: number) => void;
};

const MinutesPickerStyle2: React.FC<MinutesPickerStyle2Props> = (props) => {
  const { onChangeMinutes } = props;
  const [selectedMinutes, setSelectedMinutes] = useState<number>(0o0);
  const [invalidMinutes, setInvalidMinutes] = useState<boolean>(false);

  useEffect(() => {
    const currentMinutes = new Date().getMinutes();
    setSelectedMinutes(currentMinutes);
    onChangeMinutes(currentMinutes);
  }, []);

  function handleSelectedMinutes(
    selectedMinutes: number | string,
    type: string
  ) {
    // setInvalidMinutes(false);
    if (type === 'decrement') {
      if (+selectedMinutes > 0) {
        setSelectedMinutes((prevState) => {
          onChangeMinutes(prevState - 1);
          return prevState - 1;
        });
      } else {
        setSelectedMinutes(59);
        onChangeMinutes(59);
      }
    }
    if (type === 'increment') {
      if (+selectedMinutes < 59) {
        setSelectedMinutes((prevState) => {
          onChangeMinutes(prevState + 1);
          return prevState + 1;
        });
      } else {
        setSelectedMinutes(0);
        onChangeMinutes(0);
      }
    }
    if (type === 'change') {
      if (!isNaN(Number(selectedMinutes))) {
        // setInvalidMinutes(false);
        if (+selectedMinutes >= 0 || +selectedMinutes < 60) {
          {
            setSelectedMinutes(Number(selectedMinutes));
          }
        }
        onChangeMinutes(Number(selectedMinutes));
      } else {
        // setInvalidMinutes(true);
      }
    }
  }

  function formatMinutes(minutes: number) {
    return minutes > 10 ? minutes : `0${minutes}`;
  }

  return (
    <View style={styles.container}>
      <ButtonStyle2
        type="decrement"
        title="Decrement"
        defaultSelected
        onButtonPress={() =>
          handleSelectedMinutes(selectedMinutes, 'decrement')
        }
      />
      <TextInput
        style={[
          styles.item,
          styles.selected,
          invalidMinutes && styles.invalidMinutes,
        ]}
        defaultValue={`${formatMinutes(selectedMinutes)}`}
        // onBlur={() => formatMinutes(selectedMinutes)}
        maxLength={2}
        // keyboardType="numeric"
        onChangeText={(value) => handleSelectedMinutes(value, 'change')}
      />
      <ButtonStyle2
        type="increment"
        title="Incremet"
        defaultSelected
        onButtonPress={() =>
          handleSelectedMinutes(selectedMinutes, 'increment')
        }
      />
    </View>
  );
};

export default MinutesPickerStyle2;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    overflow: 'hidden',
    gap: 20,
  },
  item: {
    color: 'black',
    fontSize: 24,
    fontWeight: '900',
    paddingHorizontal: 30,
    height: ITEM_HEIGHT,
    textAlignVertical: 'center',
  },
  selected: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  invalidMinutes: {
    color: 'red',
  },
});
