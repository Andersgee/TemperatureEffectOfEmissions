export const clamp = (x, a, b) => Math.max(a, Math.min(x, b));
export const mix = (a, b, t) => a * (1 - t) + b * t;
export const first = (v) => v[0];
export const last = (v) => v[v.length - 1];
