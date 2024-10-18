import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import DatePicker from '../DateTimePickerComponent/DatePicker';
import Button from '../DateTimePickerComponent/UI/Button';

const basicRepeatOptions = [
  { repeatValue: 'Once' },
  { repeatValue: 'Daily' },
  { repeatValue: 'Mon to Fri' },
  { repeatValue: 'Weekend' },
  { repeatValue: 'Custom' },
].map((item) => {
  return { ...item, id: 'basic' + item.repeatValue };
});
const advancedRepeatOptions = [
  { repeatValue: '1st of the Month' },
  { repeatValue: 'Last of the month' },
  { repeatValue: 'Custom' },
].map((item) => {
  return { ...item, id: 'advanced' + item.repeatValue };
});

type RepeatProps = {
  id: string;
  repeatValue: string;
};

type BasicReapeatProps = RepeatProps;
type AdvancedReapeatProps = RepeatProps;
type CustomReapeatProps = RepeatProps;

const IntervalPickerStyle1 = () => {
  const [isDatePickerModalOpen, setIsDatePickerModalOpen] =
    useState<boolean>(false);
  const [repeatOption, setRepeatOption] = useState<RepeatProps>({
    id: 'basicOnce',
    repeatValue: 'Once',
  });
  const [numOfOccurences, setNumOfOccurences] = useState<number>(1);

  function renderRepeatType(item: RepeatProps, id: string) {
    const isSelected = item.id === repeatOption.id;

    return (
      <Pressable
        onPress={() => {
          setRepeatOption((prevState) => {
            if (prevState.id !== item.id) {
              return {
                id: id,
                repeatValue: item.repeatValue,
              };
            }
            return prevState;
          });
        }}
      >
        <Text style={[styles.picker, { opacity: isSelected ? 1 : 0.5 }]}>
          {item.repeatValue}
        </Text>
      </Pressable>
    );
  }

  function renderSelectedCustomDates(item: string) {
    return <Text style={styles.customSelectedDate}>{item}</Text>;
  }
  function renderOccurance(item: number) {
    const isSelected = item === numOfOccurences;

    return (
      <Pressable
        onPress={() => {
          setNumOfOccurences((prevState) => {
            if (prevState !== item) {
              return item;
            }
            return prevState;
          });
        }}
      >
        <Text style={[styles.picker, { opacity: isSelected ? 1 : 0.5 }]}>
          {item}
        </Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <Text>
        You will get {numOfOccurences}{' '}
        {numOfOccurences === 1 ? 'notification ' : 'notifications '}
        {repeatOption.repeatValue}
      </Text>
      <View style={styles.insideContainer}>
        <Text style={styles.label}>Basic Repeat</Text>
        <FlatList
          data={basicRepeatOptions}
          renderItem={({ item }) => renderRepeatType(item, item.id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10 }}
        />
      </View>
      <View style={styles.insideContainer}>
        <Text style={styles.label}>Advanced Repeat</Text>
        <FlatList
          data={advancedRepeatOptions}
          renderItem={({ item }) => renderRepeatType(item, item.id)}
          horizontal
          showsHorizontalScrollIndicator={false}
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
        <FlatList
          data={[
            '12-mar-2024',
            '12-mar-2024',
            '12-mar-2024',
            '07-sep-2024',
            '07-sep-2024',
            '07-sep-2024',
          ]}
          renderItem={({ item }) => renderSelectedCustomDates(item)}
          numColumns={3}
          contentContainerStyle={{ paddingTop: 10, gap: 10 }}
          columnWrapperStyle={{ gap: 10 }}
        />
      </View>
      <View style={styles.insideContainer}>
        <Text style={styles.label}>End after num. of occurences</Text>
        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={({ item }) => renderOccurance(item)}
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
  customSelectedDate: {
    paddingVertical: 5,

    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,

    flexGrow: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
