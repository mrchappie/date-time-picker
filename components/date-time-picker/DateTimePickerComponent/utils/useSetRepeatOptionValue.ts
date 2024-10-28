import { useMemo, useState } from 'react';
import { calculateMonthDaysNumber, RepeatProps } from './utils';

const useSetRepeatOptionValue = () => {
  const today = useMemo(() => new Date(), []);
  const todayInMs = useMemo(() => today.getTime(), [today]);
  const [selectedMoreRepeatOptions, setSelectedMoreRepeatOptions] = useState<
    number[]
  >([]);

  const timeInMs = () => {
    return once();
  };

  const getRepeatInterval = (repeatType: RepeatProps) => {
    const repeatTypeId = repeatType.id;
    switch (true) {
      case repeatTypeId === 8:
        return daily();
      case repeatTypeId === 9:
        return monToFri();
      case repeatTypeId === 10:
        return weekend();
      case repeatTypeId === 20:
        return firstOfMonth();
      case repeatTypeId === 21:
        return lastOfMonth();
      case repeatTypeId >= 0 && repeatTypeId <= 6:
        return customBasic(undefined, repeatTypeId);
      case repeatTypeId >= 23 && repeatTypeId <= 31:
        return customAdvanced(undefined, repeatTypeId);
      default:
        return once();
    }
  };

  const once = () => {
    return todayInMs;
  };

  const daily = (type: string = 'week') => {
    return { type: type, repeatDays: [0, 1, 2, 3, 4, 5, 6] };
  };

  const monToFri = (type: string = 'week') => {
    return { type: type, repeatDays: [1, 2, 3, 4, 5] };
  };

  const weekend = (type: string = 'week') => {
    return { type: type, repeatDays: [6, 0] };
  };

  const firstOfMonth = (type: string = 'month') => {
    return { type: type, repeatDays: [1] };
  };

  const lastOfMonth = (type: string = 'month') => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const lastDayOfCurrentMonth = calculateMonthDaysNumber(
      year,
      month
    ).numOfDays;
    return { type: type, repeatDays: [lastDayOfCurrentMonth] };
  };

  const resetSelectedMoreRepeatOptions = () => {
    setSelectedMoreRepeatOptions([]);
  };

  const customBasic = (type: string = 'week', repeatTypeId: number) => {
    const isRepeatOptionSelected = selectedMoreRepeatOptions.some(
      (rptOpt) => rptOpt === repeatTypeId
    );

    const updatedRepeatOptions = isRepeatOptionSelected
      ? selectedMoreRepeatOptions.filter(
          (rptOption) => rptOption != repeatTypeId
        )
      : [...selectedMoreRepeatOptions, repeatTypeId];

    if (!isRepeatOptionSelected) {
      setSelectedMoreRepeatOptions(updatedRepeatOptions);
    }

    return { type: type, repeatDays: updatedRepeatOptions };
  };

  const customAdvanced = (type: string = 'month', repeatTypeId: number) => {
    const isRepeatOptionSelected = selectedMoreRepeatOptions.some(
      (rptOpt) => rptOpt === repeatTypeId
    );

    const updatedRepeatOptions = isRepeatOptionSelected
      ? selectedMoreRepeatOptions.filter(
          (rptOption) => rptOption != repeatTypeId
        )
      : [...selectedMoreRepeatOptions, repeatTypeId];

    if (!isRepeatOptionSelected) {
      setSelectedMoreRepeatOptions(updatedRepeatOptions);
    }

    return { type: type, repeatDays: updatedRepeatOptions };
  };

  return {
    timeInMs,
    getRepeatInterval,
    resetSelectedMoreRepeatOptions,
    once,
    daily,
    monToFri,
    weekend,
    firstOfMonth,
    lastOfMonth,
    customBasic,
    customAdvanced,
  };
};

export default useSetRepeatOptionValue;
