import { Text, View } from 'react-native';
import DatePickerStyle1 from '../styles/DatePickerStyle1';
import ModalManager from './UI/ModalManager';

const StylesLookup: {
  [key: string]: React.ComponentType<{ selectType: DateSelectType }>;
} = {
  DatePickerStyle1: DatePickerStyle1,
};

type ComponentName =
  | 'DatePickerStyle1'
  | 'DatePickerStyle2'
  | 'DatePickerStyle2';

type DateSelectType = 'single' | 'multiple' | 'range';

type DatePickerProps = {
  componentName: ComponentName;
  onCloseModal: () => void;
  isModalVisible?: boolean;
  withModal?: boolean;
  onHandleResponse?: () => void;
  dateSelectType?: DateSelectType;
};

const DatePicker = (props: DatePickerProps) => {
  const {
    componentName,
    isModalVisible = false,
    withModal = true,
    onCloseModal,
    dateSelectType = 'single',
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
    return <Component selectType={dateSelectType} />;
  }

  // return component with modal
  return (
    <ModalManager visible={isModalVisible} handleModalClose={onCloseModal}>
      <Component selectType={dateSelectType} />
    </ModalManager>
  );
};

export default DatePicker;
