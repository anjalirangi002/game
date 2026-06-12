import { ReactNode, Key, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, List, Settings, Volume2, VolumeX, X, RotateCcw } from "lucide-react";
import { GlassPanel } from "./GlassPanel";

type Props = {
  key?: Key;
  onStart: () => void;
  onLevelSelect: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onResetProgress: () => void;
};

export function HomeScreen({ onStart, onLevelSelect, soundEnabled, onToggleSound, onResetProgress }: Props) {
  const [showSettings, setShowSettings] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const handleReset = () => {
    if (confirmReset) {
      onResetProgress();
      setConfirmReset(false);
      setShowSettings(false);
    } else {
      setConfirmReset(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="flex flex-col items-center justify-center min-h-screen p-4"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="mb-12 text-center"
      >
        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
          WORD
          <br />
          GUESS
          <br />
          MASTER
        </h1>
      </motion.div>

      <GlassPanel className="p-8 flex flex-col gap-6 w-full max-w-sm">
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(236, 72, 153, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-xl shadow-lg"
        >
          <Play size={24} fill="currentColor" />
          START GAME
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onLevelSelect}
          className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xl shadow-lg border border-white/20 transition-colors"
        >
          <List size={24} />
          LEVELS
        </motion.button>

        <div className="flex justify-center gap-4 mt-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggleSound}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
          >
            {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowSettings(true)}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
          >
            <Settings size={24} />
          </motion.button>
        </div>
      </GlassPanel>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-sm"
            >
              <GlassPanel className="p-6 flex flex-col gap-6 relative">
                <button
                  onClick={() => {
                    setShowSettings(false);
                    setConfirmReset(false);
                  }}
                  className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
                
                <h2 className="text-2xl font-black text-white text-center tracking-wider">SETTINGS</h2>
                
                <div className="flex flex-col gap-4 mt-2">
                  <div className="flex items-center justify-between bg-black/20 p-4 rounded-xl border border-white/10">
                    <span className="text-white font-medium">Sound Effects</span>
                    <button
                      onClick={onToggleSound}
                      className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                        soundEnabled ? "bg-pink-500 text-white" : "bg-white/10 text-white/50"
                      }`}
                    >
                      {soundEnabled ? "ON" : "OFF"}
                    </button>
                  </div>

                  <div className="flex items-center justify-between bg-black/20 p-4 rounded-xl border border-white/10">
                    <span className="text-white font-medium">Reset Progress</span>
                    <button
                      onClick={handleReset}
                      className={`px-4 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 ${
                        confirmReset ? "bg-red-500 text-white" : "bg-red-500/20 text-red-400 hover:bg-red-500/40"
                      }`}
                    >
                      <RotateCcw size={16} />
                      {confirmReset ? "SURE?" : "RESET"}
                    </button>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
