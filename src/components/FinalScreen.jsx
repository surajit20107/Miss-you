"use client"

import { motion } from "motion/react"
import { useState, useEffect } from "react"

export default function FinalScreen({ ...motionProps }) {
    const [displayText, setDisplayText] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isTyping, setIsTyping] = useState(true)
    const [showExtras, setShowExtras] = useState(false)

    const finalMessage =
        "Even when the whole world is loud, you are my quiet. You are the person I want to call first when something happens — good, bad, funny, heartbreaking, anything. The way you love is so rare, so real, that sometimes I have to remind myself this is actually my life. I'm the luckiest person alive to be yours. Miles don't matter. Time doesn't matter. Nothing could ever make me stop choosing you. Every single day. Without hesitation. Always. I love you to every star and back, my love 🌙💕"

    useEffect(() => {
        const timer = setTimeout(() => {
            if (currentIndex < finalMessage.length) {
                setDisplayText((prev) => prev + finalMessage[currentIndex])
                setCurrentIndex((prev) => prev + 1)
            } else {
                setIsTyping(false)
                setTimeout(() => setShowExtras(true), 400)
            }
        }, 28)
        return () => clearTimeout(timer)
    }, [currentIndex, finalMessage])

    const floatingEmojis = ["💕", "🌙", "✨", "💫", "🌸", "❤️", "🌟", "💝"]

    return (
        <motion.div {...motionProps} className="min-h-screen flex items-center justify-center text-center px-6 relative overflow-hidden">

            {/* Ambient floating emojis */}
            {floatingEmojis.map((emoji, i) => (
                <motion.div
                    key={i}
                    className="absolute text-2xl pointer-events-none select-none"
                    style={{
                        left: `${10 + i * 11}%`,
                        top: `${Math.random() * 80 + 10}%`,
                    }}
                    animate={{
                        y: [-10, -30, -10],
                        opacity: [0.2, 0.5, 0.2],
                        rotate: [0, 15, -15, 0],
                    }}
                    transition={{
                        duration: 4 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.6,
                    }}
                >
                    {emoji}
                </motion.div>
            ))}

            <div className="max-w-4xl z-10 w-full">
                <motion.div
                    className="mb-6 flex justify-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div><img src="/gifs/us.gif" alt="us gif" className="w-40" /></div>
                </motion.div>

                <motion.h2
                    className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-rose-300 to-purple-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    Forever Yours 💍
                </motion.h2>

                <motion.p
                    className="text-pink-300/60 text-sm mb-6 font-light italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    — and I mean every single word
                </motion.p>

                <motion.div
                    className="bg-gray-950/60 backdrop-blur-md border border-pink-500/15 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden mb-8"
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

                    <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light relative z-10 text-left">
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

                {showExtras && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="space-y-6"
                    >
                        {/* Three romantic promise cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { emoji: "🤞", text: "I promise to always make you feel chosen" },
                                { emoji: "🌙", text: "I promise to be your safe place, always" },
                                { emoji: "💕", text: "I promise to love you in all your seasons" },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.2, type: "spring" }}
                                    className="bg-white/5 border border-pink-500/10 rounded-2xl p-4 backdrop-blur-sm"
                                >
                                    <div className="text-2xl mb-2">{item.emoji}</div>
                                    <p className="text-white/70 text-sm font-light">{item.text}</p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                                textShadow: [
                                    "0 0 20px rgba(244,114,182,0.3)",
                                    "0 0 40px rgba(244,114,182,0.7)",
                                    "0 0 20px rgba(244,114,182,0.3)"
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-rose-300 to-purple-400 bg-clip-text text-transparent mt-2"
                        >
                            I love you, Shree 🌸
                        </motion.div>

                        <p className="text-white/30 text-xs font-light italic">
                            made with every bit of love I have 💕
                        </p>
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}
