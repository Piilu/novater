import type { RouteTicketRawData, SortType, SortValue } from "~/lib/type"
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
  sortType?: SortType,
  sortValue?: SortValue,
)
{
  return await db.route.findMany({
    include: {
      from: true,
      to: true,
      ticket: true,
      schedule: {
        orderBy: {
          price: sortValue === "price" ? sortType : undefined,
          travelTime: sortValue === "travel_time" ? sortType : undefined,
        },
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
    orderBy: {
      distance: sortValue === "distance" ? sortType : undefined,
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
          from: true,
          to: true,
        },
        where: {
          ticketId:ticketId,
          from: {
            name: currentLocation,
          }
        }
      })

      for (const route of routes)
      {
        if (!routePath.includes(route.to.name))
        {
          await search(route.to.name)
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