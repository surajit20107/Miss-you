"use client"

import { motion } from "motion/react"
import { useState } from "react"

export default function MemoriesScreen({ onNext, ...motionProps }) {
    const [activeIdx, setActiveIdx] = useState(0)

    const memories = [
        { id: 1, imgSrc: "./images/1.jpg", title: "Our First Date", emoji: "💕", color: "from-pink-500/30 to-purple-600/30", border: "border-pink-400/30" },
        { id: 2, imgSrc: "./images/2.jpg", title: "That Cute Selfie", emoji: "📸", color: "from-purple-500/30 to-pink-600/30", border: "border-purple-400/30" },
        { id: 3, imgSrc: "./images/3.jpg", title: "Dancing Together", emoji: "💃", color: "from-blue-500/30 to-purple-600/30", border: "border-blue-400/30" },
        { id: 4, imgSrc: "./images/4.jpg", title: "Sunset Walks", emoji: "🌅", color: "from-orange-500/30 to-pink-600/30", border: "border-orange-400/30" },
    ]

    const prev = () => setActiveIdx((i) => (i - 1 + memories.length) % memories.length)
    const next = () => setActiveIdx((i) => (i + 1) % memories.length)

    return (
        <motion.div {...motionProps} className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-4 flex justify-center"
            >
                <img src="/gifs/cute.gif" alt="cute gif" className="w-40" />
            </motion.div>

            <motion.h2
                className="text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 bg-clip-text text-transparent text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                Our Memories 📸
            </motion.h2>

            <motion.p
                className="text-gray-400 text-base mb-8 text-center font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                These moments… they make me miss you even more ❤️
            </motion.p>

            {/* Carousel */}
            <motion.div
                className="w-full max-w-sm relative"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <div className="relative overflow-hidden rounded-3xl" style={{ height: 380 }}>
                    {memories.map((memory, idx) => (
                        <motion.div
                            key={memory.id}
                            className={`absolute inset-0 bg-gradient-to-br ${memory.color} border ${memory.border} rounded-3xl backdrop-blur-md flex flex-col items-center justify-center shadow-2xl`}
                            initial={false}
                            animate={{
                                x: `${(idx - activeIdx) * 100}%`,
                                scale: idx === activeIdx ? 1 : 0.85,
                                opacity: idx === activeIdx ? 1 : 0,
                            }}
                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        >
                            <div className="text-5xl mb-4">{memory.emoji}</div>
                            <div className="w-56 h-56 rounded-2xl overflow-hidden shadow-xl bg-black/20 flex items-center justify-center">
                                <img
                                    src={memory.imgSrc}
                                    alt={memory.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.style.display = 'none' }}
                                />
                            </div>
                            <p className="text-white font-semibold text-lg mt-4">{memory.title}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Nav buttons */}
                <div className="flex justify-between mt-5 px-2">
                    <motion.button
                        onClick={prev}
                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                        className="bg-white/10 border border-white/20 text-white px-5 py-2 rounded-full text-sm backdrop-blur-sm hover:bg-white/20"
                    >
                        ← Prev
                    </motion.button>
                    <div className="flex items-center gap-2">
                        {memories.map((_, i) => (
                            <motion.button
                                key={i}
                                onClick={() => setActiveIdx(i)}
                                animate={{ scale: i === activeIdx ? 1.3 : 1, opacity: i === activeIdx ? 1 : 0.4 }}
                                className="w-2 h-2 rounded-full bg-pink-400"
                            />
                        ))}
                    </div>
                    <motion.button
                        onClick={next}
                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                        className="bg-white/10 border border-white/20 text-white px-5 py-2 rounded-full text-sm backdrop-blur-sm hover:bg-white/20"
                    >
                        Next →
                    </motion.button>
                </div>
            </motion.div>

            <motion.button
                className="mt-8 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-pink-500/25 transition-all"
                onClick={onNext}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
            >
                Our Love Album 💌
            </motion.button>
        </motion.div>
    )
}
