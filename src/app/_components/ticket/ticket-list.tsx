"use client";

import React, { useState } from 'react'
import TicketItem from './ticket-item'
import { api } from '~/trpc/react';
import SimpleSelect from '../ui/simple-select';
import DirectionArrow from '../ui/direction-arrow';

export default function TicketList()
{
  const [to, setTo] = useState<string>("");
  const [from, setFrom] = useState<string>("");

  const tickets = api.ticket.routes.useQuery({
    to: to,
    form: from,

  }, { refetchOnWindowFocus: false, enabled: to !== "" && from !== "" })
  const places = api.ticket.places.useQuery(undefined, { refetchOnWindowFocus: false, });
  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center w-full'>
        <SimpleSelect
          isLoading={places.isLoading}
          data={places.data?.filter(item => item.value !== to)}
          onValueChange={(value) => setFrom(value)}
          placeholder='Origin'
          value={from} />
        <DirectionArrow className='h-[2.3em] mt-auto' />
        <SimpleSelect
          isLoading={places.isLoading}
          data={places.data?.filter(item => item.value !== from)}
          onValueChange={(value) => setTo(value)}
          placeholder="Destination"
          value={to} />
      </div>

      <div className='flex flex-col gap-3'>
        {tickets.data?.map((item, index) =>
        {
          return (
            <TicketItem item={item} key={index + "test"} />
          )
        })}
        {tickets.isLoading && <p>Loading ...</p>}
      </div>
    </div>
  )
}
