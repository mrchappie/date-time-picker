import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import DatePicker from '../DateTimePickerComponent/DatePicker';
import Button from '../DateTimePickerComponent/UI/Button';
import { formatIntervalHeading } from '../DateTimePickerComponent/utils/utils';
import StringToDate from '../DateTimePickerComponent/utils/stringToDateClass';

const ST = new StringToDate();

const basicRepeatOptions = [
  { repeatValue: 'Once' },
  { repeatValue: 'Daily' },
  { repeatValue: 'Mon to Fri' },
  { repeatValue: 'Weekend' },
  { repeatValue: 'Custom' },
].map((item) => {
  return { ...item, id: 'basic' + item.repeatValue.replaceAll(' ', '_') };
});
const advancedRepeatOptions = [
  { repeatValue: '1st of the Month' },
  { repeatValue: 'Last of the month' },
  { repeatValue: 'Custom' },
].map((item) => {
  return { ...item, id: 'advanced' + item.repeatValue.replaceAll(' ', '_') };
});

type RepeatProps = {
  id: string;
  repeatValue: string;
};

type BasicReapeatProps = RepeatProps;
type AdvancedReapeatProps = RepeatProps;
type CustomReapeatProps = RepeatProps;

type IntervalPickerStyle1 = {
  onResponse: (data: { date: number; numOfOcc: number }) => void;
};

const IntervalPickerStyle1: React.FC<IntervalPickerStyle1> = (props) => {
  const { onResponse } = props;

  const [isDatePickerModalOpen, setIsDatePickerModalOpen] =
    useState<boolean>(false);
  const [repeatOption, setRepeatOption] = useState<RepeatProps | undefined>({
    id: 'basicOnce',
    repeatValue: 'Once',
  });
  const [numOfOccurences, setNumOfOccurences] = useState<number>(1);
  const [selectedCustomDates, setSelectedCustomDates] = useState<string[]>([]);

  function handleSetSelectedDates(dateInMs: number) {
    const dateAsString = new Date(dateInMs).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    setSelectedCustomDates([dateAsString]);
    setRepeatOption(undefined);
    setIsDatePickerModalOpen(false);
  }

  function handleSelectRepeatOption(repeatOption: RepeatProps, id: string) {
    setRepeatOption((prevState) => {
      if (prevState?.id !== repeatOption.id) {
        return {
          id: id,
          repeatValue: repeatOption.repeatValue,
        };
      }
      return prevState;
    });
    setSelectedCustomDates([]);
  }

  function handleSaveIntervalButton() {
    if (repeatOption) {
      onResponse({ date: ST.timeInMs, numOfOcc: numOfOccurences });
    } else {
      console.log(selectedCustomDates);
    }
  }

  function renderRepeatType(item: RepeatProps, id: string) {
    const isSelected = item.id === repeatOption?.id;

    return (
      <Pressable
        onPress={() => {
          handleSelectRepeatOption(item, id);
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
      {repeatOption && (
        <Text style={styles.heading}>
          You will get {numOfOccurences}{' '}
          {numOfOccurences === 1 ? 'notification ' : 'notifications '}
          {formatIntervalHeading(repeatOption?.repeatValue)}
        </Text>
      )}
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
          onResponse={(response) => handleSetSelectedDates(response)}
        />
        <FlatList
          data={selectedCustomDates}
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

      <Button
        title="Save Interval"
        defaultSelected
        onButtonPress={handleSaveIntervalButton}
      />
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
  heading: {
    textAlign: 'center',
    lineHeight: 20,
    height: 40,
    fontWeight: '600',
    fontSize: 16,
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
    paddingHorizontal: 10,

    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,

    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
