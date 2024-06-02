import type { ReservationSchema } from "~/lib/type";
import { reservationRepository } from "../repository/reservation-repository"
import { ticketService } from "./ticket-service";
import { ERRORS } from "../errorUtils";

async function getAll(
  firstName: string,
  lastName: string,
  ticketId: string,
)
{
  return await reservationRepository.findAll(firstName, lastName, ticketId);
}

async function create(data: ReservationSchema)
{
  const isValid = await validate(data);
  if (!isValid) throw new Error(ERRORS.RESERVATION_INVALID);
  return await reservationRepository.create(data);
}

async function validate(data: ReservationSchema)
{
  const validTicket = await ticketService.getValid();
  return data.tickets.length === data.tickets.filter(id => id === validTicket.id).length;
}

export const reservationService = {
  getAll,
  create,
  validate
}
