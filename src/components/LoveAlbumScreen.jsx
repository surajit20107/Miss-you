"use client"

import { motion } from "motion/react"
import { useState } from "react"

const albums = [
    {
        id: 1,
        emoji: "☀️",
        title: "Lazy Sunday",
        subtitle: "Just us, all day",
        description: "Tangled in sheets, your head on my chest, no alarms, no plans. Just your soft breathing and my heart completely full.",
        color: "from-amber-400/20 via-orange-300/10 to-pink-400/20",
        border: "border-amber-400/30",
        glow: "shadow-amber-500/20",
        tag: "my favorite kind of day 🥹",
    },
    {
        id: 2,
        emoji: "🍳",
        title: "Kitchen Date",
        subtitle: "Cooking & chaos",
        description: "Flour on your nose, music too loud, bumping into each other — and somehow this messy kitchen felt like the most romantic place on earth.",
        color: "from-rose-400/20 via-pink-300/10 to-red-400/20",
        border: "border-rose-400/30",
        glow: "shadow-rose-500/20",
        tag: "better than any restaurant 🍽️",
    },
    {
        id: 3,
        emoji: "🌙",
        title: "Midnight Talks",
        subtitle: "3am and only you",
        description: "The whole world asleep, but us talking about everything and nothing. Your voice at 3am is my favorite sound in the universe.",
        color: "from-indigo-400/20 via-purple-300/10 to-blue-400/20",
        border: "border-indigo-400/30",
        glow: "shadow-indigo-500/20",
        tag: "I never want to hang up 💙",
    },
    {
        id: 4,
        emoji: "🎬",
        title: "Movie Night",
        subtitle: "I watch you, not the film",
        description: "The movie played. I watched you laugh, gasp, quote every line. You're more beautiful than anything on that screen.",
        color: "from-purple-400/20 via-violet-300/10 to-pink-400/20",
        border: "border-purple-400/30",
        glow: "shadow-purple-500/20",
        tag: "what movie again? 😌",
    },
    {
        id: 5,
        emoji: "☕",
        title: "Morning Coffee",
        subtitle: "Sleepy eyes & you",
        description: "Your messy hair, half-asleep face, hoodie too big — and somehow you're the most gorgeous person I've ever seen before 8am.",
        color: "from-yellow-400/20 via-amber-300/10 to-orange-400/20",
        border: "border-yellow-400/30",
        glow: "shadow-yellow-500/20",
        tag: "you > coffee. always ☀️",
    },
    {
        id: 6,
        emoji: "🌟",
        title: "Stargazing",
        subtitle: "Infinite sky, just us",
        description: "Lying on the grass, finding shapes in stars, your hand in mine. I forgot to look at the sky because I couldn't stop looking at you.",
        color: "from-cyan-400/20 via-blue-300/10 to-purple-400/20",
        border: "border-cyan-400/30",
        glow: "shadow-cyan-500/20",
        tag: "you are my favorite star 🌠",
    },
    {
        id: 7,
        emoji: "🚗",
        title: "Late Night Drive",
        subtitle: "Windows down, music up",
        description: "No destination. Just the road, our playlist, and you singing off-key with all your heart. I'd drive forever like this.",
        color: "from-teal-400/20 via-emerald-300/10 to-cyan-400/20",
        border: "border-teal-400/30",
        glow: "shadow-teal-500/20",
        tag: "don't stop singing 🎵",
    },
    {
        id: 8,
        emoji: "🌧️",
        title: "Rainy Day",
        subtitle: "Rain & you = perfect",
        description: "Rain on the window, a blanket around us, tea going cold. Every rainy day is beautiful because you're in it.",
        color: "from-slate-400/20 via-blue-300/10 to-indigo-400/20",
        border: "border-slate-400/30",
        glow: "shadow-slate-500/20",
        tag: "I love rainy days now 🌧️",
    },
]

export default function LoveAlbumScreen({ onNext, ...motionProps }) {
    const [activeCard, setActiveCard] = useState(null)

    return (
        <motion.div {...motionProps} className="min-h-screen flex flex-col items-center justify-start px-4 py-10 relative">

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-2 z-10"
            >
                <motion.span
                    className="text-4xl"
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    💌
                </motion.span>
                <h2 className="text-3xl md:text-5xl font-bold mt-3 bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 bg-clip-text text-transparent">
                    Our Love Album
                </h2>
                <p className="text-gray-400 mt-2 text-base md:text-lg font-light">
                    Every little moment with you… is everything
                </p>
            </motion.div>

            <motion.div
                className="w-full max-w-5xl z-10 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2">
                    {albums.map((album, index) => (
                        <motion.div
                            key={album.id}
                            initial={{ opacity: 0, y: 40, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.1 * index + 0.4, type: "spring", stiffness: 100 }}
                            whileHover={{ scale: 1.04, y: -6 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setActiveCard(activeCard === album.id ? null : album.id)}
                            className={`relative cursor-pointer bg-gradient-to-br ${album.color} border ${album.border} rounded-3xl p-5 backdrop-blur-md shadow-2xl ${album.glow} transition-all duration-300`}
                        >
                            <div className="flex flex-col h-full">
                                <motion.span
                                    className="text-4xl mb-3 block"
                                    animate={{ scale: [1, 1.15, 1] }}
                                    transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
                                >
                                    {album.emoji}
                                </motion.span>

                                <h3 className="text-white font-bold text-lg leading-tight mb-1">
                                    {album.title}
                                </h3>
                                <p className="text-white/50 text-xs mb-3 font-light">{album.subtitle}</p>

                                <motion.div
                                    initial={false}
                                    animate={{ height: activeCard === album.id ? "auto" : 0, opacity: activeCard === album.id ? 1 : 0 }}
                                    className="overflow-hidden"
                                >
                                    <p className="text-white/80 text-sm leading-relaxed font-light mb-3">
                                        {album.description}
                                    </p>
                                </motion.div>

                                <div className="mt-auto">
                                    <span className="text-xs text-white/40 italic font-light">{album.tag}</span>
                                </div>

                                {activeCard !== album.id && (
                                    <p className="text-white/30 text-xs mt-2 font-light">tap to read ✦</p>
                                )}
                            </div>

                            {/* Shimmer effect */}
                            <motion.div
                                className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"
                                animate={{ opacity: [0, 0.5, 0] }}
                                transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <motion.div
                className="text-center mt-6 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
            >
                <p className="text-pink-300/60 text-sm mb-4 font-light italic">
                    "Every ordinary moment with you becomes extraordinary" 🌸
                </p>
                <motion.button
                    className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-pink-500/30 transition-all"
                    onClick={onNext}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                >
                    One Last Thing 💝
                </motion.button>
            </motion.div>
        </motion.div>
    )
}
