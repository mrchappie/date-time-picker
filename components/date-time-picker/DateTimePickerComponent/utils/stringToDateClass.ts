import { calculateMonthDaysNumber } from './utils';

class StringToDate {
  private today = new Date();
  private todayInMs = this.today.getTime();

  get timeInMs() {
    return this.once();
  }

  getRepeatInterval(repeatTypeId: string) {
    switch (true) {
      case repeatTypeId === '2':
        return this.daily();
      case repeatTypeId === '3':
        return this.monToFri();
      case repeatTypeId === '4':
        return this.weekend();
      case repeatTypeId === '10':
        return this.firstOfMonth();
      case repeatTypeId === '11':
        return this.lastOfMonth();

      //  default case repeatTypeId ==='1':
      default:
        return this.once();
    }
  }

  public once() {
    return this.todayInMs;
  }
  // type refers to repetition type
  // type = week -> it will repeat on the choosed week days
  // type = month -> it will repeat on the choosed month days
  public daily(type: string = 'week') {
    return { type: type, repeatDays: [0, 1, 2, 3, 4, 5, 6] };
  }

  public monToFri(type: string = 'week') {
    return { type: type, repeatDays: [1, 2, 3, 4, 5] };
  }

  public weekend(type: string = 'week') {
    return { type: type, repeatDays: [6, 0] };
  }

  public firstOfMonth(type: string = 'month') {
    return { type: type, repeatDays: [1] };
  }

  public lastOfMonth(type: string = 'month') {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const lastDayOfCurrentMonth = calculateMonthDaysNumber(
      year,
      month
    ).numOfDays;
    return { type: type, repeatDays: [lastDayOfCurrentMonth] };
  }

  public custom(type: string = 'week', repeatDays: number[]) {
    return { type: type, repeatDays };
  }
}

export default StringToDate;
