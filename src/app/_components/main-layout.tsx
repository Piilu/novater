"use client";
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import TicketList from './ticket/ticket-list'
import { type Ticket } from '@prisma/client'
import ReservationList from './reservation/reservation-list'
import { type TicketModelData } from '~/lib/type'
import useQuery, { QueryNames } from '~/hooks/use-query';

type MainLayoutProps = {
  ticket: Ticket;
  storedTickets: TicketModelData[];
}

export default function MainLayout(props: MainLayoutProps)
{
  const { ticket, storedTickets } = props;
  const { updateValue, tab } = useQuery();

  return (
    <Tabs defaultValue={tab}>
      <TabsList className='w-full h-16'>
        <TabsTrigger onClick={() => updateValue("home", QueryNames.TAB)} className="w-full py-4" value="home">Booking</TabsTrigger>
        <TabsTrigger onClick={() => updateValue("reservations", QueryNames.TAB)} className="w-full py-4" value="reservations">Reservations</TabsTrigger>
      </TabsList>
      <TabsContent value="home"><TicketList storedTickets={storedTickets} currentTicket={ticket} /></TabsContent>
      <TabsContent value="reservations"><ReservationList storedTickets={storedTickets} ticket={ticket} /></TabsContent>
    </Tabs>
  )
}
