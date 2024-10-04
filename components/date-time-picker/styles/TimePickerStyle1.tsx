import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

const hours: number[] = new Array(24).fill('').map((_, index) => index);
const minutes: number[] = new Array(60).fill('').map((_, index) => index);

type TimePickerStyle1Props = {
  visible?: boolean;
};

const ITEM_HEIGHT = 40;
const VISIBLE_ITEMS = hours.length / 2;

const TimePickerStyle1: React.FC<TimePickerStyle1Props> = ({ visible }) => {
  const [selectedHour, setSelectedHour] = useState<number>(7);
  const [selectedMinutes, setSelectedMinute] = useState<number>(0);
  const [extendedHoursList, setExtendedHoursList] = useState<number[]>(hours);

  const hoursRef = useRef(null);
  const minutesRef = useRef(null);

  useEffect(() => {
    const date = new Date();
    setSelectedHour(date.getHours());
    setSelectedMinute(date.getMinutes());
  }, []);

  function renderItem(item: number, selectedValue: number) {
    const isSelected = item === selectedValue;
    return (
      <Text style={[styles.item, isSelected && styles.selected]}>
        {item < 10 ? `0${item}` : item}
      </Text>
    );
  }

  function handleScrollReachedStart() {
    setExtendedHoursList((prevState) => {
      return [
        ...hours,
        ...prevState.slice(0, prevState.length - VISIBLE_ITEMS),
      ];
    });
  }

  // useEffect(() => {
  //   console.log(extendedHoursList.length);
  // }, [extendedHoursList]);

  function handleScrollReachedEnd() {
    const newData = [...extendedHoursList, ...hours];

    setExtendedHoursList(newData);
    // if (newData.length > hours.length * 2) {
    // const slicedData = newData.slice(hours.length);
    // setExtendedHoursList(slicedData);
    // } else {
    // }
  }

  return (
    <View style={styles.container}>
      <View style={styles.picker}>
        <FlatList
          ref={hoursRef}
          data={extendedHoursList}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => renderItem(item, selectedHour)}
          showsVerticalScrollIndicator={false}
          //   snapToAlignment="center"
          snapToInterval={ITEM_HEIGHT}
          initialScrollIndex={selectedHour}
          getItemLayout={(_, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
          contentContainerStyle={{ marginVertical: 5 }}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.y / ITEM_HEIGHT
            );
            // setExtendedHoursList(hours);
            setSelectedHour(extendedHoursList[index + 2]);
          }}
          onEndReached={() => {
            console.log('scroll reached end');
            handleScrollReachedEnd();
          }}
          onStartReached={() => {
            console.log('scroll reached start');
            // handleScrollReachedStart();
          }}
          onEndReachedThreshold={0.1}
          onStartReachedThreshold={0.1}
        />
      </View>
      <View style={styles.picker}>
        <FlatList
          ref={minutesRef}
          data={minutes}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => renderItem(item, selectedMinutes)}
          showsVerticalScrollIndicator={false}
          // snapToAlignment="center"
          snapToInterval={ITEM_HEIGHT}
          decelerationRate={'fast'}
          initialScrollIndex={selectedMinutes}
          getItemLayout={(_, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
          contentContainerStyle={{ marginVertical: 5 }}
          onMomentumScrollEnd={(event) => {
            // const index = Math.round(
            //   event.nativeEvent.contentOffset.y / ITEM_HEIGHT
            // );
            // setSelectedMinute(minutes[index]);
            console.log('scroll reached end');
            setExtendedHoursList((prevState) => {
              return prevState.slice(0, hours.length);
            });
          }}
          onEndReachedThreshold={5}
          onScroll={(event) => {
            console.log(event.nativeEvent.contentOffset.y < ITEM_HEIGHT);
          }}
        />
      </View>
    </View>
  );
};

export default TimePickerStyle1;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 200,
    overflow: 'hidden',
    gap: 20,
  },

  picker: {
    backgroundColor: 'red',
  },
  item: {
    color: 'black',
    fontSize: 30,
    fontWeight: '900',
    paddingHorizontal: 20,
    height: ITEM_HEIGHT,
  },
  selected: {
    color: 'blue',
    backgroundColor: 'yellow',
  },
});
