export const bf5MapOptionKeys = [
  "aerodrome",
  "arras",
  "devastation",
  "fjell 652",
  "hamada",
  "narvik",
  "rotterdam",
  "twisted steel",
  "panzerstorm",
  "mercury",
  "marita",
  "lofoten islands",
  "provence",
  "operation underground",
  "iwo jima",
  "pacific storm",
  "wake island",
  "solomon islands",
  "al marj encampment",
  "al sudan",
] as const;

export type Ibf5MapOptionKeys = (typeof bf5MapOptionKeys)[number];
