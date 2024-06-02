import type { ReservationSchema } from "~/lib/type";
import { reservationRepository } from "../repository/reservation-repository"

async function getAll(
  firstName: string,
  lastname: string,
  ticketId: string,
)
{
  return await reservationRepository.findAll(firstName, lastname, ticketId);
}

async function create(data: ReservationSchema)
{
  return await reservationRepository.create(data);
}

export const reservationService = {
  getAll,
  create,
}
