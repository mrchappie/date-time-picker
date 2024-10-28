export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export function calculateMonthDaysNumber(
  yearToDisplay: number,
  monthToDisplay: number
): MonthInfo {
  return {
    year: yearToDisplay,
    month: { name: months[monthToDisplay], index: monthToDisplay },
    firstDay: new Date(yearToDisplay, monthToDisplay, 1).getDay(),
    lastDay: new Date(yearToDisplay, monthToDisplay + 1, 0).getDay(),
    numOfDays: new Date(yearToDisplay, monthToDisplay + 1, 0).getDate(),
    days: [],
  };
}

export function generateDaysToDisplay(
  yearToDisplay: number,
  monthToDisplay: number
) {
  const { year, month, firstDay, lastDay, numOfDays } =
    calculateMonthDaysNumber(yearToDisplay, monthToDisplay);

  const CALENDAR_ROWS = firstDay + numOfDays > 35 ? 42 : 35;
  const days = Array(CALENDAR_ROWS).fill({
    dayNumber: '',
    hideDayBox: true,
  });

  const newDays = days.map((_, index) => {
    if (index >= firstDay && index < numOfDays + firstDay) {
      return { dayNumber: index - firstDay + 1, hideDayBox: false };
    }
    return { dayNumber: 0, hideDayBox: true };
  });

  return newDays;
}

export function formatDate(date: number) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-US', options);
}

export function formatTime(time: number) {
  const hour = Math.floor(time / 1000 / 3600);
  const minutes = Math.floor(((time / 1000) % 3600) / 60);

  const formatedTime: string = `${hour > 10 ? hour : `0${hour}`}:${
    minutes > 10 ? minutes : `0${minutes}`
  }`;

  return formatedTime;
}

export const basicRepeatOptions: RepeatProps[] = [
  { id: 7, repeatValue: 'Once', heading: 'today', value: [] },
  {
    id: 8,
    repeatValue: 'Daily',
    heading: 'every day',
    value: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    id: 9,
    repeatValue: 'Mon to Fri',
    heading: 'from Mon to Fri',
    value: [1, 2, 3, 4, 5],
  },
  { id: 10, repeatValue: 'Weekend', heading: 'on weekend days', value: [6, 0] },
  {
    id: 29,
    repeatValue: 'Monthly',
    heading: 'on the same day every month',
    value: [],
  },
  { id: 11, repeatValue: 'More', heading: '', value: [] },
];
export const moreBasicRepeatOptions: RepeatProps[] = [
  { id: 0, repeatValue: 'Sunday', heading: 'on Sunday', value: [0] },
  { id: 1, repeatValue: 'Monday', heading: 'on Monday', value: [1] },
  { id: 2, repeatValue: 'Tuesday', heading: 'on Tuesday', value: [2] },
  { id: 3, repeatValue: 'Wednesday', heading: 'on Wednesday', value: [3] },
  { id: 4, repeatValue: 'Thursday', heading: 'on Thursday', value: [4] },
  { id: 5, repeatValue: 'Friday', heading: 'on Friday', value: [5] },
  { id: 6, repeatValue: 'Saturday', heading: 'on Saturday', value: [6] },
];
export const advancedRepeatOptions: RepeatProps[] = [
  {
    id: 20,
    repeatValue: '1st of the Month',
    heading: 'on the first day of the month',
    value: [1],
  },
  {
    id: 25,
    repeatValue: '15th of the Month',
    heading: 'on the 15th day of the month',
    value: [15],
  },
  {
    id: 21,
    repeatValue: 'Last of the month',
    heading: 'on the last day of month',
    value: [],
  },
  { id: 22, repeatValue: 'More', heading: '', value: [] },
];

export const moreAdvancedRepeatOptions: RepeatProps[] = [
  {
    id: 23,
    repeatValue: '5th of the Month',
    heading: 'on the 5th day of the month',
    value: [5],
  },
  {
    id: 24,
    repeatValue: '10th of the Month',
    heading: 'on the 10th day of the month',
    value: [10],
  },

  {
    id: 27,
    repeatValue: '20th of the Month',
    heading: 'on the 20th day of the month',
    value: [20],
  },
  {
    id: 28,
    repeatValue: '25th of the Month',
    heading: 'on the 25th day of the month',
    value: [25],
  },

  {
    id: 31,
    repeatValue: 'Yearly',
    heading: 'on the same date every year',
    value: [],
  },
];

export type MonthInfo = {
  year: number;
  month: {
    name: string;
    index: number;
  };
  firstDay: number;
  lastDay: number;
  numOfDays: number;
  days: { dayNumber: number; hideDayBox: boolean }[];
};
export type DayInfo = MonthInfo['days'][number];

export function getMonthData(currentMonth: number) {
  // Select 7 months centered around the current month
  const start = Math.max(currentMonth - 2, 0); // Ensure no negative index
  const end = Math.min(currentMonth + 2, months.length - 1); // Ensure no overflow

  return months.slice(start, end + 1); // Get the 7 months to display
}

export type RepeatProps = {
  id: number;
  repeatValue: string;
  heading: string;
  value: number[];
};
