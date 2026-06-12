import { Key } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Lock, Star } from "lucide-react";
import { GlassPanel } from "./GlassPanel";
import { levels } from "../lib/levels";
import { GameProgress } from "../lib/store";

type Props = {
  key?: Key;
  progress: GameProgress;
  onBack: () => void;
  onSelectLevel: (levelId: number) => void;
};

export function LevelSelectScreen({ progress, onBack, onSelectLevel }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen p-4 md:p-8 flex flex-col"
    >
      <div className="flex items-center justify-between mb-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white shadow-lg border border-white/20 backdrop-blur-md transition-colors"
        >
          <ArrowLeft size={24} />
        </motion.button>
        <h2 className="text-3xl font-black text-white drop-shadow-md">LEVELS</h2>
        <div className="w-12" /> {/* Spacer for centering */}
      </div>

      <GlassPanel className="flex-1 p-6 md:p-8 overflow-y-auto max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-4">
          {levels.map((level) => {
            const isUnlocked = level.id <= progress.unlockedLevels;
            const stars = progress.stars[level.id] || 0;

            return (
              <motion.button
                key={level.id}
                whileHover={isUnlocked ? { scale: 1.1, y: -5 } : {}}
                whileTap={isUnlocked ? { scale: 0.95 } : {}}
                onClick={() => isUnlocked && onSelectLevel(level.id)}
                disabled={!isUnlocked}
                className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center border transition-all ${
                  isUnlocked
                    ? "bg-gradient-to-br from-white/20 to-white/5 border-white/30 hover:border-pink-400 shadow-lg cursor-pointer"
                    : "bg-black/20 border-white/5 cursor-not-allowed opacity-50"
                }`}
              >
                {isUnlocked ? (
                  <>
                    <span className="text-2xl font-bold text-white mb-1">
                      {level.id}
                    </span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3].map((star) => (
                        <Star
                          key={star}
                          size={12}
                          className={
                            star <= stars
                              ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]"
                              : "text-white/30"
                          }
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <Lock size={24} className="text-white/50" />
                )}
              </motion.button>
            );
          })}
        </div>
      </GlassPanel>
    </motion.div>
  );
}
