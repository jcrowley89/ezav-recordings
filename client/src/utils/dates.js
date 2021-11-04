exports.formatMMDD = (date) => {
  const newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  const m = newDate.getMonth() + 1;
  const d = newDate.getDate();
  return m + "/" + d;
};

exports.fixTimeZone = (date) => {
  return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
}