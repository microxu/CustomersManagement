export function isNotNull<T>(o?: T | null | void | undefined): o is T {
  return o != null;
}
