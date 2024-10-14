import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

const minutes: number[] = new Array(60).fill('').map((_, index) => index);
const VISIBLE_ITEMS = minutes.length / 2;
const ITEM_HEIGHT = 40;

type MinutesPickerProps = {
  onChangeMinutes: (minutes: number) => void;
};

const MinutesPicker: React.FC<MinutesPickerProps> = (props) => {
  const { onChangeMinutes } = props;
  const [selectedMinutes, setSelectedMinutes] = useState<number>(0);
  const minutesRef = useRef(null);

  useEffect(() => {
    const currentMinutes = new Date().getMinutes();
    setSelectedMinutes(currentMinutes);
    onChangeMinutes(currentMinutes);
  }, []);

  function renderItem(item: number, selectedValue: number) {
    const isSelected = item === selectedValue;
    return (
      <Text style={[styles.item, isSelected && styles.selected]}>
        {item < 10 ? `0${item}` : item}
      </Text>
    );
  }

  function handleSelectedMinutes(selectedMinutes: number) {
    setSelectedMinutes(selectedMinutes);
    onChangeMinutes(selectedMinutes);
  }

  return (
    <View style={styles.container}>
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
          const index = Math.round(
            event.nativeEvent.contentOffset.y / ITEM_HEIGHT
          );
          handleSelectedMinutes(minutes[index + 2]);
          // console.log('scroll reached end');
          // setExtendedHoursList((prevState) => {
          //   return prevState.slice(0, hours.length);
          // });
        }}
        onEndReachedThreshold={5}
        onScroll={(event) => {
          console.log(event.nativeEvent.contentOffset.y < ITEM_HEIGHT);
        }}
      />
    </View>
  );
};

export default MinutesPicker;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    overflow: 'hidden',
    gap: 20,
  },
  item: {
    color: 'black',
    fontSize: 24,
    fontWeight: '900',
    paddingHorizontal: 30,
    height: ITEM_HEIGHT,
    textAlignVertical: 'center',
  },
  selected: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});
