import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  DayInfo,
  generateDaysToDisplay,
  months,
  weekdays,
} from '../DateTimePickerComponent/utils';
import Button from '../DateTimePickerComponent/UI/Button';
import MonthPicker from '../DateTimePickerComponent/UI/MontPicker';
import YearPicker from '../DateTimePickerComponent/UI/YearPicker';

type DatePickerStyle1Props = {
  selectType: 'single' | 'multiple' | 'range';
};

const DatePickerStyle1: React.FC<DatePickerStyle1Props> = ({ selectType }) => {
  const [isYearMonthPickerVisible, setIsYearMonthPickerVisible] =
    useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedDayOfTheMonth, setSelectedDayOfTheMonth] = useState<number>(
    new Date().getDate()
  );
  const [currentDayOfTheWeek, setCurrentDayOfTheWeek] = useState<number>(
    new Date().getDay()
  );
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  useEffect(() => {
    setDayOfTheWeek(selectedDayOfTheMonth);
  }, [currentMonth, currentYear]);

  function setDayOfTheWeek(dayOfTheMonth: number) {
    const dayOfTheWeek = new Date(
      currentYear,
      currentMonth,
      dayOfTheMonth
    ).getDay();
    setCurrentDayOfTheWeek(dayOfTheWeek);
  }

  function renderDay({ dayNumber, hideDayBox }: DayInfo) {
    const isCurrentDay = Number(dayNumber) === selectedDayOfTheMonth;
    const isDaySelected = selectedDays.some((day) => day === Number(dayNumber));
    return (
      <Pressable
        onPress={() => {
          if (!hideDayBox) {
            if (selectType === 'single') {
              setSelectedDays(() => {
                return [Number(dayNumber)];
              });
            } else {
              setSelectedDays((prevState) => {
                return [...prevState, Number(dayNumber)];
              });
            }
          }
        }}
        style={[
          styles.day,
          isCurrentDay && styles.isCurrentDay,
          isDaySelected && styles.isDaySelected,
          { opacity: hideDayBox ? 0 : 1 },
        ]}
      >
        <Text
          style={{
            fontWeight: 600,
            userSelect: 'none',
            color: isDaySelected ? '#fff' : '#000',
          }}
        >
          {dayNumber}
        </Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerButtons}>
        <Button
          title={`${months[currentMonth]} - ${currentYear.toString()}`}
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
                    setCurrentYear((prevState) => prevState - 1);
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
                    setCurrentYear((prevState) => prevState + 1);
                    return 0;
                  }
                });
              }}
            />
          </View>

          <View style={styles.calendarContainer}>
            <FlatList
              data={weekdays}
              renderItem={({ item, index }) => {
                const isSelected = currentDayOfTheWeek === index;
                return (
                  <View
                    style={[
                      styles.dayLabel,
                      isSelected && styles.isDayLabelSelected,
                    ]}
                  >
                    <Text style={{ fontWeight: '600', fontSize: 14 }}>
                      {item.slice(0, 3)}
                    </Text>
                  </View>
                );
              }}
              numColumns={7}
              columnWrapperStyle={{ gap: 5 }}
              contentContainerStyle={{ gap: 5 }}
            />
            <FlatList
              data={generateDaysToDisplay(currentYear, currentMonth)}
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
          <YearPicker currentYear={currentYear} />
        </View>
      )}
      <View style={styles.selectedDateDisplay}>
        <Text
          style={{
            fontWeight: '600',
            fontSize: 16,
          }}
        >
          {`${weekdays[currentDayOfTheWeek]}, ${months[currentMonth]} ${selectedDayOfTheMonth} ${currentYear}`}
        </Text>
      </View>
    </View>
  );
};

export default DatePickerStyle1;

const DAY_LABEL_SIZE = 40;

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 450,
    gap: 10,
    padding: 20,
    paddingBottom: 30,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,

    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  headerButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  changeMonthButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    // paddingHorizontal: 20,
  },
  calendarContainer: {
    flex: 1,
    // marginVertical: 30,
    // marginHorizontal: 20,
    flexDirection: 'column',
    // backgroundColor: 'green',
  },
  day: {
    width: DAY_LABEL_SIZE,
    height: DAY_LABEL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
  isCurrentDay: {
    borderColor: 'blue',
    borderWidth: 2,
  },
  isDaySelected: {
    backgroundColor: 'black',
    borderColor: 'black',
    borderWidth: 1,
  },
  dayLabel: { width: DAY_LABEL_SIZE, alignItems: 'center' },
  isDayLabelSelected: {
    borderBottomColor: 'blue',
    borderBottomWidth: 2,
  },
  selectedDateDisplay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  yearMonthPickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});
