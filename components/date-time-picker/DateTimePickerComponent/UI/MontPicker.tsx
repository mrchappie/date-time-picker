import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { getMonthData, months } from '../utils';

type MonthPickerProps = {
  currentMonth: number;
};
const ITEM_HEIGHT = 40;

const monthsArray = [...months];

const MonthPicker = (props: MonthPickerProps) => {
  // const { currentMonth } = props;
  const [month, setMonth] = useState<number>(props.currentMonth);
  function renderItem({ item }: { item: string }) {
    const isSelected = monthsArray.indexOf(item) === month;
    return (
      <Text style={[styles.month, isSelected && styles.selected]}>{item}</Text>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={monthsArray}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
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
          setMonth(index);
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
