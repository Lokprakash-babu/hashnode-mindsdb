const DateFormatter = (dateString) => {
  const date = new Date(dateString);
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  return y + "-" + m + "-" + (d <= 9 ? "0" + d : d);
};

export default DateFormatter;
