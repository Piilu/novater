import type { ReservationModel, ReservationSchema } from "~/lib/type";
import { db } from "../db";

async function findAll(
  firstName: string,
  lastName: string,
  ticketId: string,
)
{
  return await db.reservation.findMany({
    include: {
      ticket: true,
      tickets: {
        include: {
          schedule: {
            include: {
              company: true,
              route: {
                select: {
                  distance: true,
                  from: true,
                  to: true,
                }
              }
            }
          }
        }
      }
    },
    where: {
      ticketId: ticketId,
      firstName: firstName,
      lastName: lastName
    }
  }) as unknown as ReservationModel[]
}


async function create(data: ReservationSchema)
{
  return await db.reservation.create({
    data: {
      ticketId: data.tickets[0],
      firstName: data.firstName,
      lastName: data.lastName,
      totalPrice: data.totalPrice,
      totalTravelTime: "21",
      tickets: {
        createMany: {
          data: data.schedules.map(id => { return { scheduleId: id } })
        }
      }
    }
  })
}

export const reservationRepository = {
  findAll,
  create,
}
