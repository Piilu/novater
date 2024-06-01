
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc);

function getRawTimeBetween(start: string | Date, end: string | Date)
{
  return dayjs(end).diff(start, "minutes").toString();
}

function getTime(value: string | Date)
{
  return dayjs(value).format("HH:mm");
}

function getDate(value: string | Date)
{
  return dayjs(value).format("D MMMM YYYY");
}

function convertToDate(value: string | Date)
{
  return dayjs(value).toDate();
}

function now()
{
  return dayjs().toDate();
}

export const date = {
  getTime,
  getDate,
  convertToDate,
  now,
  getRawTimeBetween,
}
