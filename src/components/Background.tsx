import { useMemo } from "react";
import { motion } from "motion/react";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function Background() {
  const floatingLetters = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      letter: LETTERS[Math.floor(Math.random() * LETTERS.length)],
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      endX: Math.random() * 100,
      endY: Math.random() * 100,
      duration: 25 + Math.random() * 35,
      size: 3 + Math.random() * 8, // rem
      rotateStart: Math.random() * 360,
      rotateEnd: Math.random() * 360 + 360,
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/90 via-purple-900/90 to-slate-950/90" />
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-pink-600/20 rounded-full blur-[100px] animate-pulse mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-blue-600/20 rounded-full blur-[120px] animate-pulse mix-blend-screen" style={{ animationDelay: "2s" }} />
      
      {floatingLetters.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-white/[0.04] font-black select-none"
          style={{ fontSize: `${item.size}rem` }}
          initial={{ 
            x: `${item.startX}vw`, 
            y: `${item.startY}vh`,
            rotate: item.rotateStart 
          }}
          animate={{ 
            x: [`${item.startX}vw`, `${item.endX}vw`, `${item.startX}vw`],
            y: [`${item.startY}vh`, `${item.endY}vh`, `${item.startY}vh`],
            rotate: [item.rotateStart, item.rotateEnd]
          }}
          transition={{ 
            duration: item.duration, 
            repeat: Infinity,
            ease: "linear" 
          }}
        >
          {item.letter}
        </motion.div>
      ))}
    </div>
  );
}
