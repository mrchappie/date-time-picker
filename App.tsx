import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import DatePicker from './components/date-time-picker/DateTimePickerComponent/DatePicker';
import TimePicker from './components/date-time-picker/DateTimePickerComponent/TimePicker';

export default function App() {
  const [isDatePickerVisible, setIsDatePickerVisible] =
    useState<boolean>(false);
  const [isTimePickerVisible, setIsTimePickerVisible] =
    useState<boolean>(false);
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
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
      <DatePicker
        componentName="DatePickerStyle1"
        isModalVisible={isDatePickerVisible}
        onCloseModal={() => {
          setIsDatePickerVisible(false);
        }}
      />
      <TimePicker
        componentName="TimePickerStyle1"
        isModalVisible={isTimePickerVisible}
        onCloseModal={() => {
          setIsTimePickerVisible(false);
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
