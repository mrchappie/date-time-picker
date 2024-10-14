import { Text, View } from 'react-native';
import DatePickerStyle1 from '../styles/DatePickerStyle1';
import ModalManager from './UI/ModalManager';

type ComponentName =
  | 'DatePickerStyle1'
  | 'DatePickerStyle2'
  | 'DatePickerStyle2';

type DateSelectType = 'single' | 'multiple'; // | 'range';

type DatePickerProps = {
  componentName: ComponentName;
  onModalClose: () => void;
  isModalVisible?: boolean;
  withModal?: boolean;
  onResponse: (date: number) => void;
  dateSelectType?: DateSelectType;
  defaultDateValue?: number;
};

type StylesLookupProps = {
  [key: string]: React.ComponentType<{
    calendarSelectType: DateSelectType;
    onResponse: (date: number) => void;
    defaultDate?: number;
  }>;
};

const StylesLookup: StylesLookupProps = {
  DatePickerStyle1: DatePickerStyle1,
};

const DatePicker = (props: DatePickerProps) => {
  const {
    componentName,
    isModalVisible = false,
    withModal = true,
    onModalClose,
    onResponse,
    dateSelectType = 'single',
    defaultDateValue = 1729976400000,
  } = props;
  const Component = StylesLookup[componentName];

  // return default message is component name( component style ) is wrong
  if (!Component) {
    return (
      <View>
        <Text style={{ color: '#fff' }}>No component found!</Text>
      </View>
    );
  }

  // return standalone component without modal
  if (!withModal) {
    return (
      <Component calendarSelectType={dateSelectType} onResponse={onResponse} />
    );
  }

  // return component with modal
  return (
    <ModalManager visible={isModalVisible} onCloseModal={onModalClose}>
      <Component
        calendarSelectType={dateSelectType}
        onResponse={onResponse}
        defaultDate={defaultDateValue}
      />
    </ModalManager>
  );
};

export default DatePicker;
