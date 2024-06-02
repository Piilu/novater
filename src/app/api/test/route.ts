import { NextResponse } from "next/server"
import { ticketService } from "~/server/service/ticket-service"
import { routeRepository } from "~/server/repository/route-repository"

export  const GET = async () =>
{
  const ticket = await ticketService.getValid();
  const data = await routeRepository.searchRoutes("Tallinn", "Rapla", ticket.id)
  return NextResponse.json(data);
}
