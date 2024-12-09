// this function tries to format string that should be in a datetime format,
// if it's an invalid datetime, returns original value
export function formatDateTimeString(datetime: string): string {
  const date = new Date(datetime);
  return date ? date.toLocaleString() : datetime;
}
