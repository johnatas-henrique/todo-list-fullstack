function to2Digits(value) {
  const valueString = String(value);
  return valueString.length === 1 ? `0${valueString}` : valueString;
}

export function formatDateToDashes(date) {
  const [day, month, year] = date.split('/');
  return `${year}-${to2Digits(month)}-${day}`;
}

export function formatDateToBR(date) {
  const [year, month, day] = date.split('-');
  return `${year}/${to2Digits(month)}/${day}`;
}

export function getTodayWithDashes() {
  const today = new Date().toLocaleDateString();

  return formatDateToDashes(today);
}
