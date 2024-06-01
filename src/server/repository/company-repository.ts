import { db } from "../db"

async function names(ticketId: string)
{
  return await db.company.findMany({
    select: {
      state: true,
    },
    distinct: "state",
    where: {
      ticketId: ticketId,
    }
  })
}

export const comapnyRepository = {
  names,
}