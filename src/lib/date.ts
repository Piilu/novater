
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc);

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
}
