export type LevelConfig = {
  id: number;
  word: string;
  category: string;
  missingCount: number;
  difficulty: "easy" | "medium" | "medium-hard" | "hard" | "expert";
  timeLimit?: number;
};

const wordsDb = {
  easy: [
    { word: "CAT", category: "Animals" },
    { word: "DOG", category: "Animals" },
    { word: "SUN", category: "Nature" },
    { word: "MOON", category: "Nature" },
    { word: "STAR", category: "Nature" },
    { word: "TREE", category: "Nature" },
    { word: "BIRD", category: "Animals" },
    { word: "FISH", category: "Animals" },
    { word: "CAR", category: "Objects" },
    { word: "BUS", category: "Objects" },
    { word: "BOOK", category: "Objects" },
    { word: "PEN", category: "Objects" },
    { word: "DESK", category: "Objects" },
    { word: "CHAIR", category: "Objects" },
    { word: "DOOR", category: "Objects" },
    { word: "WALL", category: "Objects" },
    { word: "ROOF", category: "Objects" },
    { word: "SHOE", category: "Objects" },
    { word: "HAT", category: "Objects" },
    { word: "COAT", category: "Objects" },
    { word: "APPLE", category: "Fruits" },
    { word: "PEAR", category: "Fruits" },
    { word: "PLUM", category: "Fruits" },
    { word: "GRAPE", category: "Fruits" },
    { word: "MILK", category: "Food" },
    { word: "BREAD", category: "Food" },
    { word: "CAKE", category: "Food" },
    { word: "SOUP", category: "Food" },
    { word: "MEAT", category: "Food" },
    { word: "RICE", category: "Food" },
  ],
  medium: [
    { word: "MONKEY", category: "Animals" },
    { word: "RABBIT", category: "Animals" },
    { word: "TIGER", category: "Animals" },
    { word: "SNAKE", category: "Animals" },
    { word: "HORSE", category: "Animals" },
    { word: "BANANA", category: "Fruits" },
    { word: "ORANGE", category: "Fruits" },
    { word: "CHERRY", category: "Fruits" },
    { word: "LEMON", category: "Fruits" },
    { word: "TOMATO", category: "Food" },
    { word: "POTATO", category: "Food" },
    { word: "CARROT", category: "Food" },
    { word: "ONION", category: "Food" },
    { word: "GARLIC", category: "Food" },
    { word: "CHEESE", category: "Food" },
    { word: "BUTTER", category: "Food" },
    { word: "PENCIL", category: "Objects" },
    { word: "ERASER", category: "Objects" },
    { word: "WINDOW", category: "Objects" },
    { word: "MIRROR", category: "Objects" },
    { word: "BOTTLE", category: "Objects" },
    { word: "BASKET", category: "Objects" },
    { word: "POCKET", category: "Objects" },
    { word: "JACKET", category: "Objects" },
    { word: "GUITAR", category: "Music" },
    { word: "PIANO", category: "Music" },
    { word: "VIOLIN", category: "Music" },
    { word: "FLUTE", category: "Music" },
    { word: "DRUMS", category: "Music" },
    { word: "SINGER", category: "Music" },
  ],
  mediumHard: [
    { word: "COMPUTER", category: "Technology" },
    { word: "KEYBOARD", category: "Technology" },
    { word: "MONITOR", category: "Technology" },
    { word: "PRINTER", category: "Technology" },
    { word: "SCANNER", category: "Technology" },
    { word: "LAPTOP", category: "Technology" },
    { word: "TABLET", category: "Technology" },
    { word: "CAMERA", category: "Technology" },
    { word: "SPEAKER", category: "Technology" },
    { word: "BATTERY", category: "Technology" },
    { word: "TEACHER", category: "Education" },
    { word: "STUDENT", category: "Education" },
    { word: "SCHOOL", category: "Education" },
    { word: "COLLEGE", category: "Education" },
    { word: "LIBRARY", category: "Education" },
    { word: "SCIENCE", category: "Education" },
    { word: "HISTORY", category: "Education" },
    { word: "ENGLISH", category: "Education" },
    { word: "PHYSICS", category: "Education" },
    { word: "BIOLOGY", category: "Education" },
    { word: "ELEPHANT", category: "Animals" },
    { word: "GIRAFFE", category: "Animals" },
    { word: "PENGUIN", category: "Animals" },
    { word: "DOLPHIN", category: "Animals" },
    { word: "OCTOPUS", category: "Animals" },
    { word: "OSTRICH", category: "Animals" },
    { word: "CHEETAH", category: "Animals" },
    { word: "GORILLA", category: "Animals" },
    { word: "PANTHER", category: "Animals" },
    { word: "LEOPARD", category: "Animals" },
  ],
  hard: [
    { word: "ASTRONAUT", category: "Space" },
    { word: "TELESCOPE", category: "Space" },
    { word: "SATELLITE", category: "Space" },
    { word: "METEORITE", category: "Space" },
    { word: "UNIVERSE", category: "Space" },
    { word: "GALAXY", category: "Space" },
    { word: "PLANET", category: "Space" },
    { word: "ASTEROID", category: "Space" },
    { word: "ECLIPSE", category: "Space" },
    { word: "GRAVITY", category: "Space" },
    { word: "SYMPHONY", category: "Music" },
    { word: "ORCHESTRA", category: "Music" },
    { word: "CONDUCTOR", category: "Music" },
    { word: "COMPOSER", category: "Music" },
    { word: "HARMONY", category: "Music" },
    { word: "MELODY", category: "Music" },
    { word: "RHYTHM", category: "Music" },
    { word: "CHORUS", category: "Music" },
    { word: "CONCERT", category: "Music" },
    { word: "FESTIVAL", category: "Music" },
    { word: "MOUNTAIN", category: "Nature" },
    { word: "VOLCANO", category: "Nature" },
    { word: "GLACIER", category: "Nature" },
    { word: "CANYON", category: "Nature" },
    { word: "DESERT", category: "Nature" },
    { word: "FOREST", category: "Nature" },
    { word: "JUNGLE", category: "Nature" },
    { word: "ISLAND", category: "Nature" },
    { word: "OCEAN", category: "Nature" },
    { word: "RIVER", category: "Nature" },
  ],
  expert: [
    { word: "PHILOSOPHY", category: "Academics" },
    { word: "PSYCHOLOGY", category: "Academics" },
    { word: "SOCIOLOGY", category: "Academics" },
    { word: "ECONOMICS", category: "Academics" },
    { word: "LITERATURE", category: "Academics" },
    { word: "MATHEMATICS", category: "Academics" },
    { word: "STATISTICS", category: "Academics" },
    { word: "GEOGRAPHY", category: "Academics" },
    { word: "CHEMISTRY", category: "Academics" },
    { word: "ASTRONOMY", category: "Academics" },
    { word: "ARCHITECTURE", category: "Professions" },
    { word: "ENGINEERING", category: "Professions" },
    { word: "JOURNALISM", category: "Professions" },
    { word: "PHOTOGRAPHY", category: "Professions" },
    { word: "PROGRAMMING", category: "Professions" },
    { word: "MANAGEMENT", category: "Professions" },
    { word: "ACCOUNTING", category: "Professions" },
    { word: "MARKETING", category: "Professions" },
    { word: "CONSULTING", category: "Professions" },
    { word: "LEADERSHIP", category: "Professions" },
    { word: "REVOLUTION", category: "History" },
    { word: "CIVILIZATION", category: "History" },
    { word: "INDEPENDENCE", category: "History" },
    { word: "CONSTITUTION", category: "History" },
    { word: "DECLARATION", category: "History" },
    { word: "RENAISSANCE", category: "History" },
    { word: "ENLIGHTENMENT", category: "History" },
    { word: "MILLENNIUM", category: "History" },
    { word: "CENTURY", category: "History" },
    { word: "DECADE", category: "History" },
  ],
};

// Generate exactly 100 levels
export const levels: LevelConfig[] = [];

// Helper to shuffle an array
function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Ensure we have enough words, repeat if necessary
function getWords(pool: { word: string; category: string }[], count: number) {
  let result: { word: string; category: string }[] = [];
  while (result.length < count) {
    result = result.concat(shuffle(pool));
  }
  return result.slice(0, count);
}

const easyWords = getWords(wordsDb.easy, 20);
const mediumWords = getWords(wordsDb.medium, 20);
const mediumHardWords = getWords(wordsDb.mediumHard, 20);
const hardWords = getWords(wordsDb.hard, 20);
const expertWords = getWords(wordsDb.expert, 20);

for (let i = 1; i <= 100; i++) {
  let wordObj;
  let missingCount = 1;
  let difficulty: LevelConfig["difficulty"] = "easy";
  let timeLimit: number | undefined;

  if (i <= 20) {
    wordObj = easyWords[i - 1];
    missingCount = Math.floor(Math.random() * 2) + 1; // 1-2
    difficulty = "easy";
  } else if (i <= 40) {
    wordObj = mediumWords[i - 21];
    missingCount = Math.floor(Math.random() * 2) + 2; // 2-3
    difficulty = "medium";
  } else if (i <= 60) {
    wordObj = mediumHardWords[i - 41];
    missingCount = Math.floor(Math.random() * 2) + 3; // 3-4
    difficulty = "medium-hard";
    timeLimit = 60;
  } else if (i <= 80) {
    wordObj = hardWords[i - 61];
    missingCount = Math.floor(Math.random() * 2) + 4; // 4-5
    difficulty = "hard";
    timeLimit = 45;
  } else {
    wordObj = expertWords[i - 81];
    missingCount = Math.floor(Math.random() * 3) + 5; // 5-7
    difficulty = "expert";
    timeLimit = 30;
  }

  // Ensure missingCount isn't greater than word length - 1
  missingCount = Math.min(missingCount, wordObj.word.length - 1);

  levels.push({
    id: i,
    word: wordObj.word,
    category: wordObj.category,
    missingCount,
    difficulty,
    timeLimit,
  });
}
