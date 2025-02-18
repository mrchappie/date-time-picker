import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import DatePicker from '../DateTimePickerComponent/DatePicker';
import { Button } from '../DateTimePickerComponent/UI/Button';
import {
  formatDate,
  IntervalResponseInterface,
  RepeatProps,
} from '../DateTimePickerComponent/utils/utils';
import useSetRepeatOptionValue from '../DateTimePickerComponent/utils/useSetRepeatOptionValue';

type IntervalPickerStyle1 = {
  onResponse: (data: IntervalResponseInterface) => void;
};

const IntervalPickerStyle1: React.FC<IntervalPickerStyle1> = (props) => {
  const { onResponse } = props;
  const {
    advancedRepeatOptions,
    basicRepeatOptions,
    moreBasicRepeatOptions,
    moreAdvancedRepeatOptions,
  } = useSetRepeatOptionValue();
  const defaultRepeatOption = basicRepeatOptions[0];

  const [isDatePickerModalOpen, setIsDatePickerModalOpen] =
    useState<boolean>(false);
  const [repeatOption, setRepeatOption] = useState<RepeatProps[]>([
    defaultRepeatOption,
  ]);
  const [numOfOccurences, setNumOfOccurences] = useState<number>(1);

  const [showMoreRepeatOptions, setShowMoreRepeatOptions] = useState<
    string | undefined
  >('');

  function handleSetSelectedDates(dateInMs: number) {
    setRepeatOption([
      {
        id: 'customDates',
        repeatPlaceholder: 'Calendar',
        heading: 'on this date: ',
        value: [dateInMs],
        repeatType: 'monthly',
      },
    ]);
    setIsDatePickerModalOpen(false);
  }

  function handleSelectRepeatOption(repeatOption: RepeatProps) {
    setRepeatOption((prevState) => {
      if (prevState[0]?.id !== repeatOption.id && !showMoreRepeatOptions) {
        return [repeatOption];
      }

      if (prevState[0]?.id === repeatOption.id && !showMoreRepeatOptions) {
        return prevState;
      }

      if (showMoreRepeatOptions) {
        const isRepeatOptionSelected = prevState?.some((repOpt) => {
          return repOpt.id === repeatOption.id;
        });
        if (isRepeatOptionSelected) {
          return [
            ...prevState.filter((repOpt) => {
              return repOpt.id != repeatOption.id;
            }),
          ];
        } else {
          return [...prevState, repeatOption];
        }
      }
      return [];
    });
  }

  function handleSaveIntervalButton() {
    const response: IntervalResponseInterface = {
      whenToRepeat: [],
      numOfOcc: numOfOccurences,
    };

    [...repeatOption].forEach((rptOpt) => {
      const cleanRepeatOptionObject = {
        daysWhenToRepeat: rptOpt.value,
        repeatType: rptOpt.repeatType,
      };

      response.whenToRepeat.push(cleanRepeatOptionObject);
      return;
    });

    onResponse(response);
    // console.log(response);
  }

  function renderRepeatType(item: RepeatProps, id: string) {
    let isSelected = repeatOption.some(
      (repeatOption) => repeatOption.id === item.id
    );

    return (
      <Pressable
        onPress={() => {
          if (id === 'u1v2w3x4') {
            setShowMoreRepeatOptions('basic');
            // setRepeatOption([]);
            // return;
          }
          if (id === 'j10k11l12') {
            setShowMoreRepeatOptions('advanced');
            // setRepeatOption([]);
            // return;
          }
          if (id != 'u1v2w3x4' && id != 'j10k11l12') {
            handleSelectRepeatOption(item);
          }

          // console.log(getRepeatInterval(item), 'here');
        }}
      >
        <Text style={[styles.picker, !isSelected && styles.isSelected]}>
          {item.repeatPlaceholder}
        </Text>
      </Pressable>
    );
  }

  // function renderSelectedCustomDates(item: RepeatProps) {
  //   return <Text style={styles.customSelectedDate}>{item.value}</Text>;
  // }

  // useEffect(() => {
  //   console.log(repeatOption, 'here 3');
  // }, [repeatOption]);

  function renderMoreRepeatOptions(item: RepeatProps) {
    const isSelected = repeatOption.some(
      (repeatOption) => repeatOption.id === item.id
    );
    return (
      <Pressable
        onPress={() => {
          handleSelectRepeatOption(item);
          // console.log(getRepeatInterval(item), 'here 3');
        }}
      >
        <Text
          style={[styles.moreRepeatOption, !isSelected && styles.isSelected]}
        >
          {item.repeatPlaceholder}
        </Text>
      </Pressable>
    );
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
        <Text style={[styles.picker, !isSelected && styles.isSelected]}>
          {item}
        </Text>
      </Pressable>
    );
  }

  return (
    <>
      {!showMoreRepeatOptions && (
        <View style={styles.container}>
          {repeatOption && (
            <Text style={styles.heading}>
              You will get {numOfOccurences}{' '}
              {numOfOccurences === 1 ? 'notification ' : 'notifications '}
              {repeatOption
                .filter(({ repeatType }) => repeatType != 'more')
                .map(({ heading, id, value }) =>
                  id != 'customDates' ? heading : heading + formatDate(value)
                )
                .join(', ')}
            </Text>
          )}
          <View style={styles.insideContainer}>
            <Text style={styles.label}>Basic Repeat</Text>
            <FlatList
              data={basicRepeatOptions}
              numColumns={4}
              renderItem={({ item }) => renderRepeatType(item, item.id)}
              // horizontal
              // showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 10 }}
              columnWrapperStyle={{ gap: 10 }}
            />
          </View>
          <View style={styles.insideContainer}>
            <Text style={styles.label}>Advanced Repeat</Text>
            <FlatList
              data={advancedRepeatOptions}
              renderItem={({ item }) => renderRepeatType(item, item.id)}
              numColumns={2}
              // horizontal
              // showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 10 }}
              columnWrapperStyle={{ gap: 10 }}
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
            {/* <FlatList
              data={repeatOption}
              renderItem={({ item }) => renderSelectedCustomDates(item)}
              numColumns={3}
              contentContainerStyle={{ paddingTop: 10, gap: 10 }}
              columnWrapperStyle={{ gap: 10 }}
            /> */}
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
      )}
      {showMoreRepeatOptions && (
        <View style={styles.container}>
          <FlatList
            data={
              showMoreRepeatOptions === 'basic'
                ? moreBasicRepeatOptions
                : moreAdvancedRepeatOptions
            }
            renderItem={({ item }) => renderMoreRepeatOptions(item)}
            contentContainerStyle={{ gap: 10 }}
          />
          <Button
            title="Save"
            defaultSelected
            onButtonPress={() => {
              setShowMoreRepeatOptions('');
            }}
          />
        </View>
      )}
    </>
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
    height: 60,
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
  isSelected: {
    opacity: 0.5,
  },
  moreRepeatOption: {
    backgroundColor: 'black',
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlign: 'center',
    borderRadius: 5,
  },
});
