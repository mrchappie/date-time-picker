import { StyleSheet, TextInput, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { ButtonStyle2 } from '../DateTimePickerComponent/UI/Button';

const ITEM_HEIGHT = 40;

type MinutesPickerStyle2Props = {
  onChangeMinutes: (minutes: number) => void;
};

const MinutesPickerStyle2: React.FC<MinutesPickerStyle2Props> = (props) => {
  const { onChangeMinutes } = props;
  const [selectedMinutes, setSelectedMinutes] = useState<number | string>('00');
  const [invalidMinutes, setInvalidMinutes] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
          onChangeMinutes(Number(prevState) - 1);
          return Number(prevState) - 1;
        });
      } else {
        setSelectedMinutes(59);
        onChangeMinutes(59);
      }
    }
    if (type === 'increment') {
      if (+selectedMinutes < 59) {
        setSelectedMinutes((prevState) => {
          onChangeMinutes(Number(prevState) + 1);
          return Number(prevState) + 1;
        });
      } else {
        setSelectedMinutes(0);
        onChangeMinutes(0);
      }
    }

    if (type === 'change') {
      const sanitizedValue = selectedMinutes.toString().replace(/[^0-9]/g, '');

      if (+sanitizedValue >= 0 && +sanitizedValue < 60) {
        setSelectedMinutes(Number(sanitizedValue));
        onChangeMinutes(Number(sanitizedValue));
      }
    }
    if (type === 'blur') {
      setSelectedMinutes(formatMinutes(selectedMinutes as number));
    }
  }

  const handleLongPress = (type: 'increment' | 'decrement') => {
    intervalRef.current = setInterval(() => {
      setSelectedMinutes((prevState) => {
        let newMinutes = Number(prevState);

        if (type === 'decrement') {
          newMinutes = newMinutes > 0 ? newMinutes - 1 : 59;
        } else if (type === 'increment') {
          newMinutes = newMinutes < 59 ? newMinutes + 1 : 0;
        }

        onChangeMinutes(newMinutes);
        return newMinutes;
      });
    }, 100);
  };

  function formatMinutes(minutes: number): string {
    return String(minutes > 10 ? minutes : `0${minutes}`);
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
        onButtonLongPress={() => handleLongPress('decrement')}
        onButtonRelease={() => {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }}
      />
      <TextInput
        style={[
          styles.item,
          styles.selected,
          invalidMinutes && styles.invalidMinutes,
        ]}
        value={selectedMinutes.toString()}
        maxLength={2}
        keyboardType="numeric"
        onChangeText={(value) => handleSelectedMinutes(value, 'change')}
        onBlur={() => handleSelectedMinutes(selectedMinutes, 'blur')}
      />
      <ButtonStyle2
        type="increment"
        title="Incremet"
        defaultSelected
        onButtonPress={() =>
          handleSelectedMinutes(selectedMinutes, 'increment')
        }
        onButtonLongPress={() => handleLongPress('increment')}
        onButtonRelease={() => {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }}
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
