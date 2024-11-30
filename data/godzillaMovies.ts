export interface GodzillaMovie {
  title: string;
  year: number;
  era: 'Showa' | 'Heisei' | 'Millennium' | 'MonsterVerse' | 'Reiwa';
  tone: 'Serious' | 'Campy' | 'Balanced';
  humanFocus: number; // 1-5 scale, 1 being monster-focused, 5 being human-focused
  specialEffects: 'Practical' | 'CGI' | 'Mixed';
  otherMonsters: string[];
}

export const godzillaMovies: GodzillaMovie[] = [
  {
    title: "Godzilla (1954)",
    year: 1954,
    era: "Showa",
    tone: "Serious",
    humanFocus: 4,
    specialEffects: "Practical",
    otherMonsters: []
  },
  {
    title: "Godzilla: King of the Monsters (2019)",
    year: 2019,
    era: "MonsterVerse",
    tone: "Serious",
    humanFocus: 3,
    specialEffects: "CGI",
    otherMonsters: ["Mothra", "Rodan", "King Ghidorah"]
  },
  {
    title: "Godzilla vs. Kong (2021)",
    year: 2021,
    era: "MonsterVerse",
    tone: "Balanced",
    humanFocus: 2,
    specialEffects: "CGI",
    otherMonsters: ["Kong"]
  },
  {
    title: "Shin Godzilla (2016)",
    year: 2016,
    era: "Reiwa",
    tone: "Serious",
    humanFocus: 4,
    specialEffects: "CGI",
    otherMonsters: []
  },
  {
    title: "Godzilla vs. Mechagodzilla II (1993)",
    year: 1993,
    era: "Heisei",
    tone: "Serious",
    humanFocus: 3,
    specialEffects: "Practical",
    otherMonsters: ["Mechagodzilla", "Rodan"]
  },
  {
    title: "Godzilla vs. Hedorah (1971)",
    year: 1971,
    era: "Showa",
    tone: "Campy",
    humanFocus: 3,
    specialEffects: "Practical",
    otherMonsters: ["Hedorah"]
  },
  {
    title: "Godzilla: Final Wars (2004)",
    year: 2004,
    era: "Millennium",
    tone: "Campy",
    humanFocus: 3,
    specialEffects: "Mixed",
    otherMonsters: ["Rodan", "Mothra", "King Caesar", "Anguirus", "Gigan", "Monster X"]
  },
  {
    title: "Godzilla (2014)",
    year: 2014,
    era: "MonsterVerse",
    tone: "Serious",
    humanFocus: 4,
    specialEffects: "CGI",
    otherMonsters: ["MUTOs"]
  },
  {
    title: "Godzilla vs. Biollante (1989)",
    year: 1989,
    era: "Heisei",
    tone: "Serious",
    humanFocus: 3,
    specialEffects: "Practical",
    otherMonsters: ["Biollante"]
  },
  {
    title: "Godzilla vs. Destoroyah (1995)",
    year: 1995,
    era: "Heisei",
    tone: "Serious",
    humanFocus: 3,
    specialEffects: "Practical",
    otherMonsters: ["Destoroyah"]
  }
];

