import {
  FlatList,
  // NativeScrollEvent,
  // NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { months } from '../DateTimePickerComponent/utils/utils';

type MonthPickerStyle1Props = {
  currentMonth: number;
  onChange: (monthIndex: number) => void;
};
const ITEM_HEIGHT = 40;
// const THRESHOLD = ITEM_HEIGHT * 4;

const MonthPickerStyle1 = (props: MonthPickerStyle1Props) => {
  // const [monthsArray, setMonthsArray] = useState(months);
  const { currentMonth, onChange } = props;
  const [month, setMonth] = useState<number>(currentMonth);

  function renderItem({ item }: { item: { id: number; month: string } }) {
    const isSelected = months[item.id].id === month;

    return (
      <Text style={[styles.month, isSelected && styles.selected]}>
        {item.month}
      </Text>
    );
  }

  function handleSelectedMonth(monthIndex: number) {
    // add two to set the centered month
    console.log(monthIndex);
    onChange(monthIndex);
    setMonth(monthIndex + 2);
  }

  let lastOffsetY = 0;

  // function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
  //   const currentOffestY = event.nativeEvent.contentOffset.y;
  //   const direction = currentOffestY > lastOffsetY ? 'down' : 'up';
  //   const distance = Math.abs(currentOffestY - lastOffsetY);

  //   if (distance > THRESHOLD) {
  //     if (direction === 'down') {
  //       console.log(currentOffestY, lastOffsetY, distance);
  //       setMonthsArray((prevState) => {
  //         const [first, ...rest] = prevState;
  //         return [...rest, first];
  //       });
  //     }
  //     if (direction === 'up') {
  //       setMonthsArray((prevState) => {
  //         const last = prevState[prevState.length - 1];
  //         const rest = prevState.slice(0, prevState.length - 1);
  //         return [last, ...rest];
  //       });
  //     }

  //     lastOffsetY = currentOffestY;
  //   }
  // }

  return (
    <View style={styles.container}>
      <FlatList
        data={months}
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

          const item = months[index];
          if (item) {
            handleSelectedMonth(item.id);
          }
        }}
        // onScroll={handleScroll}
        // scrollEventThrottle={16}
      />
    </View>
  );
};

export default MonthPickerStyle1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: ITEM_HEIGHT * 5,
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
