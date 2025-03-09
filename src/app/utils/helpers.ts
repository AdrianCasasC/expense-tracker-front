export const daysInMonth = (year?: number, month?: number): number => {
  var now = new Date();

  if (year && month) {
    return new Date(year, month, 0).getDate();
  }
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
};
