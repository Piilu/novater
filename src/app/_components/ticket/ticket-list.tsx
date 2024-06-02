"use client";

import React, { useState } from 'react'
import TicketItem from './ticket-item'
import { api } from '~/trpc/react';
import SimpleSelect from '../ui/simple-select';
import DirectionArrow from '../ui/direction-arrow';
import SelectSearch from '../ui/select-search';
import { FilterIcon, Search, SortAsc, SortDesc } from 'lucide-react';
import type { Ticket } from '@prisma/client';
import type { SortType, SortValue, TicketModelData } from '~/lib/type';
import { date } from '~/lib/date';
import useQuery, { QueryNames } from '~/hooks/use-query';
import { useDebounce } from 'use-debounce';
import { Button } from '../ui/button';
import RecommendedRoutes from './recommended-routes';
import Checkout from '../reservation/checkout';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const sortValues =
  [
    { name: "Price", value: "price" },
    { name: "Distance", value: "distance" },
    { name: "Travel time", value: "travel_time" }
  ]

type TicketListProps = {
  currentTicket: Ticket,
  storedTickets: TicketModelData[]
}

export default function TicketList(props: TicketListProps)
{
  const { currentTicket, storedTickets } = props;
  const [filters, setFilters] = useState<string[]>([]);
  const [sortValue, setSortValue] = useState<SortValue>("price");
  const [sortType, setSortType] = useState<SortType>("asc");
  const [list] = useAutoAnimate();

  const { updateValue, from, to } = useQuery();
  const [selectedId, setSelectedId] = useState<string>(currentTicket.id);
  const [debounceFilters] = useDebounce(filters, 500);
  const [debounceSortType] = useDebounce(sortType, 500);

  const tickets = api.ticket.routes.useQuery({
    to: to ?? "",
    form: from ?? "",
    id: selectedId,
    filters: debounceFilters,
    sortType: debounceSortType,
    sortValue,
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
        <div className="flex items-center h-[2.26em]">
          <SimpleSelect
            onValueChange={(value) => setSortValue(value as SortValue)}
            value={sortValue}
            data={sortValues}
            triggerClassName='w-[200px]' placeholder='Sort' />
          <Button
            onClick={() => sortType === "asc" ? setSortType("desc") : setSortType("asc")}
            className="transition"
            variant="ghost"
            size="icon" >
            {sortType === "asc" ?
              <SortAsc className="h-5 w-5" />
              : <SortDesc className="h-5 w-5" />}
          </Button>
        </div>
        <span className='ml-auto flex items-center gap-3 relative'>
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
      <div ref={list} className='flex flex-col gap-3 mt-3'>
        {tickets.data?.map((item, index) =>
        {
          return (
            <TicketItem item={item} key={index + "test"} />
          )
        })}
        {tickets.isLoading && <p className='text-center'>Loading ...</p>}
        {tickets.data?.length === 0 &&
          <div className='flex flex-col items-center'>
            <Search className="w-16 h-16" />
            <p className='text-center text-xl font-semibold'>Nothing to show </p>
          </div>
        }

        {from && to ?
          <RecommendedRoutes
            from={from}
            to={to}
            ticketId={selectedId}
            enabled={tickets.data?.length == 0 && filters.length == 0} />

          : null}
      </div>
      <Checkout ticket={currentTicket} className="fixed bottom-4 w-full inset-x-0 mx-auto" />
    </div>
  )
}
