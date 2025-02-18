import { StyleSheet, TextInput, View } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { ButtonStyle2 } from '../DateTimePickerComponent/UI/Button';
import { clockType } from '../DateTimePickerComponent/utils/utils';

const ITEM_HEIGHT = 40;

type HourPickerStyle2Props = {
  onChangeHour: (hour: number) => void;
  clockType: clockType;
};

const clockFormats = {
  AM: {
    start: 1,
    end: 12,
  },
  PM: {
    start: 0,
    end: 23,
  },
};

const HourPickerStyle2: React.FC<HourPickerStyle2Props> = (props) => {
  const { onChangeHour, clockType } = props;
  const [selectedHour, setSelectedHour] = useState<number | string>('00');
  const [invalidHour, setInvalidHour] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // TODO - on clock type change, use the displayed time to set the selected hour
  useEffect(() => {
    const currentHour = new Date()
      .toLocaleDateString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: clockType === 'AM',
      })
      .split(',')[1];
    setSelectedHour(+currentHour.trim().split(/[:\s]+/)[0]);
    handleOnChangeHour(+currentHour.trim().split(/[:\s]+/)[0]);
  }, [clockType]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  function handleOnChangeHour(selectedHour: number) {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      onChangeHour(selectedHour);
    }, 100);
  }
  function handleSelectedHour(selectedHour: number | string, type: string) {
    // setInvalidHour(false);
    if (type === 'decrement') {
      if (+selectedHour > clockFormats[clockType].start) {
        setSelectedHour((prevState) => {
          handleOnChangeHour(Number(prevState) - 1);
          return Number(prevState) - 1;
        });
      } else {
        const hourBasedOnFormat = clockFormats[clockType].end;
        setSelectedHour(hourBasedOnFormat);
        handleOnChangeHour(hourBasedOnFormat);
      }
    }
    if (type === 'increment') {
      if (+selectedHour < clockFormats[clockType].end) {
        setSelectedHour((prevState) => {
          handleOnChangeHour(Number(prevState) + 1);
          return Number(prevState) + 1;
        });
      } else {
        setSelectedHour(clockFormats[clockType].start);
        handleOnChangeHour(clockFormats[clockType].start);
      }
    }
    if (type === 'change') {
      if (!isNaN(Number(selectedHour))) {
        // setInvalidHour(false);
        if (
          +selectedHour >= clockFormats[clockType].start ||
          +selectedHour < clockFormats[clockType].end
        ) {
          {
            setSelectedHour(Number(selectedHour));
          }
        }
        handleOnChangeHour(Number(selectedHour));
      } else {
        // setInvalidHour(true);
      }
    }
    if (type === 'change') {
      const sanitizedValue = selectedHour.toString().replace(/[^0-9]/g, '');

      if (+sanitizedValue >= 0 && +sanitizedValue < 24) {
        setSelectedHour(Number(sanitizedValue));
        onChangeHour(Number(sanitizedValue));
      }
    }
    if (type === 'blur') {
      setSelectedHour(formatHour(selectedHour as number));
    }
  }

  const handleLongPress = (type: 'increment' | 'decrement') => {
    intervalRef.current = setInterval(() => {
      setSelectedHour((prevState) => {
        let newHour = Number(prevState);

        if (type === 'decrement') {
          newHour = newHour > 0 ? newHour - 1 : 23;
        } else if (type === 'increment') {
          newHour = newHour < 23 ? newHour + 1 : 0;
        }

        onChangeHour(newHour);
        return newHour;
      });
    }, 100);
  };

  function formatHour(hour: number) {
    return hour >= 10 ? hour : `0${hour}`;
  }

  return (
    <View style={styles.container}>
      <ButtonStyle2
        type="decrement"
        title="Decrement"
        defaultSelected
        onButtonPress={() => handleSelectedHour(selectedHour, 'decrement')}
        onButtonLongPress={() => handleLongPress('increment')}
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
          invalidHour && styles.invalidHour,
        ]}
        value={selectedHour.toString()}
        maxLength={2}
        keyboardType="numeric"
        onChangeText={(value) => handleSelectedHour(value, 'change')}
        onBlur={() => handleSelectedHour(selectedHour, 'blur')}
      />
      <ButtonStyle2
        type="increment"
        title="Incremet"
        defaultSelected
        onButtonPress={() => handleSelectedHour(selectedHour, 'increment')}
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
