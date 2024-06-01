import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getError } from "~/server/errorUtils";
import { ticketService } from "~/server/service/ticket-service";

export const ticketRouter = createTRPCRouter({

  places: publicProcedure
    .input(z.string().optional())
    .query(async ({ input }) =>
    {
      try
      {
        const ticketId = !input ? (await ticketService.getValid()).id : input;
        return await ticketService.getPlaces(ticketId);
      }
      catch (error: unknown)
      {
        throw new Error(getError(error));
      }
    }),

  valid: publicProcedure
    .query(async () =>
    {
      try
      {
        return await ticketService.getValid();
      }
      catch (error: unknown)
      {
        throw new Error(getError(error))
      }
    }),

  routes: publicProcedure
    .input(z.object({
      form: z.string(),
      to: z.string(),
      id: z.string().optional(),
    }))
    .query(async ({ input }) =>
    {
      try
      {
        const ticketId = !input.id ? (await ticketService.getValid()).id : input.id;
        return await ticketService.getRoutes(input.form, input.to, ticketId);
      }
      catch (error: unknown)
      {
        throw new Error(getError(error))
      }
    }),
});
