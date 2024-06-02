"use client";

import React, { useState } from 'react'
import TicketItem from './ticket-item'
import { api } from '~/trpc/react';
import SimpleSelect from '../ui/simple-select';
import DirectionArrow from '../ui/direction-arrow';
import SelectSearch from '../ui/select-search';
import { FilterIcon } from 'lucide-react';
import type { Ticket } from '@prisma/client';
import type { TicketModelData } from '~/lib/type';
import { date } from '~/lib/date';
import useQuery, { QueryNames } from '~/hooks/use-query';
import { useDebounce } from 'use-debounce';


type TicketListProps = {
  currentTicket: Ticket,
  storedTickets: TicketModelData[]
}

export default function TicketList(props: TicketListProps)
{
  const { currentTicket, storedTickets } = props;
  const { updateValue, from, to } = useQuery();
  const [filters, setFilters] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string>(currentTicket.id);
  const [debounceFilters] = useDebounce(filters, 500);

  const tickets = api.ticket.routes.useQuery({
    to: to ?? "",
    form: from ?? "",
    id: selectedId,
    filters:debounceFilters,
  }, { refetchOnWindowFocus: false, enabled: to !== "" && from !== "" })

  const places = api.ticket.places.useQuery(selectedId, { refetchOnWindowFocus: false, });
  const companyNames = api.ticket.companyNames.useQuery(selectedId, { refetchOnWindowFocus: false, })

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center w-full'>
        <SimpleSelect
          isLoading={places.isLoading}
          data={places.data?.filter(item => item.value !== to)}
          onValueChange={(value) => updateValue(value, QueryNames.FROM)}
          placeholder='Origin'
          value={from} />
        <DirectionArrow className='h-[2.3em] mt-auto' />
        <SimpleSelect
          isLoading={places.isLoading}
          data={places.data?.filter(item => item.value !== from)}
          onValueChange={(value) => updateValue(value, QueryNames.TO)}
          placeholder="Destination"
          value={to} />
      </div>
      <div className="flex flex-row">
        <SelectSearch
          placeholder='Filters'
          icon={<FilterIcon className="h-4 w-4" />}
          onValueChange={(filters) => setFilters(filters)}
          selected={filters} options={companyNames.data ?? []} />

        <span className='ml-auto flex items-center gap-2 relative'>
          <SimpleSelect
            id="ticket"
            data={storedTickets.map(item => { return { value: item.id, name: `Valid until ${date.getDate(item.expires)}`, isValid: item.isValid } })}
            onValueChange={(value) => setSelectedId(value)}
            placeholder="Tickets"
            value={selectedId} />
          {
            <small className='absolute right-0 text-xs -bottom-4'>Found <b>{tickets.data?.length ?? 0}</b> route(s)</small>
          }
        </span>
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
