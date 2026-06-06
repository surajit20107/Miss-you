"use client"

import { motion } from "motion/react"

const quotes = [
    { emoji: "🌙", text: "Every night I look at the moon and wonder if you're looking at the same one." },
    { emoji: "💭", text: "I keep finding you in the middle of every thought I have." },
    { emoji: "📱", text: "Seeing your name pop up on my screen is still my favourite part of any day." },
    { emoji: "🎵", text: "Every love song I hear — it's yours. It's always yours." },
]

export default function MemoriesScreen({ onNext, ...motionProps }) {
    return (
        <motion.div {...motionProps} className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative">

            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center mb-6"
            >
                <img src="/gifs/cute.gif" alt="cute gif" className="w-36" />
            </motion.div>

            <motion.h2
                className="text-3xl md:text-5xl font-bold text-center mb-3 bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
            >
                I Think About You
            </motion.h2>

            <motion.p
                className="text-gray-400 text-sm text-center font-light mb-10 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                …constantly, embarrassingly, beautifully 🌸
            </motion.p>

            <div className="w-full max-w-md flex flex-col gap-4 mb-10">
                {quotes.map((q, i) => (
                    <motion.div
                        key={i}
                        className="flex items-start gap-4 bg-white/5 border border-white/8 rounded-2xl px-5 py-4 backdrop-blur-sm"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 * i + 0.6 }}
                    >
                        <span className="text-2xl shrink-0 mt-0.5">{q.emoji}</span>
                        <p className="text-white/75 text-sm leading-relaxed font-light">{q.text}</p>
                    </motion.div>
                ))}
            </div>

            <motion.button
                className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-2xl shadow-pink-500/20"
                onClick={onNext}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
            >
                See Our Album 💌
            </motion.button>
        </motion.div>
    )
}
