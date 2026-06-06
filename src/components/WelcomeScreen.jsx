"use client"

import { motion } from "motion/react"

export default function WelcomeScreen({ onNext, ...motionProps }) {
    return (
        <motion.div {...motionProps} className="min-h-screen flex items-center justify-center text-center px-6 relative">

            <div className="max-w-2xl z-10">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6 flex justify-center"
                >
                    <div className="mb-2"><img src="/gifs/hey.gif" alt="hey gif" className="w-44" /></div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-3"
                >
                    <span className="text-xs uppercase tracking-[0.3em] text-pink-400/70 font-light">
                        made just for you ✦
                    </span>
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-7xl py-2 font-bold mb-4 bg-gradient-to-r from-pink-400 via-rose-300 to-purple-400 bg-clip-text text-transparent leading-tight"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    Hey Beautiful ✨
                </motion.h1>

                <motion.p
                    className="text-lg md:text-2xl text-gray-300 mb-3 font-light"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                >
                    Do you even know how much I miss you,
                </motion.p>
                <motion.p
                    className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-rose-300 to-pink-400 bg-clip-text text-transparent mb-8"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.0 }}
                >
                    Shree darling? 🥺
                </motion.p>

                <motion.p
                    className="text-sm text-gray-500 mb-8 font-light italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                >
                    I made this whole thing just because I couldn't stop thinking about you 💕
                </motion.p>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.3 }}
                >
                    <motion.button
                        className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white px-10 py-4 rounded-full text-xl font-semibold shadow-2xl relative overflow-hidden group"
                        onClick={onNext}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <motion.span
                            className="absolute inset-0 bg-white/10 rounded-full"
                            initial={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10">Open My Heart 💕</span>
                    </motion.button>

                    <motion.p
                        className="text-xs text-gray-600 mt-4 font-light"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.8 }}
                    >
                        (warning: you might fall even more in love 🌸)
                    </motion.p>
                </motion.div>
            </div>
        </motion.div>
    )
}
