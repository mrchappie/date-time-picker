import { Text, View } from 'react-native';
import IntervalPickerStyle1 from '../styles/IntervalPickerStyle1';
import ModalManager from './UI/ModalManager';
import { IntervalResponseInterface } from './utils/utils';

type ComponentName =
  | 'IntervalPickerStyle1'
  | 'IntervalPickerStyle2'
  | 'IntervalPickerStyle2';

type IntervalPickerProps = {
  componentName: ComponentName;
  onModalClose: () => void;
  isModalVisible?: boolean;
  withModal?: boolean;
  onResponse: (data: IntervalResponseInterface) => void;
};

type StylesLookupProps = {
  [key: string]: React.ComponentType<{
    onResponse: (data: IntervalResponseInterface) => void;
  }>;
};

const StylesLookup: StylesLookupProps = {
  IntervalPickerStyle1: IntervalPickerStyle1,
};

const IntervalPicker = (props: IntervalPickerProps) => {
  const {
    componentName,
    isModalVisible = false,
    withModal = true,
    onModalClose,
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
    <ModalManager visible={isModalVisible} onCloseModal={onModalClose}>
      <Component onResponse={onResponse} />
    </ModalManager>
  );
};

export default IntervalPicker;
