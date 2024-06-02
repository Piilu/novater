import type { ReservationSchema } from "~/lib/type";

async function findAll(
  firstName: string,
  lastname: string,
  ticketId: string,
)
{
  return [];
}


async function create(data: ReservationSchema)
{
  return [];
}

export const reservationRepository = {
  findAll,
  create,
}
