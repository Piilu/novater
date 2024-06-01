import type
{
  Company,
  Route,
  RouteData,
  Schedule,
  Ticket
}
  from "@prisma/client"

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
  routes: ApiRoute[]
}

export interface ApiRoute
{
  id: string,
  from: ApiRouteData,
  to: ApiRouteData,
  distance: number,
  schedule: ApiSchedule[]
}

export interface ApiRouteData
{
  id: string,
  name: string,
}

export interface ApiSchedule
{
  id: string,
  price: number,
  start: CustomDate,
  end: CustomDate,
  company: ApiCompany
}

export interface ApiCompany
{
  id: string,
  state: string,
}

//#endregion


//#region TICKET DATA
export interface TicketData
{
  id: string
  expires: Date,
  schedules: Schedule[]
  companies: Company[]
  routes: Route[]
  routeData: RouteData[]
}


export interface RouteTicketRawData
{
  id: string,
  distance: string,
  schedule: Schedule & {
    company: {
      id: string;
      state: string;
      ticketId: string | null;
    }
  }[]
  from: RouteData,
  to: RouteData,
  ticket: Ticket,
}

export interface TicketTravelData
{
  id: string,
  distance: string,
  schedule: Schedule & {
    company: {
      id: string;
      state: string;
      ticketId: string | null;
    }
  }
  from: RouteData,
  to: RouteData,
  ticket: Ticket,
}

//#endregion