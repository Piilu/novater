import { NextResponse } from "next/server"
import { ticketService } from "~/server/service/ticket-service"

export  const GET = async () =>
{
  const ticket = await ticketService.getValid();
  const data = await ticketService.getMultiRoutes("Tallinn", "Pärnu",[], ticket.id)
  return NextResponse.json(data);
}
