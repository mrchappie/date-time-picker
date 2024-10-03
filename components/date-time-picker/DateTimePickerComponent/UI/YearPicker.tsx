import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

type YearPickerProps = {
  currentYear: number;
};
const yearsArray = new Array(37).fill('').map((_, index) => `${2000 + index}`);
const ITEM_HEIGHT = 40;

const YearPicker = (props: YearPickerProps) => {
  //   const { currentYear } = props;
  const [year, setYear] = useState<number>(props.currentYear);
  function renderItem({ item }: { item: string }) {
    const isSelected = +item === year;
    return (
      <Text style={[styles.year, isSelected && styles.selected]}>{item}</Text>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={yearsArray}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
        initialScrollIndex={yearsArray.indexOf(year.toString())}
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
          setYear(+yearsArray[index]);
        }}
      />
    </View>
  );
};

export default YearPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    overflow: 'hidden',
    gap: 20,
  },
  year: {
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
