export default function classLoader<T>(data: object, className: string, opts: any) {
  // @ts-ignore
  if (data[className] === undefined || data[className] === null) {
    return null;
  }
  // @ts-ignore
  return <T> new data[className](opts);
}
