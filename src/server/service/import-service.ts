import type { Company, Route, RouteData, Schedule } from "@prisma/client";
import axios from "axios"
import { TicketData, type ApiTicket } from "~/lib/type"
import { ticketRepository } from "../repository/ticket-repository";


async function getApiTicketId()
{
  const data = (await axios.get("https://assignments.novater.com/v1/bus/schedule", {
    auth: {
      username: process.env.API_NAME ?? "",
      password: process.env.API_PASSWORD ?? "",
    }
  })).data as ApiTicket;

  return data.id;
}

async function removOldTickets(count: number)
{
  const currentCount = await ticketRepository.count();

  if (currentCount > count)
  {
    const oldTicket = await ticketRepository.findOldest();
    if (!oldTicket) return false;
    await ticketRepository.removeByDate(oldTicket.createdAt);
  }
}

async function getApiData()
{
  const data = (await axios.get("https://assignments.novater.com/v1/bus/schedule", {
    auth: {
      username: process.env.API_NAME ?? "",
      password: process.env.API_PASSWORD ?? "",
    }
  })).data as ApiTicket;

  const routes = getRoutes(data);
  const routeData = getRouteData(data);
  const schedules = getSchedules(data);
  const companies = getCompanies(data);

  return {
    id: data.id,
    expires: data.expires.date,
    schedules,
    routes,
    routeData,
    companies,
  } as TicketData
}

async function saveApiData()
{
  removOldTickets(15).catch(() => console.log("Uups"))
  const data = await getApiData();

  const currentTicket = await ticketRepository.findById(data.id);
  if (!currentTicket) return await ticketRepository.create(data);
  return currentTicket;
}

//#region HELPERS
function getRoutes(data: ApiTicket)
{
  return data.routes.map(item =>
  {
    return {
      id: item.id,
      distance: item.distance.toString(),
      fromId: item.from.id,
      toId: item.to.id,
      ticketId: data.id

    } as Route
  })
}

function getRouteData(data: ApiTicket)
{
  return data.routes.flatMap(item =>
  {
    const routeFrom = {
      id: item.from.id,
      name: item.from.name,
      ticketId: data.id
    } as RouteData

    const routeTo = {
      id: item.to.id,
      name: item.to.name,
      ticketId: data.id
    } as RouteData

    return [{ ...routeFrom }, { ...routeTo }]
  })
}

function getSchedules(data: ApiTicket)
{
  return data.routes.flatMap(item =>
  {
    return item.schedule.map(schedule =>
    {
      return {
        id: schedule.id,
        price: schedule.price,
        start: schedule.start.date,
        end: schedule.end.date,
        companyId: schedule.company.id,
        ticketId: data.id,
      } as Schedule
    })
  })
};

function getCompanies(data: ApiTicket)
{

  return data.routes.flatMap(item =>
  {
    const companies = item.schedule.map(schedule => schedule.company);

    return companies.map(company =>
    {
      return {
        id: company.id,
        state: company.state,
        ticketId: data.id,
      } as Company
    })
  })
}

//#endregion

export const importService = {
  getApiData,
  saveApiData,
  removOldTickets,
  getApiTicketId,
}