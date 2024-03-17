export const bf1MapOptionKeys = [
  "suez",
  "sinai desert",
  "monte grappa",
  "st quentin scar",
  "giant's shadow",
  "empire's edge",
  "fao fortress",
  "ballroom blitz",
  "amiens",
  "argonne forest",
  "rupture",
  "nivelle nights",
  "prise de tahure",
  //they shell not pass
  "verdun heights",
  "fort de vaux",
  "soissons",
  //in the name of the tsar
  "tsaritsyn",
  "volga river",
  "łupków pass",
  "albion",
  "galicia",
  "brusilov keep",
  //turning tides
  "cape helles",
  "achi baba",
  "heligoland bight",
  "zeebrugge",
  //apocalypse
  "passchendaele",
  "caporetto",
  "river somme",
] as const;

export type Ibf1MapOptionKeys = (typeof bf1MapOptionKeys)[number];
