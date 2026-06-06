"use client"

import { motion } from "motion/react"
import { useEffect, useState } from "react"

export default function MessageScreen({ onNext, ...motionProps }) {
    const [displayText, setDisplayText] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isTyping, setIsTyping] = useState(true)

    const message =
        "My love, I think about you in the middle of everything — mid-sentence, mid-laugh, mid-breath. You've ruined every song for me because now they all sound like you. The way you say my name, the way you laugh when something really gets you — I replay those moments like they're the best parts of a movie I never want to end. Distance is just the universe testing how strong this thing between us really is. And baby, it's unbreakable. I love you more than I'll ever know how to say 💕✨"

    useEffect(() => {
        if (currentIndex < message.length) {
            const timer = setTimeout(() => {
                setDisplayText((prev) => prev + message[currentIndex])
                setCurrentIndex((prev) => prev + 1)
            }, 28)
            return () => clearTimeout(timer)
        } else {
            setIsTyping(false)
        }
    }, [currentIndex, message])

    return (
        <motion.div {...motionProps} className="min-h-screen flex items-center justify-center px-6 relative">

            <div className="max-w-4xl text-center z-10 w-full">
                <motion.div
                    className="mb-6 flex justify-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className=""><img src="/gifs/writing.gif" alt="writing gif" className="w-40" /></div>
                </motion.div>

                <motion.h2
                    className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    A letter from my heart 💌
                </motion.h2>

                <motion.div
                    className="bg-gray-950/60 backdrop-blur-md border border-pink-500/15 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {/* Subtle glow corner */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />

                    <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light relative z-10">
                        {displayText}
                        {isTyping && (
                            <motion.span
                                className="inline-block w-0.5 h-6 bg-pink-400 ml-1"
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 0.9, repeat: Number.POSITIVE_INFINITY }}
                            />
                        )}
                    </p>
                </motion.div>

                {!isTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8"
                    >
                        <p className="text-pink-300/50 text-sm mb-4 italic font-light">now let me show you something special…</p>
                        <motion.button
                            className="bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-orange-500/25 transition-all"
                            onClick={onNext}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            Our Memories 📸
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}
