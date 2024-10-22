import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { getMonthData, months } from '../utils/utils';

type MonthPickerProps = {
  currentMonth: number;
  onChange: (monthIndex: number) => void;
};
const ITEM_HEIGHT = 40;
const monthsArray = [...months];

const MonthPicker = (props: MonthPickerProps) => {
  const { currentMonth, onChange } = props;
  const [month, setMonth] = useState<number>(currentMonth);
  function renderItem({ item }: { item: string }) {
    const isSelected = monthsArray.indexOf(item) === month;

    return (
      <Text style={[styles.month, isSelected && styles.selected]}>{item}</Text>
    );
  }

  function handleSelectedMonth(monthIndex: number) {
    // add two to set the centered month
    onChange(monthIndex + 2);
    setMonth(monthIndex + 2);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={monthsArray}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        initialScrollIndex={month}
        snapToInterval={ITEM_HEIGHT}
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

          handleSelectedMonth(index);
        }}
      />
    </View>
  );
};

export default MonthPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    overflow: 'hidden',
    gap: 20,
  },
  month: {
    color: 'black',
    fontSize: 24,
    fontWeight: '900',
    paddingHorizontal: 20,
    height: ITEM_HEIGHT,
    textAlignVertical: 'center',
  },
  selected: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});
