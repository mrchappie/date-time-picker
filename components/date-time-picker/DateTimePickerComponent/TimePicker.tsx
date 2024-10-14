import { Text, View } from 'react-native';
import TimePickerStyle1 from '../styles/TimePickerStyle1';
import ModalManager from './UI/ModalManager';

type StylesLookupProps = {
  [key: string]: React.ComponentType<{
    onResponse: (time: number) => void;
    defaultTime?: number;
  }>;
};

const StylesLookup: StylesLookupProps = {
  TimePickerStyle1: TimePickerStyle1,
};

type ComponentName =
  | 'TimePickerStyle1'
  | 'TimePickerStyle2'
  | 'TimePickerStyle2';

type TimePickerProps = {
  componentName: ComponentName;
  handleModalClose: () => void;
  isModalVisible?: boolean;
  withModal?: boolean;
  onResponse: (time: number) => void;
  onHandleResponse?: () => void;
};

const TimePicker = (props: TimePickerProps) => {
  const {
    componentName,
    isModalVisible = false,
    withModal = true,
    handleModalClose,
    onResponse,
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
    return <Component onResponse={onResponse} />;
  }

  // return component with modal
  return (
    <ModalManager visible={isModalVisible} onCloseModal={handleModalClose}>
      <Component onResponse={onResponse} />
    </ModalManager>
  );
};

export default TimePicker;
