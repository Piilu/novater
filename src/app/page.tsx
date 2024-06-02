import { api } from "~/trpc/server";
import 'react-toastify/dist/ReactToastify.css';
import ApiError from "./_components/ui/api-error";
import MainLayout from "./_components/main-layout";

export default async function Home()
{
  try
  {
    const currentTicket = await api.ticket.valid();
    const storedTickets = await api.ticket.history();
    return (
      <MainLayout ticket={currentTicket} storedTickets={storedTickets} />
    );
  }
  catch (error: unknown)
  {
    return (
      <ApiError />
    )
  }
}

