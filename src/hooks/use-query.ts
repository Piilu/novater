import
{
  usePathname,
  useRouter,
  useSearchParams
}
  from 'next/navigation';
export enum QueryNames
{
  TAB = "tab",
  FROM = "from",
  TO = "to"
}

export default function UseQuery()
{
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const tab = searchParams.get(QueryNames.TAB) ?? undefined as string | undefined;
  const from = searchParams.get(QueryNames.FROM) ?? undefined as string | undefined;
  const to = searchParams.get(QueryNames.TO) ?? undefined as string | undefined;

  const updateValue = (value: string, queryName: QueryNames) =>
  {
    const current = new URLSearchParams(searchParams);

    switch (queryName)
    {
      case QueryNames.TAB:
        current.set(QueryNames.TAB, value);
        break;
      case QueryNames.FROM:
        current.set(QueryNames.FROM, value);
        break;
      case QueryNames.TO:
        current.set(QueryNames.TO, value);
        break;
    }

    const queryString = current.toString();
    router.push(`${pathname}?${queryString}`)
  }


  return { from, to, tab: tab !== "reservations" && tab !== "home" ? "home" : tab, updateValue }
}
