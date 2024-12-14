import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { months } from '../DateTimePickerComponent/utils/utils';

type MonthPickerStyle2Props = {
  currentMonth: number;
  onChange: (monthIndex: number) => void;
};
const ITEM_HEIGHT = 40;
const NUM_OF_COLUMNS = 3;
const GRID_GAP = 10;

const MonthPickerStyle2 = (props: MonthPickerStyle2Props) => {
  const { currentMonth, onChange } = props;
  const [month, setMonth] = useState<number>(currentMonth);

  function handleSelectedMonth(monthIndex: number) {
    console.log(monthIndex);
    onChange(monthIndex);
    setMonth(monthIndex);
  }

  return (
    <View style={[styles.container]}>
      {months.map((item, index) => (
        <Text
          key={index}
          style={[
            styles.month,
            months[index].id === month && styles.selected,
            { width: `${(100 - GRID_GAP) / NUM_OF_COLUMNS}%` },
          ]}
          onPress={() => handleSelectedMonth(item.id)}
        >
          {item.month}
        </Text>
      ))}
    </View>
  );
};

export default MonthPickerStyle2;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: GRID_GAP,
    marginVertical: 20,
  },
  month: {
    color: 'black',
    fontSize: 16,
    fontWeight: '900',
    paddingHorizontal: 10,
    height: ITEM_HEIGHT,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderWidth: 1,
    borderRadius: 5,
  },
  selected: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});
