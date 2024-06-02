import type { FromTo, RouteTicketRawData } from "~/lib/type"
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
  filters: string[],
  ticketId: string,
)
{
  return await db.route.findMany({
    include: {
      from: true,
      to: true,
      ticket: true,
      schedule: {
        where: {
          company: {
            state: {
              in: filters.length === 0 ? undefined : filters
            }
          }
        },
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
  const validPaths: FromTo[][] = [];
  const routePath: FromTo[] = [];
  const routeNamePath: string[] = [];

  await search(from);

  async function search(currentLocation: string, fromTo?: FromTo)
  {

    if (fromTo)
    {
      routePath.push(fromTo)
    }

    routeNamePath.push(currentLocation);

    if (currentLocation === to)
    {
      validPaths.push([...routePath]);
    }
    else
    {
      const routes = await db.route.findMany({
        select: {
          to: true,
          from: true,
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
        if (routeNamePath.filter(item => item === currentLocation).length < 2)
        {
          await search(route.to.name, { from: route.from.name, to: route.to.name });
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