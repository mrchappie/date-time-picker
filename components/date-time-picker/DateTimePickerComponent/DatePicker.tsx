import { Text, View } from 'react-native';
import DatePickerStyle1 from '../styles/DatePickerStyle1';

const StylesLookup: { [key: string]: React.ComponentType } = {
  DatePickerStyle1: DatePickerStyle1,
};

type ComponentName =
  | 'DatePickerStyle1'
  | 'DatePickerStyle2'
  | 'DatePickerStyle2';

const DatePicker = (props: { componentName: ComponentName }) => {
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

export default DatePicker;
