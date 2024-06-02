import { z } from "zod";
import { reservationSchema } from "~/lib/type";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getError } from "~/server/errorUtils";
import { reservationService } from "~/server/service/reservation-service";

export const reservationRouter = createTRPCRouter({

  create: publicProcedure
    .input(reservationSchema)
    .mutation(async ({ input }) =>
    {
      try
      {
        return await reservationService.create(input);
      }
      catch (error: unknown)
      {
        throw new Error(getError(error));
      }
    }),

  getAll: publicProcedure
    .input(z.object({
      firstName: z.string(),
      lastName: z.string(),
      ticketId: z.string(),
    }))
    .query(async ({ input }) =>
    {
      try
      {
        const firstName = input.firstName;
        const lastName = input.lastName;
        const ticketId = input.ticketId;
        return await reservationService.getAll(firstName, lastName, ticketId);
      }
      catch (error: unknown)
      {
        throw new Error(getError(error))
      }
    })

});
