
const knownErrorCodes =
  [
    "TICKET_EXPIRED",
    "RESERVATION_INVALID",
    "INTERNAL_SERVER_ERROR"
  ];

const text = {
  TICKET_EXPIRED: "Ticket has expired",
  RESERVATION_INVALID: "Reservation content is not valid",
  INTERNAL_SERVER_ERROR: "Something went wrong. Please try again"
}

function getTranslatedError(errorCode: string)
{
  if (!knownErrorCodes.includes(errorCode)) return errorToText("INTERNAL_SERVER_ERROR");
  return  errorToText(errorCode as keyof typeof text);
}

function errorToText(errorCode: keyof typeof text)
{
  const translation = text[errorCode];
  return translation;
}

export const errorHelper =
{
  text,
  knownErrorCodes,
  errorToText,
  getTranslatedError
}
