import { Text, View } from 'react-native';
import TimePickerStyle1 from '../styles/TimePickerStyle1';

const StylesLookup: { [key: string]: React.ComponentType } = {
  TimePickerStyle1: TimePickerStyle1,
};

type ComponentName =
  | 'TimePickerStyle1'
  | 'TimePickerStyle2'
  | 'TimePickerStyle2';

const TimePicker = (props: { componentName: ComponentName }) => {
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

export default TimePicker;
