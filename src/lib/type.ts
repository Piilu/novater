export interface CustomDate
{
  date: Date,
  timezone_type: 2,
  timezone: "Z"
}

//#region API TYPES

export interface ApiTicket
{
  id: string,
  expires: CustomDate,
}
//#endregion