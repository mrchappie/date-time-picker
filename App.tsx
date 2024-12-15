import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import DatePicker from './components/date-time-picker/DateTimePickerComponent/DatePicker';
import TimePicker from './components/date-time-picker/DateTimePickerComponent/TimePicker';
import {
  formatDate,
  formatTime,
} from './components/date-time-picker/DateTimePickerComponent/utils/utils';
import IntervalPicker from './components/date-time-picker/DateTimePickerComponent/IntervalPicker';

export default function App() {
  const [isDatePickerVisible, setIsDatePickerVisible] =
    useState<boolean>(false);
  const [isTimePickerVisible, setIsTimePickerVisible] =
    useState<boolean>(false);
  const [isIntervalPickerVisible, setIsIntervalPickerVisible] =
    useState<boolean>(false);

  const [date, setDate] = useState<number>(new Date().getTime());
  const [time, setTime] = useState<number>(0);
  const [interval, setInterval] = useState<any>(0);

  useEffect(() => {
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const TIME_IN_SECONDS = hours * 3600 + minutes * 60;

    setTime(TIME_IN_SECONDS);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ color: '#fff' }}>{formatDate([date])}</Text>
      <Text style={{ color: '#fff' }}>{formatTime(time)}</Text>
      <Text style={{ color: '#fff' }}>{JSON.stringify(interval)}</Text>
      <StatusBar style="auto" />
      <Button
        title="Open Date Picker"
        onPress={() => {
          setIsDatePickerVisible(true);
        }}
      />
      <Button
        title="Open Time Picker"
        onPress={() => {
          setIsTimePickerVisible(true);
        }}
      />
      <Button
        title="Open Interval Picker"
        onPress={() => {
          setIsIntervalPickerVisible(true);
        }}
      />
      <DatePicker
        componentName="DatePickerStyle1"
        isModalVisible={isDatePickerVisible}
        onModalClose={() => {
          setIsDatePickerVisible(false);
        }}
        onResponse={(date) => {
          // setIsDatePickerVisible(false);
          // setDate(date);
          console.log(date);
        }}
        dateSelectType="range"
        defaultDateValue={date}
      />
      <TimePicker
        componentName="TimePickerStyle1"
        isModalVisible={isTimePickerVisible}
        onModalClose={() => {
          setIsTimePickerVisible(false);
        }}
        onResponse={(time) => {
          setIsTimePickerVisible(false);
          setTime(time);
        }}
      />
      <IntervalPicker
        componentName="IntervalPickerStyle1"
        isModalVisible={isIntervalPickerVisible}
        onModalClose={() => {
          setIsIntervalPickerVisible(false);
        }}
        onResponse={(interval) => {
          setInterval(interval);
          setIsIntervalPickerVisible(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
});
