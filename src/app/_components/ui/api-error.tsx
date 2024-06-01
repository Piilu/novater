"use client";
import React from 'react'
import { Frown } from "lucide-react";
import { Button } from './button';

export default function ApiError()
{
  return (
    <div className="h-96 flex flex-col items-center justify-center">
      <Frown className="h-16 w-16" />
      <h2 className="font-semibold text-xl">Whoops!!</h2>
      <p className="mb-5">Seems like we do not sell tickets anymore</p>
      <Button onClick={() => window.location.reload()}>Check again</Button>
    </div>
  )
}