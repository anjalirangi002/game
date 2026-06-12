import { useState, useEffect, useCallback, Key } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Lightbulb, Coins, Star, Heart, Clock, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";
import { GlassPanel } from "./GlassPanel";
import { LevelConfig } from "../lib/levels";
import { GameProgress } from "../lib/store";

type Props = {
  key?: Key;
  level: LevelConfig;
  progress: GameProgress;
  onBack: () => void;
  onComplete: (stars: number, coins: number) => void;
  onUseHint: () => boolean;
};

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

export function GameScreen({ level, progress, onBack, onComplete, onUseHint }: Props) {
  const [missingIndices, setMissingIndices] = useState<number[]>([]);
  const [guesses, setGuesses] = useState<Record<number, string>>({});
  const [keyStates, setKeyStates] = useState<Record<string, 'correct' | 'wrong'>>({});
  const [mistakes, setMistakes] = useState(0);
  const [lives, setLives] = useState(5);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isWon, setIsWon] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [shakeKey, setShakeKey] = useState<string | null>(null);

  const initLevel = useCallback(() => {
    const indices: number[] = [];
    while (indices.length < level.missingCount) {
      const r = Math.floor(Math.random() * level.word.length);
      if (!indices.includes(r)) indices.push(r);
    }
    setMissingIndices(indices);
    setGuesses({});
    
    // Pre-fill key states for letters that are already revealed
    const initialKeyStates: Record<string, 'correct' | 'wrong'> = {};
    level.word.split('').forEach((char, idx) => {
      if (!indices.includes(idx)) {
        initialKeyStates[char] = 'correct';
      }
    });
    setKeyStates(initialKeyStates);

    setMistakes(0);
    setLives(5);
    setTimeLeft(level.timeLimit || null);
    setIsWon(false);
    setIsGameOver(false);
    setShakeKey(null);
  }, [level]);

  useEffect(() => {
    initLevel();
  }, [initLevel]);

  // Timer logic
  useEffect(() => {
    if (timeLeft === null || isWon || isGameOver) return;
    if (timeLeft <= 0) {
      setIsGameOver(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((t) => (t !== null && t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isWon, isGameOver]);

  const handleGuess = useCallback(
    (letter: string) => {
      if (isWon || isGameOver) return;

      const upperLetter = letter.toUpperCase();
      if (keyStates[upperLetter]) return; // Already guessed (correct or wrong)

      let found = false;
      const newGuesses = { ...guesses };

      missingIndices.forEach((index) => {
        if (!newGuesses[index] && level.word[index] === upperLetter) {
          newGuesses[index] = upperLetter;
          found = true;
        }
      });

      if (found) {
        setGuesses(newGuesses);
        setKeyStates((prev) => ({ ...prev, [upperLetter]: 'correct' }));
        
        // Check win
        const allFilled = missingIndices.every((idx) => newGuesses[idx]);
        if (allFilled) {
          setIsWon(true);
          if (progress.soundEnabled) {
            const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/3194/3194-preview.mp3");
            audio.volume = 0.5;
            audio.play().catch(() => {});
          }
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#ec4899", "#a855f7", "#3b82f6"],
          });

          let stars = 3;
          if (mistakes > 0) stars = 2;
          if (mistakes > 2) stars = 1;

          setTimeout(() => {
            onComplete(stars, 10);
          }, 2000);
        }
      } else {
        setMistakes((m) => m + 1);
        const newLives = lives - 1;
        setLives(newLives);
        setKeyStates((prev) => ({ ...prev, [upperLetter]: 'wrong' }));
        setShakeKey(upperLetter);
        setTimeout(() => setShakeKey(null), 500);

        if (newLives <= 0) {
          setIsGameOver(true);
        }
      }
    },
    [guesses, isWon, isGameOver, keyStates, level.word, missingIndices, mistakes, lives, onComplete]
  );

  // Keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[a-zA-Z]$/.test(e.key)) {
        handleGuess(e.key);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleGuess]);

  const handleHint = () => {
    const emptyIndex = missingIndices.find((idx) => !guesses[idx]);
    if (emptyIndex !== undefined) {
      if (onUseHint()) {
        const letter = level.word[emptyIndex];
        // We can just call handleGuess, but we need to bypass the keyStates check 
        // if the letter was already marked 'correct' (e.g., if it appears twice and one was revealed).
        // Actually, if it's an empty index, we just fill it.
        const newGuesses = { ...guesses, [emptyIndex]: letter };
        setGuesses(newGuesses);
        setKeyStates((prev) => ({ ...prev, [letter]: 'correct' }));

        const allFilled = missingIndices.every((idx) => newGuesses[idx]);
        if (allFilled) {
          setIsWon(true);
          if (progress.soundEnabled) {
            const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/3194/3194-preview.mp3");
            audio.volume = 0.5;
            audio.play().catch(() => {});
          }
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#ec4899", "#a855f7", "#3b82f6"],
          });
          let stars = 3;
          if (mistakes > 0) stars = 2;
          if (mistakes > 2) stars = 1;
          setTimeout(() => {
            onComplete(stars, 10);
          }, 2000);
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="min-h-screen p-4 md:p-8 flex flex-col max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white shadow-lg border border-white/20 backdrop-blur-md transition-colors"
        >
          <ArrowLeft size={24} />
        </motion.button>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-black text-white drop-shadow-md">
            LEVEL {level.id}
          </h2>
          <span className="text-sm font-medium text-pink-300 uppercase tracking-widest">
            {level.category}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-yellow-400 font-bold bg-black/20 px-3 py-1.5 rounded-full border border-white/10">
            <Coins size={16} />
            {progress.coins}
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleHint}
            className="flex items-center gap-1 text-blue-300 font-bold bg-black/20 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
          >
            <Lightbulb size={16} />
            {progress.hints}
          </motion.button>
        </div>
      </div>

      {/* Sub-header: Lives & Timer */}
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              animate={i === lives - 1 && lives <= 2 ? { scale: [1, 1.2, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              <Heart
                size={24}
                className={i < lives ? "fill-pink-500 text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]" : "text-white/20"}
              />
            </motion.div>
          ))}
        </div>
        
        {timeLeft !== null && (
          <div className={`flex items-center gap-2 font-mono text-xl font-bold px-4 py-1.5 rounded-full border transition-colors ${
            timeLeft <= 10 
              ? "bg-red-500/20 border-red-500/50 text-red-400 animate-pulse" 
              : "bg-black/20 border-white/10 text-white"
          }`}>
            <Clock size={20} />
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        )}
      </div>

      {/* Word Display */}
      <GlassPanel className="flex-1 flex flex-col items-center justify-center p-8 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 animate-pulse" />

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 z-10">
          {level.word.split("").map((letter, index) => {
            const isMissing = missingIndices.includes(index);
            const guessedLetter = guesses[index];
            const isFilled = !isMissing || guessedLetter;
            const displayLetter = isFilled ? letter : "";

            return (
              <motion.div
                key={index}
                animate={
                  shakeKey && isMissing && !guessedLetter
                    ? { x: [-5, 5, -5, 5, 0] }
                    : {}
                }
                transition={{ duration: 0.4 }}
                className={`w-12 h-16 md:w-16 md:h-20 flex items-center justify-center text-3xl md:text-5xl font-black rounded-xl border-b-4 shadow-lg ${
                  isFilled
                    ? "bg-white/20 border-white/40 text-white"
                    : "bg-black/30 border-black/50 text-transparent"
                }`}
              >
                <AnimatePresence>
                  {displayLetter && (
                    <motion.span
                      key="letter"
                      initial={isMissing ? { opacity: 0, scale: 0.5, y: 20 } : false}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className={isMissing ? "text-pink-300 drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]" : "text-white"}
                    >
                      {displayLetter}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </GlassPanel>

      {/* Keyboard */}
      <div className="flex flex-col gap-2 w-full max-w-2xl mx-auto">
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1 md:gap-2">
            {row.map((key) => {
              const state = keyStates[key];
              const isShake = shakeKey === key;
              return (
                <motion.button
                  key={key}
                  whileHover={state ? {} : { scale: 1.05 }}
                  whileTap={state ? {} : { scale: 0.9 }}
                  onClick={() => handleGuess(key)}
                  animate={isShake ? { x: [-4, 4, -4, 4, 0] } : {}}
                  disabled={!!state}
                  className={`flex-1 max-w-[3rem] h-12 md:h-14 rounded-lg font-bold text-lg md:text-xl shadow-md border transition-all duration-300 ${
                    state === 'correct'
                      ? "bg-emerald-500/80 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                      : state === 'wrong'
                      ? "bg-slate-800/50 border-slate-700 text-slate-500 opacity-50"
                      : "bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-sm"
                  }`}
                >
                  {key}
                </motion.button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Win Overlay */}
      <AnimatePresence>
        {isWon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-gradient-to-br from-purple-600 to-blue-600 p-8 rounded-3xl shadow-2xl border border-white/20 flex flex-col items-center text-center max-w-sm w-full"
            >
              <h2 className="text-4xl font-black text-white mb-4 drop-shadow-lg">AWESOME!</h2>
              <div className="flex gap-2 mb-6">
                {[1, 2, 3].map((star) => (
                  <motion.div
                    key={star}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: star * 0.2, type: "spring" }}
                  >
                    <Star
                      size={48}
                      className={
                        star <= (mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1)
                          ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]"
                          : "text-white/20"
                      }
                    />
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-2xl font-bold text-yellow-400 mb-8 bg-black/20 px-6 py-3 rounded-full">
                <Coins size={28} />
                +10
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onComplete(mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1, 10)}
                className="w-full py-4 rounded-xl bg-white text-purple-600 font-black text-xl shadow-lg"
              >
                CONTINUE
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Over Overlay */}
      <AnimatePresence>
        {isGameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl shadow-2xl border border-white/10 flex flex-col items-center text-center max-w-sm w-full"
            >
              <h2 className="text-4xl font-black text-red-400 mb-2 drop-shadow-lg">
                {lives <= 0 ? "OUT OF LIVES" : "TIME'S UP"}
              </h2>
              <p className="text-slate-300 mb-8 text-lg">
                The word was <span className="font-bold text-white text-xl">{level.word}</span>
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={initLevel}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-white text-slate-900 font-black text-xl shadow-lg"
              >
                <RotateCcw size={24} />
                TRY AGAIN
              </motion.button>
              
              <button
                onClick={onBack}
                className="mt-6 text-slate-400 hover:text-white font-semibold transition-colors"
              >
                BACK TO LEVELS
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
