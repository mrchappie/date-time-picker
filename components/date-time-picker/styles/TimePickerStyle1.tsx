import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Button } from '../DateTimePickerComponent/UI/Button';
import HourPickerStyle2 from './HourPickerStyle2';
import MinutesPickerStyle2 from './MinutesPickerStyle2';
import AmPmToggleStyle1 from './AmPmToggleStyle1';
import { clockType } from '../DateTimePickerComponent/utils/utils';

type TimePickerStyle1Props = {
  visible?: boolean;
  onResponse: (time: number) => void;
};

const ITEM_HEIGHT = 40;

const TimePickerStyle1: React.FC<TimePickerStyle1Props> = ({
  visible,
  onResponse,
}) => {
  const [selectedHour, setSelectedHour] = useState<number>(0);
  const [selectedMinutes, setSelectedMinutes] = useState<number>(0);
  const [clockType, setClockType] = useState<clockType>('AM');

  return (
    <View style={styles.container}>
      <View style={styles.pickersContainer}>
        <HourPickerStyle2
          clockType={clockType}
          onChangeHour={(hour) => {
            setSelectedHour(hour);
          }}
        />
        <MinutesPickerStyle2
          onChangeMinutes={(minutes) => {
            setSelectedMinutes(minutes);
          }}
        />
        <AmPmToggleStyle1
          clockType={clockType}
          onClockTypeChange={(value) => {
            setClockType(value);
          }}
        />
      </View>
      <View style={styles.timeDisplay}>
        <Text style={styles.selectedTime}>
          {selectedHour < 10 ? `0${selectedHour}` : selectedHour}:{' '}
          {selectedMinutes < 10 ? `0${selectedMinutes}` : selectedMinutes}
        </Text>
        <Button
          title="Set Time"
          defaultSelected
          onButtonPress={() => {
            const SELECTED_TIME_IN_MILLISECONDS =
              (selectedHour * 3600 + selectedMinutes * 60) * 1000;
            onResponse(SELECTED_TIME_IN_MILLISECONDS);
          }}
        />
      </View>
    </View>
  );
};

export default TimePickerStyle1;

const styles = StyleSheet.create({
  container: {
    width: 350,
    gap: 20,
    padding: 20,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  pickersContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  timeDisplay: {
    flexDirection: 'row',
    gap: 20,
  },
  selectedTime: {
    fontSize: 30,
    fontWeight: '900',
  },
  item: {
    color: 'black',
    fontSize: 24,
    fontWeight: '900',
    paddingHorizontal: 20,
    height: ITEM_HEIGHT,
    textAlignVertical: 'center',
  },
  selected: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});
