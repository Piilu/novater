import type
{
  Company,
  Route,
  RouteData,
  Schedule,
  Ticket
}
  from "@prisma/client"
import { z } from "zod"

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
export interface LocalTicket
{
  amount: number,
  ticket: TicketTravelData,
}

export interface TicketModelData
{
  isValid: boolean;
  id: string;
  expires: Date;
  createdAt: Date;
}

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

//#region RESERVATION
export const reservationSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  totalPrice: z.string(),
  totalTravelTime: z.number(),
  schedules: z.array(z.object({
    id: z.string(),
    amount: z.number()
  })).optional(),
  tickets: z.array(z.string()).optional(),
})

export type ReservationSchema = z.infer<typeof reservationSchema>


export interface ReservationModel
{
  id: number,
  firstName: string,
  lastName: string,
  totalPrice: string,
  totalTravelTime: string,
  createdAt: Date,
  tickets: ReservationTicketData[],
  ticket: Ticket,
  ticketId: string,
}

export interface ReservationTicketData
{
  id: number,
  amount:number,
  createdAt: Date,
  schedule: Schedule & {
    company: Company,
    route: Route & {
      from: RouteData,
      to: RouteData,
    },
  }
}
//#endregion

//#region  SORT
export const sortType = z.enum(["asc", "desc"]).optional();
export type SortType = z.infer<typeof sortType>;

export const sortValue = z.enum(["price", "distance", "travel_time"]).optional();
export type SortValue = z.infer<typeof sortValue>;
//#endregion
