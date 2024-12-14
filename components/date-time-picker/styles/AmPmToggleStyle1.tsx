import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { clockType } from '../DateTimePickerComponent/utils/utils';

type Props = {
  onClockTypeChange: (clockType: clockType) => void;
  clockType: clockType;
};

export default function AmPmToggleStyle1({
  onClockTypeChange,
  clockType,
}: Props) {
  useEffect(() => {
    onClockTypeChange(clockType);
  }, [clockType]);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          onClockTypeChange('AM');
        }}
      >
        <Text style={[styles.text, clockType === 'AM' && styles.isSelected]}>
          AM
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          onClockTypeChange('PM');
        }}
      >
        <Text style={[styles.text, clockType === 'PM' && styles.isSelected]}>
          PM
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 50,
    aspectRatio: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  isSelected: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    color: 'white',
  },
});
