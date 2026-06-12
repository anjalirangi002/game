import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { HomeScreen } from "./components/HomeScreen";
import { LevelSelectScreen } from "./components/LevelSelectScreen";
import { GameScreen } from "./components/GameScreen";
import { Background } from "./components/Background";
import { useGameProgress } from "./lib/store";
import { levels } from "./lib/levels";

type Screen = "home" | "levels" | "game";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [currentLevelId, setCurrentLevelId] = useState<number>(1);
  const { progress, completeLevel, useHint, toggleSound, resetProgress } = useGameProgress();

  const handleStart = () => {
    setCurrentLevelId(progress.unlockedLevels > 100 ? 100 : progress.unlockedLevels);
    setCurrentScreen("game");
  };

  const handleLevelSelect = (levelId: number) => {
    setCurrentLevelId(levelId);
    setCurrentScreen("game");
  };

  const handleLevelComplete = (stars: number, coins: number) => {
    completeLevel(currentLevelId, stars, coins);
    if (currentLevelId < 100) {
      setCurrentLevelId(currentLevelId + 1);
    } else {
      setCurrentScreen("levels");
    }
  };

  const currentLevel = levels.find((l) => l.id === currentLevelId) || levels[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 overflow-hidden relative font-sans">
      <Background />

      {/* Content */}
      <div className="relative z-10 h-full w-full">
        <AnimatePresence mode="wait">
          {currentScreen === "home" && (
            <HomeScreen
              key="home"
              onStart={handleStart}
              onLevelSelect={() => setCurrentScreen("levels")}
              soundEnabled={progress.soundEnabled}
              onToggleSound={toggleSound}
              onResetProgress={resetProgress}
            />
          )}
          {currentScreen === "levels" && (
            <LevelSelectScreen
              key="levels"
              progress={progress}
              onBack={() => setCurrentScreen("home")}
              onSelectLevel={handleLevelSelect}
            />
          )}
          {currentScreen === "game" && (
            <GameScreen
              key={`game-${currentLevelId}`}
              level={currentLevel}
              progress={progress}
              onBack={() => setCurrentScreen("levels")}
              onComplete={handleLevelComplete}
              onUseHint={() => useHint(1)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
