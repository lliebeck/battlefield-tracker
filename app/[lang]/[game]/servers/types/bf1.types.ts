export const bf1MapOptions = [
  "Suez",
  "Sinai Desert",
  "Monte Grappa",
  "St Quentin Scar",
  "Giant's Shadow",
  "Empire's Edge",
  "Fao Fortress",
  "Ballroom Blitz",
  "Amiens",
  "Argonne Forest",
  "Rupture",
  "Nivelle Nights",
  "Prise de Tahure",
  //They Shell Not Pass
  "Verdun Heights",
  "Fort De Vaux",
  "Soissons",
  //In The Name Of The Tsar
  "Tsaritsyn",
  "Volga River",
  "Łupków Pass",
  "Albion",
  "Galicia",
  "Brusilov Keep",
  //Turning Tides
  "Cape Helles",
  "Achi Baba",
  "Heligoland Bight",
  "Zeebrugge",
  //Apocalypse
  "Passchendaele",
  "Caporetto",
  "River Somme",
];

export const bf1MapOptionsKeys = {
  suez: {},
  "sinai desert": {},
  "monte grappa": {},
  "st quentin scar": {},
  "giant's shadow": {},
  "empire's edge": {},
  "fao fortress": {},
  "ballroom blitz": {},
  amiens: {},
  "argonne forest": {},
  rupture: {},
  "nivelle nights": {},
  "prise de tahure": {},
  //they shell not pass
  "verdun heights": {},
  "fort de vaux": {},
  soissons: {},
  //in the name of the tsar
  tsaritsyn: {},
  "volga river": {},
  "łupków pass": {},
  albion: {},
  galicia: {},
  "brusilov keep": {},
  //turning tides
  "cape helles": {},
  "achi baba": {},
  "heligoland bight": {},
  zeebrugge: {},
  //apocalypse
  passchendaele: {},
  caporetto: {},
  "river somme": {},
} as const;

export type Ibf1MapOptionsKeys = keyof typeof bf1MapOptionsKeys;
