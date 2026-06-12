import { useState, useEffect } from "react";

export type GameProgress = {
  unlockedLevels: number;
  coins: number;
  hints: number;
  stars: Record<number, number>; // levelId -> stars
  soundEnabled: boolean;
};

const DEFAULT_PROGRESS: GameProgress = {
  unlockedLevels: 1,
  coins: 0,
  hints: 3,
  stars: {},
  soundEnabled: true,
};

export function useGameProgress() {
  const [progress, setProgress] = useState<GameProgress>(() => {
    const saved = localStorage.getItem("wordGuessProgress");
    if (saved) {
      try {
        return { ...DEFAULT_PROGRESS, ...JSON.parse(saved) };
      } catch (e) {
        return DEFAULT_PROGRESS;
      }
    }
    return DEFAULT_PROGRESS;
  });

  useEffect(() => {
    localStorage.setItem("wordGuessProgress", JSON.stringify(progress));
  }, [progress]);

  const completeLevel = (levelId: number, starsEarned: number, coinsEarned: number) => {
    setProgress((prev) => {
      const newStars = { ...prev.stars };
      const currentStars = newStars[levelId] || 0;
      if (starsEarned > currentStars) {
        newStars[levelId] = starsEarned;
      }

      return {
        ...prev,
        unlockedLevels: Math.max(prev.unlockedLevels, levelId + 1),
        stars: newStars,
        coins: prev.coins + coinsEarned,
      };
    });
  };

  const useHint = (cost: number) => {
    if (progress.hints >= cost) {
      setProgress((prev) => ({ ...prev, hints: prev.hints - cost }));
      return true;
    }
    return false;
  };

  const buyHints = (amount: number, cost: number) => {
    if (progress.coins >= cost) {
      setProgress((prev) => ({
        ...prev,
        coins: prev.coins - cost,
        hints: prev.hints + amount,
      }));
      return true;
    }
    return false;
  };

  const toggleSound = () => {
    setProgress((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const resetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
  };

  return {
    progress,
    completeLevel,
    useHint,
    buyHints,
    toggleSound,
    resetProgress,
  };
}
