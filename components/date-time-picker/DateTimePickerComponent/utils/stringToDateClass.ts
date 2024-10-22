class StringToDate {
  private today = new Date();
  private todayInMs = this.today.getTime();

  get timeInMs() {
    return this.once();
  }

  protected once() {
    return this.todayInMs;
  }
}

export default StringToDate;
