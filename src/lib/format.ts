function price(value: number | string)
{
  return new Intl.NumberFormat("et", { style: "currency", currency: "EUR" }).format(parseFloat(value.toString()))
}

//in km
function distance(value: number | string)
{

  return new Intl.NumberFormat("et", { style: "unit", unit: 'kilometer' }).format(parseInt(value.toString()))
}

export const format = {
  price,
  distance
}
