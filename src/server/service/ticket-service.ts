import type { RouteTicketRawData, SortType, SortValue, TicketModelData, TicketTravelData } from "~/lib/type";
import { routeRepository } from "../repository/route-repository";
import { ticketRepository } from "../repository/ticket-repository";
import { importService } from "./import-service";
import { date } from "~/lib/date";

async function getValid()
{
  const validId = await importService.getApiTicketId();
  const ticket = await ticketRepository.findById(validId);
  if (!ticket) return await importService.saveApiData();
  return ticket;
}

async function getPlaces(id: string)
{
  const routes = await routeRepository.places(id);
  return routes.map(item =>
  {
    return {
      name: item.name,
      value: item.name
    }
  })
}

async function getRoutes(
  from: string,
  to: string,
  filters: string[],
  ticketId: string,
  sortType?: SortType,
  sortValue?: SortValue,
)
{
  const rawData = await routeRepository.findRoutes(from, to, filters, ticketId, sortType, sortValue);
  return extractedData(rawData);
}

function extractedData(data: RouteTicketRawData[])
{

  return data.flatMap(item =>
  {
    return item.schedule.map(schedule =>
    {
      return {
        id: item.id,
        distance: item.distance,
        schedule,
        ticket: item.ticket,
        from: item.from,
        to: item.to,

      } as TicketTravelData
    });
  })
}

async function getExpired()
{
  const tickets = await ticketRepository.findAllExcept();

  return tickets.map(item =>
  {
    return {
      ...item,
      isValid: item.expires >= date.now(),
    } as TicketModelData

  })
}

export const ticketService =
{
  getValid,
  getPlaces,
  getRoutes,
  getExpired,
  extractedData,
}
