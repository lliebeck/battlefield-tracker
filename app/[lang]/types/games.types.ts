export type Game = {
  key: string;
  name: string;
  available: boolean;
};

export const games: Game[] = [
  {
    key: "bf1",
    name: "Battlefield 1",
    available: true,
  },
  {
    key: "bf5",
    name: "Battlefield 5",
    available: false,
  },
  // Bf2042Search
  {
    key: "bf2042",
    name: "Battlefield 2042",
    available: false,
  },
  // ResponseType: BattlelogSearch
  {
    key: "bf3",
    name: "Battlefield 3",
    available: false,
  },
  // ResponseType: Bf4Search
  {
    key: "bf4",
    name: "Battlefield 4",
    available: false,
  },
  // ResponseType: Bf4Search
  {
    key: "bfh",
    name: "Battlefield Hardline",
    available: false,
  },
  //ResponseType: OlderTitleSearch
  {
    key: "bf1942",
    name: "Battlefield 1942",
    available: false,
  },
  {
    key: "bfv",
    name: "Battlefield Vietnam",
    available: false,
  },
  {
    key: "bf2",
    name: "Battlefield 2",
    available: false,
  },
  {
    key: "bf2142",
    name: "Battlefield 2142",
    available: false,
  },
];
