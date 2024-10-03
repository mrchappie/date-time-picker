import { Text, View } from 'react-native';
import DateTimePickerStyle1 from '../styles/DateTimePickerStyle1';

const StylesLookup: { [key: string]: React.ComponentType } = {
  DateTimePickerStyle1: DateTimePickerStyle1,
};

type ComponentName =
  | 'DateTimePickerStyle1'
  | 'DateTimePickerStyle2'
  | 'DateTimePickerStyle2';

const DateTimePicker = (props: { componentName: ComponentName }) => {
  const Component = StylesLookup[props.componentName];
  if (!Component) {
    return (
      <View>
        <Text>No component found!</Text>
      </View>
    );
  }
  return <Component />;
};

export default DateTimePicker;
