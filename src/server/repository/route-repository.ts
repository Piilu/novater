import type { RouteTicketRawData } from "~/lib/type"
import { db } from "../db"

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

//#region DEEP SEARCH
async function searchRoutes(
  from: string,
  to: string,
  ticketId: string,
)
{
  const validPaths: string[][] = [];
  const routePath: string[] = [];

  await search(from);

  async function search(currentLocation: string)
  {

    routePath.push(currentLocation);

    if (currentLocation === to)
    {
      validPaths.push([...routePath]);
    }
    else
    {
      const routes = await db.route.findMany({
        select: {
          to: {
            select: {
              name: true
            }
          }
        },
        where: {
          ticketId: ticketId,
          from: {
            name: currentLocation
          }
        }
      });

      for (const route of routes)
      {
        if (routePath.filter(item => item === currentLocation).length < 2)
        {
          await search(route.to.name);
        }
      }
    }
    routePath.pop();
  }

  return validPaths;
}
//#endregion

export const routeRepository = {
  places,
  findRoutes,
  searchRoutes
}