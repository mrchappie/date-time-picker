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
