import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

type YearPickerStyle1Props = {
  currentYear: number;
  onChange: (year: number) => void;
};
const yearsArray = new Array(37).fill('').map((_, index) => `${2000 + index}`);
const ITEM_HEIGHT = 40;

const YearPickerStyle1 = (props: YearPickerStyle1Props) => {
  const { currentYear, onChange } = props;
  const [year, setYear] = useState<number>(currentYear);
  function renderItem({ item }: { item: string }) {
    const isSelected = +item === year;
    return (
      <Text style={[styles.year, isSelected && styles.selected]}>{item}</Text>
    );
  }

  function handleSelectedYear(year: number) {
    // add two to set the centered month
    onChange(year);
    setYear(year);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={yearsArray}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
        initialScrollIndex={yearsArray.indexOf(year.toString())}
        showsVerticalScrollIndicator={false}
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
          handleSelectedYear(+yearsArray[index + 2]);
        }}
      />
    </View>
  );
};

export default YearPickerStyle1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: ITEM_HEIGHT * 5,
    overflow: 'hidden',
    gap: 20,
  },
  year: {
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
