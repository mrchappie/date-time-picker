import { StyleSheet, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ButtonStyle2 } from '../DateTimePickerComponent/UI/Button';
import { clockType } from '../DateTimePickerComponent/utils/utils';

const ITEM_HEIGHT = 40;

type HourPickerStyle2Props = {
  onChangeHour: (hour: number) => void;
  clockType: clockType;
};

const HourPickerStyle2: React.FC<HourPickerStyle2Props> = (props) => {
  const { onChangeHour, clockType } = props;
  const [selectedHour, setSelectedHour] = useState<number>(0o0);
  const [invalidHour, setInvalidHour] = useState<boolean>(false);
  const [hourFormat, setHourFormat] = useState<boolean>(false);

  useEffect(() => {
    const currentHour = new Date().getHours();
    setSelectedHour(currentHour);
    onChangeHour(currentHour);
    setHourFormat(clockType === 'AM' ? false : true);
  }, [clockType]);

  function handleSelectedHour(selectedHour: number | string, type: string) {
    // setInvalidHour(false);
    if (type === 'decrement') {
      if (+selectedHour > 0) {
        setSelectedHour((prevState) => {
          onChangeHour(prevState - 1);
          return prevState - 1;
        });
      } else {
        setSelectedHour(23);
        onChangeHour(23);
      }
    }
    if (type === 'increment') {
      if (+selectedHour < 24) {
        setSelectedHour((prevState) => {
          onChangeHour(prevState + 1);
          return prevState + 1;
        });
      } else {
        setSelectedHour(0);
        onChangeHour(0);
      }
    }
    if (type === 'change') {
      if (!isNaN(Number(selectedHour))) {
        // setInvalidHour(false);
        if (+selectedHour >= 0 || +selectedHour < 24) {
          {
            setSelectedHour(Number(selectedHour));
          }
        }
        onChangeHour(Number(selectedHour));
      } else {
        // setInvalidHour(true);
      }
    }
  }

  function formatHour(hour: number) {
    return hour > 10 ? hour : `0${hour}`;
  }

  return (
    <View style={styles.container}>
      <ButtonStyle2
        type="decrement"
        title="Decrement"
        defaultSelected
        onButtonPress={() => handleSelectedHour(selectedHour, 'decrement')}
      />
      <TextInput
        style={[
          styles.item,
          styles.selected,
          invalidHour && styles.invalidHour,
        ]}
        defaultValue={`${formatHour(selectedHour)}`}
        // onBlur={() => formatHour(selectedHour)}
        maxLength={2}
        // keyboardType="numeric"
        onChangeText={(value) => handleSelectedHour(value, 'change')}
      />
      <ButtonStyle2
        type="increment"
        title="Incremet"
        defaultSelected
        onButtonPress={() => handleSelectedHour(selectedHour, 'increment')}
      />
    </View>
  );
};

export default HourPickerStyle2;

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
  invalidHour: {
    color: 'red',
  },
});
