import { RouteTicketRawData } from "~/lib/type"
import { db } from "../db"
import { unknown } from "zod"

async function places(ticketId: string)
{
  return await db.routeData.findMany({
    select: {
      name: true,
    },
    distinct: "name",
    where: {
      ticketId: ticketId
    }
  })
}

async function findRoutes(
  from: string,
  to: string,
  ticketId: string,
)
{
  return await db.route.findMany({
    include: {
      from: true,
      to: true,
      ticket: true,
      schedule: {
        include: {
          company: true,
        }
      }
    },
    where: {
      ticketId: ticketId,
      to: {
        name: to
      },
      from: {
        name: from,
      }
    }
  }) as unknown as RouteTicketRawData[]
}

export const routeRepository = {
  places,
  findRoutes
}