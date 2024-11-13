import { useMemo } from 'react';
import { calculateMonthDaysNumber, RepeatProps } from './utils';

const useSetRepeatOptionValue = () => {
  const today = useMemo(() => new Date(), []);
  const todayInMs = useMemo(() => today.getTime(), [today]);

  const once = () => {
    return todayInMs;
  };

  const lastOfTheMonth = () => {
    return calculateMonthDaysNumber(today.getFullYear(), today.getMonth())
      .numOfDays;
  };

  const basicRepeatOptions: RepeatProps[] = [
    {
      id: 'a1b2c3d4',
      repeatPlaceholder: 'Once',
      heading: 'today',
      value: [once()],
      repeatType: 'once',
    },
    {
      id: 'e5f6g7h8',
      repeatPlaceholder: 'Daily',
      heading: 'every day',
      value: [0, 1, 2, 3, 4, 5, 6],
      repeatType: 'daily',
    },
    {
      id: 'i9j0k1l2',
      repeatPlaceholder: 'Mon to Fri',
      heading: 'from Mon to Fri',
      value: [1, 2, 3, 4, 5],
      repeatType: 'workweek',
    },
    {
      id: 'm3n4o5p6',
      repeatPlaceholder: 'Weekend',
      heading: 'on weekend days',
      value: [6, 0],
      repeatType: 'weekend',
    },
    // {
    //   id: 'q7r8s9t0',
    //   repeatPlaceholder: 'Monthly',
    //   heading: 'on the same day every month',
    //   value: [],
    //   repeatType: 'monthly',
    // },
    {
      id: 'u1v2w3x4',
      repeatPlaceholder: 'More',
      heading: '',
      value: [],
      repeatType: 'more',
    },
  ];

  const moreBasicRepeatOptions: RepeatProps[] = [
    {
      id: 'y5z6a7b8',
      repeatPlaceholder: 'Sunday',
      heading: 'on Sunday',
      value: [0],
      repeatType: 'dayOfWeek',
    },
    {
      id: 'c9d0e1f2',
      repeatPlaceholder: 'Monday',
      heading: 'on Monday',
      value: [1],
      repeatType: 'dayOfWeek',
    },
    {
      id: 'g3h4i5j6',
      repeatPlaceholder: 'Tuesday',
      heading: 'on Tuesday',
      value: [2],
      repeatType: 'dayOfWeek',
    },
    {
      id: 'k7l8m9n0',
      repeatPlaceholder: 'Wednesday',
      heading: 'on Wednesday',
      value: [3],
      repeatType: 'dayOfWeek',
    },
    {
      id: 'o1p2q3r4',
      repeatPlaceholder: 'Thursday',
      heading: 'on Thursday',
      value: [4],
      repeatType: 'dayOfWeek',
    },
    {
      id: 's5t6u7v8',
      repeatPlaceholder: 'Friday',
      heading: 'on Friday',
      value: [5],
      repeatType: 'dayOfWeek',
    },
    {
      id: 'w9x0y1z2',
      repeatPlaceholder: 'Saturday',
      heading: 'on Saturday',
      value: [6],
      repeatType: 'dayOfWeek',
    },
  ];

  const advancedRepeatOptions: RepeatProps[] = [
    {
      id: 'a11b22c33',
      repeatPlaceholder: '1st of the Month',
      heading: 'on the first day of the month',
      value: [1],
      repeatType: 'monthly',
    },
    {
      id: 'd44e55f66',
      repeatPlaceholder: '15th of the Month',
      heading: 'on the 15th day of the month',
      value: [15],
      repeatType: 'monthly',
    },
    {
      id: 'g77h88i99',
      repeatPlaceholder: 'Last of the month',
      heading: 'on the last day of month',
      value: [lastOfTheMonth()],
      repeatType: 'monthly',
    },
    {
      id: 'j10k11l12',
      repeatPlaceholder: 'More',
      heading: '',
      value: [],
      repeatType: 'more',
    },
  ];
  const moreAdvancedRepeatOptions: RepeatProps[] = [
    {
      id: 'm13n14o15',
      repeatPlaceholder: '5th of the Month',
      heading: 'on the 5th day of the month',
      value: [5],
      repeatType: 'monthly',
    },
    {
      id: 'p16q17r18',
      repeatPlaceholder: '10th of the Month',
      heading: 'on the 10th day of the month',
      value: [10],
      repeatType: 'monthly',
    },
    {
      id: 's19t20u21',
      repeatPlaceholder: '20th of the Month',
      heading: 'on the 20th day of the month',
      value: [20],
      repeatType: 'monthly',
    },
    {
      id: 'v22w23x24',
      repeatPlaceholder: '25th of the Month',
      heading: 'on the 25th day of the month',
      value: [25],
      repeatType: 'monthly',
    },
    // {
    //   id: 'y25z26a27',
    //   repeatPlaceholder: 'Yearly',
    //   heading: 'on the same date every year',
    //   value: [],
    //   repeatType: 'yearly',
    // },
  ];

  return {
    basicRepeatOptions,
    advancedRepeatOptions,
    moreBasicRepeatOptions,
    moreAdvancedRepeatOptions,
  };
};

export default useSetRepeatOptionValue;
