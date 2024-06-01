import type { TicketData } from "~/lib/type";
import { db } from "../db";



async function create(data: TicketData)
{
  return await db.ticket.create({
    data: {
      id: data.id,
      expires: data.expires,
      schedules: {
        createMany: {
          data: data.schedules
        },
      },
      companies: {
        createMany: {
          data: data.companies
        },
      },
      routes: {
        createMany: {
          data: data.routes
        },
      },
      routeData: {
        createMany: {
          data: data.routeData
        },
      }
    }
  })
}


async function count()
{
  return await db.ticket.count();
}

async function findById(id: string,)
{
  return await db.ticket.findUnique({
    where: {
      id: id,
    }
  });
}

async function findOldest()
{
  return await db.ticket.findFirst({
    orderBy: {
      expires: "asc"
    },
  })
}

async function remove(id: string)
{
  return await db.ticket.delete({
    where: {
      id: id
    },
  })
}

async function removeByDate(date: Date)
{
  await db.ticket.deleteMany({
    where: {
      createdAt: {
        lte: date
      }
    }
  })
}

export const ticketRepository = {
  create,
  count,
  findById,
  findOldest,
  removeByDate,
  remove,
}
