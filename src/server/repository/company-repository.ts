import { db } from "../db"

async function names(ticketId: string)
{
  const data = await db.company.findMany({
    select: {
      state: true,
    },
    distinct: "state",
    where: {
      ticketId: ticketId,
    }
  })

  return data.map(item => item.state);
}

export const comapnyRepository = {
  names,
}