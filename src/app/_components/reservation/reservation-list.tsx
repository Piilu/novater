"use client";
import { type Ticket } from '@prisma/client';
import React, { useState } from 'react'
import { api } from '~/trpc/react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { type TicketModelData } from '~/lib/type';
import SimpleSelect from '../ui/simple-select';
import { date } from '~/lib/date';
import { useDebounce } from 'use-debounce';


type ReservationListProps = {
  ticket: Ticket,
  storedTickets: TicketModelData[]
}
export default function ReservationList(props: ReservationListProps)
{
  const { ticket, storedTickets } = props;
  const [selectedId, setSelectedId] = useState<string>(ticket.id);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [debaunceFirstName] = useDebounce(firstName, 500);
  const [debaunceLastName] = useDebounce(lastName, 500);
  const reservations = api.reservation.getAll.useQuery({
    firstName: debaunceFirstName,
    lastName: debaunceLastName,
    ticketId: ticket.id
  });
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <div>
          <Label htmlFor='firstname'>First name</Label>
          <Input id='firstname' onChange={(e) => setFirstName(e.target.value)} placeholder='First name' />
        </div>

        <div>
          <Label htmlFor='lastname'>Last name</Label>
          <Input id="lastname" onChange={(e) => setLastName(e.target.value)} placeholder='Last name' />
        </div>
        <div>
          <Label htmlFor='ticket'>Ticket</Label>
          <SimpleSelect
            id="ticket"
            data={storedTickets.map(item => { return { value: item.id, name: date.getDate(item.expires), isValid: item.isValid } })}
            onValueChange={(value) => setSelectedId(value)}
            placeholder="Tickets"
            value={selectedId} />

          <small className='right-0 text-xs -bottom-4'>Found <b>{reservations.data?.length ?? 0}</b> reservation(s)</small>
        </div>
      </div>
    </div>
  )
}
