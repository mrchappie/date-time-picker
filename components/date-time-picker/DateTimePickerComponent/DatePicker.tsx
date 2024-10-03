import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from './UI/Button';
import { DayInfo, generateDaysToDisplay, months, weekdays } from './utils';
import MonthPicker from './UI/MontPicker';
import YearPicker from './UI/YearPicker';

const DatePicker = () => {
  const [isYearMonthPickerVisible, setIsYearMonthPickerVisible] =
    useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {}, []);

  function renderDay({ dayNumber, hideDayBox }: DayInfo) {
    return (
      <View style={{ ...styles.day, opacity: hideDayBox ? 0 : 1 }}>
        <Text style={{ fontWeight: 600, userSelect: 'none' }}>{dayNumber}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerButtons}>
        <Button
          title={`${months[currentMonth]} - ${year.toString()}`}
          defaultSelected
          onButtonPress={() => {
            setIsYearMonthPickerVisible(!isYearMonthPickerVisible);
          }}
        />
      </View>
      {!isYearMonthPickerVisible && (
        <>
          <View style={styles.changeMonthButtons}>
            <Button
              title={`${
                currentMonth > 0 ? months[currentMonth - 1] : months[11]
              }`}
              defaultSelected
              onButtonPress={() => {
                setCurrentMonth((prevState) => {
                  if (prevState > 0) {
                    return prevState - 1;
                  } else {
                    setYear((prevState) => prevState - 1);
                    return 11;
                  }
                });
              }}
            />
            <Button
              title={`${
                currentMonth < 11 ? months[currentMonth + 1] : months[0]
              }`}
              defaultSelected
              onButtonPress={() => {
                setCurrentMonth((prevState) => {
                  if (prevState < 11) {
                    return prevState + 1;
                  } else {
                    setYear((prevState) => prevState + 1);
                    return 0;
                  }
                });
              }}
            />
          </View>

          <View style={styles.calendarContainer}>
            <FlatList
              data={weekdays}
              renderItem={({ item }) => (
                <View style={styles.dayLabel}>
                  <Text style={{ fontWeight: 600 }}>{item.slice(0, 3)}</Text>
                </View>
              )}
              numColumns={7}
              columnWrapperStyle={{ gap: 5 }}
              contentContainerStyle={{ gap: 5 }}
            />
            <FlatList
              data={generateDaysToDisplay(year, currentMonth)}
              renderItem={({ item }) => renderDay(item)}
              numColumns={7}
              columnWrapperStyle={{ gap: 5 }}
              contentContainerStyle={{ gap: 5 }}
            />
          </View>
        </>
      )}
      {isYearMonthPickerVisible && (
        <View style={styles.yearMonthPickerContainer}>
          <MonthPicker currentMonth={9} />
          <YearPicker currentYear={year} />
        </View>
      )}
      <View style={styles.selectedDateDisplay}>
        <Text>Saturday, September 28 2024</Text>
      </View>
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    minWidth: 300,
    minHeight: 400,
    gap: 10,
    padding: 20,
    // flex: 1,
    alignItems: 'center',
    backgroundColor: 'red',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerButtons: {
    // width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  changeMonthButtons: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    paddingHorizontal: 20,
  },
  calendarContainer: {
    flex: 1,
    // marginVertical: 30,
    marginHorizontal: 20,
    flexDirection: 'column',
    backgroundColor: 'green',
  },
  day: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 9999,
    borderColor: 'black',
    borderWidth: 1,
  },
  dayLabel: { width: 35, alignItems: 'center' },
  selectedDateDisplay: {
    position: 'absolute',
    bottom: 5,
    left: 5,
  },
  yearMonthPickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});
