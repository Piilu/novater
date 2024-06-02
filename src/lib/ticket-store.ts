import { toast } from "react-toastify"
import { type LocalTicket, type TicketTravelData } from "./type";
import { errorHelper } from "./error";
import { getError } from "~/server/errorUtils";

function add(ticket: TicketTravelData, tickets: LocalTicket[]) 
{
  try
  {
    const existingTicket = findFrom(ticket, tickets);

    if (existingTicket)
    {
      const index = tickets.indexOf(existingTicket);
      existingTicket.amount++;
      tickets.splice(index, 1, existingTicket)
      return tickets
    }

    const newTicket = getNewItem(ticket);
    tickets.push(newTicket);
    return tickets;
  }
  catch (error: unknown)
  {
    toast.error(errorHelper.getTranslatedError(getError(error)))
    clear();
    return [] as LocalTicket[]
  }
}

function remove(ticket: TicketTravelData, tickets: LocalTicket[])
{
  try
  {
    const localTicket = findFrom(ticket, tickets);
    if (localTicket)
    {
      const index = tickets.indexOf(localTicket);
      localTicket.amount === 1 ? tickets.splice(index, 1) : localTicket.amount--;
      return tickets;
    }
    return tickets;
  }
  catch(error:unknown)
  {
    toast.error(errorHelper.getTranslatedError(getError(error)))
    clear();
    return [] as LocalTicket[];
  }
}

function findFrom(ticket: TicketTravelData, tickets: LocalTicket[]) 
{
  try
  {

    return tickets?.find(item =>
      item.ticket.schedule.id === ticket.schedule.id
      &&
      item.ticket.schedule.routeId === ticket.schedule.routeId);
  }
  catch(error:unknown)
  {
    toast.error(errorHelper.getTranslatedError(getError(error)))
    clear();
  }
}

function currentItems(currentId: string, tickets: LocalTicket[])
{
  try
  {
    return tickets.filter(item=>item.ticket.ticket.id===currentId);
  }
  catch
  {
    clear();
    return [] as LocalTicket[]
  }
}

function clear()
{
  window.localStorage.clear();
}

function getNewItem(ticket: TicketTravelData)
{
  return {
    amount: 1,
    ticket,
  } as LocalTicket;
}


export const ticketStore = {
  clear,
  add,
  findFrom,
  getNewItem,
  remove,
  currentItems
}
