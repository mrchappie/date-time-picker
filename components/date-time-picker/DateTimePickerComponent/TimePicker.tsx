import { Text, View } from 'react-native';
import TimePickerStyle1 from '../styles/TimePickerStyle1';
import ModalManager from './UI/ModalManager';

const StylesLookup: { [key: string]: React.ComponentType } = {
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
  onHandleResponse?: () => void;
};

const TimePicker = (props: TimePickerProps) => {
  const {
    componentName,
    isModalVisible = false,
    withModal = true,
    handleModalClose,
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
    return <Component />;
  }

  // return component with modal
  return (
    <ModalManager visible={isModalVisible} onCloseModal={handleModalClose}>
      <Component />
    </ModalManager>
  );
};

export default TimePicker;
