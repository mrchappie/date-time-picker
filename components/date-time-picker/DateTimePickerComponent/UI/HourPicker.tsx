import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

const hours: number[] = new Array(24).fill('').map((_, index) => index);
const VISIBLE_ITEMS = hours.length / 2;
const ITEM_HEIGHT = 40;

type HourPickerProps = {
  onChangeHour: (hour: number) => void;
};

const HourPicker: React.FC<HourPickerProps> = (props) => {
  const { onChangeHour } = props;
  const [selectedHour, setSelectedHour] = useState<number>(7);
  const [extendedHoursList, setExtendedHoursList] = useState<number[]>(hours);

  const hoursRef = useRef(null);

  useEffect(() => {
    const currentHour = new Date().getHours();
    setSelectedHour(currentHour);
    onChangeHour(currentHour);
  }, []);

  function renderItem(item: number, selectedValue: number) {
    const isSelected = item === selectedValue;
    return (
      <Text style={[styles.item, isSelected && styles.selected]}>
        {item < 10 ? `0${item}` : item}
      </Text>
    );
  }

  function handleSelectedHour(selectedHour: number) {
    setSelectedHour(selectedHour);
    onChangeHour(selectedHour);
  }

  return (
    <View style={styles.container}>
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
          handleSelectedHour(extendedHoursList[index + 2]);
        }}
        // onEndReached={() => {
        //   console.log('scroll reached end');
        //   handleScrollReachedEnd();
        // }}
        // onStartReached={() => {
        //   console.log('scroll reached start');
        //   // handleScrollReachedStart();
        // }}
        onEndReachedThreshold={0.1}
        onStartReachedThreshold={0.1}
      />
    </View>
  );
};

export default HourPicker;

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
