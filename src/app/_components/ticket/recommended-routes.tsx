"use client";
import React from 'react'
import { api } from '~/trpc/react';
import DirectionArrow from '../ui/direction-arrow';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';

type RecommendedRoutesProps = {
  enabled: boolean,
  ticketId: string,
  to: string,
  from: string,
}

export default function RecommendedRoutes(props: RecommendedRoutesProps)
{
  const { enabled, to, from, ticketId } = props;

  const routes = api.ticket.recommended.useQuery({ ticketId, to, from },
    {
      refetchOnWindowFocus: false,
      enabled: enabled,
    })
  if (!enabled) return null
  if(routes.data?.length==0) return null;
  return (
    <div className='flex flex-col items-center gap-2'>
      <Separator />
      <div className='flex gap-2 mb-5'>
        <p className="text-xl font-semibold opacity-55">Possible routes you can take</p>
      </div>
      {routes.data?.sort((a, b) => a.length - b.length)?.map((route, index) =>
      {
        return (
          <>
            {index !== 0 ? <Badge className="font-semibold text-[10px] p-[2px]">OR</Badge> : null}
            <div className='flex items-center justify-center'>
              {route.map((planet, index) =>
              {
                return (
                  <div className='flex flex-wrap' key={`${planet}-${index}`}>
                    <p>{planet}</p>
                    {index !== route.length - 1 && <DirectionArrow />}
                  </div>
                )
              })}
            </div>
          </>
        )
      })}
    </div>
  )
}
