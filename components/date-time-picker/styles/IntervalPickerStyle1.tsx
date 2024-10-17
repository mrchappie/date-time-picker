import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import DatePicker from '../DateTimePickerComponent/DatePicker';
import Button from '../DateTimePickerComponent/UI/Button';

const IntervalPickerStyle1 = () => {
  const [isDatePickerModalOpen, setIsDatePickerModalOpen] =
    useState<boolean>(false);

  function renderItem(item: string) {
    return <Text style={styles.picker}>{item}</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.insideContainer}>
        <Text style={styles.label}>Basic Repeat</Text>
        <FlatList
          data={['Once', 'Daily', 'Mon to Fri', 'Weekend', 'Custom']}
          renderItem={({ item }) => renderItem(item)}
          horizontal
          contentContainerStyle={{ gap: 10 }}
        />
      </View>
      <View style={styles.insideContainer}>
        <Text style={styles.label}>Advanced Repeat</Text>
        <FlatList
          data={['1st of the Month', 'Last of the month', 'Custom']}
          renderItem={({ item }) => renderItem(item)}
          horizontal
          contentContainerStyle={{ gap: 10 }}
        />
      </View>
      <View style={styles.insideContainer}>
        <Text style={styles.label}>Custom Repeat</Text>
        <Button
          title="Open Calendar"
          defaultSelected
          onButtonPress={() => {
            setIsDatePickerModalOpen(true);
          }}
        />
        <DatePicker
          componentName="DatePickerStyle1"
          isModalVisible={isDatePickerModalOpen}
          onModalClose={() => {
            setIsDatePickerModalOpen(false);
          }}
          onResponse={(response) => console.log(response)}
        />
      </View>
      <View style={styles.insideContainer}>
        <Text style={styles.label}>End after num. of occurences</Text>
        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={({ item }) => renderItem(`${item}`)}
          horizontal
          contentContainerStyle={{ gap: 10 }}
        />
      </View>
    </View>
  );
};

export default IntervalPickerStyle1;

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
  insideContainer: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  picker: {
    color: 'white',
    backgroundColor: 'black',
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
    textAlignVertical: 'center',

    minWidth: 50,
  },
});
