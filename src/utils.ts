export function objectToQueryParams(obj: Record<string, string | number>) {
  return Object.keys(obj)
    .map((key) => key + '=' + obj[key])
    .join('&');
}
