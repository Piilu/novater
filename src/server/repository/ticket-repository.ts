import type { TicketData } from "~/lib/type";
import { db } from "../db";

async function create(data: TicketData)
{
  return await db.ticket.create({
    data: {
      id: data.id,
      expires: data.expires,
      companies: {
        createMany: {
          data: data.companies
        },
      },
      routeData: {
        createMany: {
          data: data.routeData
        },
      },
      routes: {
        createMany: {
          data: data.routes
        },
      },
      schedules: {
        createMany: {
          data: data.schedules
        },
      },
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

async function findAllExcept(id?: string)
{
  return await db.ticket.findMany(
    {
      orderBy:
      {
        expires: "desc"
      },
      where: {
        id: { not: id }
      }

    });
}

export const ticketRepository = {
  create,
  count,
  findById,
  findOldest,
  findAllExcept,
  removeByDate,
  remove,
}
