export function getError(error: unknown)
{
  if (error instanceof Error)
  {
    switch (error.message)
    {
      case ERRORS.TICKET_EXPIRED:
        return ERRORS.TICKET_EXPIRED;
      case ERRORS.RESERVATION_INVALID:
        return ERRORS.RESERVATION_INVALID;
    }
  }
  return ERRORS.INTERNAL_SERVER_ERROR;
}


export const ERRORS =
{
  TICKET_EXPIRED: "TICKET_EXPIRED",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  RESERVATION_INVALID: "RESERVATION_INVALID"
}
