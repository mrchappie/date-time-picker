import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

type YearPickerStyle2Props = {
  currentYear: number;
  onChange: (year: number) => void;
};

const ITEM_HEIGHT = 40;
const NUM_OF_COLUMNS = 3;
const GRID_GAP = 10;
const THRESHOLD = 4;

const YearPickerStyle2 = (props: YearPickerStyle2Props) => {
  const { currentYear, onChange } = props;
  const [year, setYear] = useState<number>(currentYear);

  const [yearsArray, setYearsArray] = useState<string[]>([]);

  function handleSelectedYear(year: number) {
    onChange(year);
    setYear(year);
  }

  useEffect(() => {
    const tempArr = [];
    for (let i = THRESHOLD; i >= 1; i--) {
      tempArr.push(`${year - i}`);
    }
    tempArr.push(`${year}`);
    for (let i = 1; i <= THRESHOLD; i++) {
      tempArr.push(`${year + i}`);
    }
    setYearsArray(tempArr);
  }, []);

  return (
    <View style={styles.container}>
      {yearsArray.map((item, index) => (
        <Text
          key={index}
          style={[
            styles.year,
            +item === year && styles.selected,
            { width: `${(100 - GRID_GAP) / NUM_OF_COLUMNS}%` },
          ]}
          onPress={() => handleSelectedYear(+item)}
        >
          {item}
        </Text>
      ))}
    </View>
  );
};

export default YearPickerStyle2;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: GRID_GAP,
    marginVertical: 20,
  },
  year: {
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
