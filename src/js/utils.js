export const clamp = (x, a, b) => Math.max(a, Math.min(x, b));
export const mix = (a, b, t) => a * (1 - t) + b * t;
export const first = (v) => v[0];
export const last = (v) => v[v.length - 1];

//["a","b","c"] => "a, b och c"
export function warningtext(names) {
  const last = names.splice(-1);
  if (names.length === 0) {
    return `The gas ${last} is not supported in this model. Ignoring it but still using the rest. Check the About page for a list of supported gas names.`;
  }
  return `The gases ${names.join(
    ", "
  )} and ${last} are not supported in this model. Ignoring them but still using the rest. Check the About page for a list of supported gas names.`;
}
