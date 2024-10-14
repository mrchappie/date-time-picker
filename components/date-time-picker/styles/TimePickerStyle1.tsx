import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import HourPicker from '../DateTimePickerComponent/UI/HourPicker';
import Button from '../DateTimePickerComponent/UI/Button';
import MinutesPicker from '../DateTimePickerComponent/UI/MinutesPicker';

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
  // function handleScrollReachedStart() {
  //   setExtendedHoursList((prevState) => {
  //     return [
  //       ...hours,
  //       ...prevState.slice(0, prevState.length - VISIBLE_ITEMS),
  //     ];
  //   });
  // }

  // // useEffect(() => {
  // //   console.log(extendedHoursList.length);
  // // }, [extendedHoursList]);

  // function handleScrollReachedEnd() {
  //   const newData = [...extendedHoursList, ...hours];

  //   setExtendedHoursList(newData);
  //   // if (newData.length > hours.length * 2) {
  //   // const slicedData = newData.slice(hours.length);
  //   // setExtendedHoursList(slicedData);
  //   // } else {
  //   // }
  // }

  return (
    <View style={styles.container}>
      <View style={styles.pickersContainer}>
        <HourPicker
          onChangeHour={(hour) => {
            setSelectedHour(hour);
          }}
        />
        <MinutesPicker
          onChangeMinutes={(minutes) => {
            setSelectedMinutes(minutes);
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
            onResponse(selectedHour * 3600 + selectedMinutes * 60);
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
