"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

// ─── ADD / REMOVE YOUR PHOTOS HERE ───────────────────────────────────────────
// Drop files into /public/images/ and update this list.
// layout: "full" = full-width, "half" = 2 side by side, "third" = 3 in a row
const photos = [
    {
        id: 1,
        src: "/images/1.jpg",
        caption: "That Cute Selfie 📸",
        layout: "full",
    },
    {
        id: 2,
        src: "/images/3.jpg",
        caption: "My Favourite Moment ✨",
        layout: "third",
    },
    {
        id: 3,
        src: "/images/4.jpg",
        caption: "Just You & Me 💃",
        layout: "third",
    },
    {
        id: 4,
        src: "/images/5.jpg",
        caption: "Sunrise Walks in winter ❄️",
        layout: "third",
    },
    { id: 5, src: "/images/2.jpg", caption: "Just Us 🥰", layout: "half" },
    {
        id: 6,
        src: "/images/6.jpg",
        caption: "Our First Date 💕",
        layout: "half",
    },
];
// ─────────────────────────────────────────────────────────────────────────────

const moments = [
    {
        emoji: "☀️",
        title: "Lazy Sunday",
        subtitle: "Just us, all day",
        description:
            "Tangled in sheets, your head on my chest, no alarms, no plans. Just your soft breathing and my heart completely full.",
        color: "from-amber-400/20 to-pink-400/20",
        border: "border-amber-400/30",
        tag: "my favorite kind of day 🥹",
    },
    {
        emoji: "🍳",
        title: "Kitchen Date",
        subtitle: "Cooking & chaos",
        description:
            "Flour on your nose, music too loud, bumping into each other — and somehow this messy kitchen felt like the most romantic place on earth.",
        color: "from-rose-400/20 to-red-400/20",
        border: "border-rose-400/30",
        tag: "better than any restaurant 🍽️",
    },
    {
        emoji: "🌙",
        title: "Midnight Talks",
        subtitle: "3am and only you",
        description:
            "The whole world asleep, but us talking about everything and nothing. Your voice at 3am is my favourite sound in the universe.",
        color: "from-indigo-400/20 to-blue-400/20",
        border: "border-indigo-400/30",
        tag: "I never want to hang up 💙",
    },
    {
        emoji: "🎬",
        title: "Movie Night",
        subtitle: "I watch you, not the film",
        description:
            "The movie played. I watched you laugh, gasp, quote every line. You're more beautiful than anything on that screen.",
        color: "from-purple-400/20 to-pink-400/20",
        border: "border-purple-400/30",
        tag: "what movie again? 😌",
    },
    {
        emoji: "☕",
        title: "Morning Coffee",
        subtitle: "Sleepy eyes & you",
        description:
            "Your messy hair, half-asleep face, hoodie too big — and somehow you're the most gorgeous person I've ever seen before 8am.",
        color: "from-yellow-400/20 to-orange-400/20",
        border: "border-yellow-400/30",
        tag: "you > coffee. always ☀️",
    },
    {
        emoji: "🌟",
        title: "Stargazing",
        subtitle: "Infinite sky, just us",
        description:
            "Lying on the grass, finding shapes in stars, your hand in mine. I forgot to look at the sky because I couldn't stop looking at you.",
        color: "from-cyan-400/20 to-purple-400/20",
        border: "border-cyan-400/30",
        tag: "you are my favourite star 🌠",
    },
    {
        emoji: "🚗",
        title: "Late Night Drive",
        subtitle: "Windows down, music up",
        description:
            "No destination. Just the road, our playlist, and you singing off-key with all your heart. I'd drive forever like this.",
        color: "from-teal-400/20 to-cyan-400/20",
        border: "border-teal-400/30",
        tag: "don't stop singing 🎵",
    },
    {
        emoji: "🌧️",
        title: "Rainy Day",
        subtitle: "Rain & you = perfect",
        description:
            "Rain on the window, a blanket around us, tea going cold. Every rainy day is beautiful because you're in it.",
        color: "from-slate-400/20 to-indigo-400/20",
        border: "border-slate-400/30",
        tag: "I love rainy days now 🌧️",
    },
];

// Build photo grid rows from layout hints
function buildRows(list) {
    const rows = [];
    let i = 0;
    while (i < list.length) {
        const p = list[i];
        if (p.layout === "full") {
            rows.push({ type: "full", items: [p] });
            i++;
        } else if (p.layout === "half") {
            const n = list[i + 1];
            if (n?.layout === "half") {
                rows.push({ type: "half", items: [p, n] });
                i += 2;
            } else {
                rows.push({ type: "full", items: [p] });
                i++;
            }
        } else {
            const p2 = list[i + 1],
                p3 = list[i + 2];
            if (p2?.layout === "third" && p3?.layout === "third") {
                rows.push({ type: "third", items: [p, p2, p3] });
                i += 3;
            } else if (p2?.layout === "third") {
                rows.push({ type: "half", items: [p, p2] });
                i += 2;
            } else {
                rows.push({ type: "full", items: [p] });
                i++;
            }
        }
    }
    return rows;
}

function PhotoTile({ photo, onClick, cls }) {
    const [loaded, setLoaded] = useState(false);
    const [err, setErr] = useState(false);
    return (
        <motion.div
            className={`relative overflow-hidden cursor-pointer group ${cls}`}
            whileTap={{ scale: 0.96 }}
            onClick={() => onClick(photo)}
        >
            {(!loaded || err) && (
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-white/5 flex flex-col items-center justify-center gap-1">
                    <span className="text-2xl opacity-25">📷</span>
                    {err && (
                        <span className="text-white/15 text-[10px] font-light">
                            {photo.src.split("/").pop()}
                        </span>
                    )}
                </div>
            )}
            {!err && (
                <img
                    src={photo.src}
                    alt={photo.caption}
                    className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
                    onLoad={() => setLoaded(true)}
                    onError={() => setErr(true)}
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                <span className="text-white text-[11px] font-light">
                    {photo.caption}
                </span>
            </div>
        </motion.div>
    );
}

export default function LoveAlbumScreen({ onNext, ...motionProps }) {
    const [lightbox, setLightbox] = useState(null);
    const [openCard, setOpenCard] = useState(null);
    const rows = buildRows(photos);

    return (
        <motion.div
            {...motionProps}
            className="min-h-screen flex flex-col relative"
        >
            {/* ── Sticky header ── */}
            <div className="sticky top-0 z-20 bg-black/85 backdrop-blur-md px-4 pt-6 pb-3 border-b border-white/5">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <motion.span
                        className="text-2xl"
                        animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        💌
                    </motion.span>
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 bg-clip-text text-transparent mt-1">
                        Our Love Album
                    </h2>
                    <p className="text-gray-500 text-xs font-light mt-0.5">
                        every little moment with you… is everything
                    </p>
                </motion.div>
            </div>

            {/* ── Scrollable body ── */}
            <div className="flex-1 overflow-y-auto pb-28">
                {/* ── Photo gallery section ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <p className="text-gray-600 text-[11px] font-semibold px-3 pt-4 pb-2 uppercase tracking-widest">
                        📸 Our Photos
                    </p>

                    <div className="flex flex-col gap-0.5">
                        {rows.map((row, ri) => (
                            <motion.div
                                key={ri}
                                className="flex gap-0.5"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.08 * ri + 0.35 }}
                            >
                                {row.items.map((p) => (
                                    <PhotoTile
                                        key={p.id}
                                        photo={p}
                                        onClick={setLightbox}
                                        cls={`${row.type === "full" ? "aspect-[4/3]" : "aspect-square"} flex-1`}
                                    />
                                ))}
                            </motion.div>
                        ))}
                    </div>

                    <p className="text-center text-gray-700 text-[11px] mt-3 font-light italic px-4">
                        {photos.length} moments frozen in time 🌸
                    </p>
                </motion.div>

                {/* ── Divider ── */}
                <div className="flex items-center gap-3 px-4 mt-8 mb-4">
                    <div className="flex-1 h-px bg-white/5" />
                    <span className="text-gray-600 text-xs font-light tracking-widest uppercase">
                        Our Moments
                    </span>
                    <div className="flex-1 h-px bg-white/5" />
                </div>

                {/* ── Romantic moment cards ── */}
                <div className="grid grid-cols-2 gap-3 px-3 pb-2">
                    {moments.map((m, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30, scale: 0.92 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                delay: 0.07 * i + 0.5,
                                type: "spring",
                                stiffness: 120,
                            }}
                            whileHover={{ scale: 1.03, y: -4 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() =>
                                setOpenCard(openCard === i ? null : i)
                            }
                            className={`relative cursor-pointer bg-gradient-to-br ${m.color} border ${m.border} rounded-2xl p-4 backdrop-blur-md shadow-xl overflow-hidden`}
                        >
                            <motion.span
                                className="text-3xl block mb-2"
                                animate={{ scale: [1, 1.15, 1] }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    delay: i * 0.3,
                                }}
                            >
                                {m.emoji}
                            </motion.span>
                            <p className="text-white font-bold text-sm leading-tight">
                                {m.title}
                            </p>
                            <p className="text-white/40 text-[11px] mb-2 font-light">
                                {m.subtitle}
                            </p>

                            <AnimatePresence>
                                {openCard === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-white/75 text-[11px] leading-relaxed font-light mb-2">
                                            {m.description}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <p className="text-white/30 text-[10px] italic font-light">
                                {openCard === i ? m.tag : "tap to read ✦"}
                            </p>

                            {/* shimmer */}
                            <motion.div
                                className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"
                                animate={{ opacity: [0, 0.6, 0] }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: i * 0.4,
                                }}
                            />
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    className="text-center text-pink-300/40 text-xs font-light italic px-4 mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    "Every ordinary moment with you becomes extraordinary" 🌸
                </motion.p>
            </div>

            {/* ── Floating next button ── */}
            <div className="fixed bottom-0 left-0 right-0 px-6 pb-6 pt-4 bg-gradient-to-t from-black via-black/80 to-transparent z-20 flex justify-center">
                <motion.button
                    className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-2xl shadow-pink-500/20 w-full max-w-sm"
                    onClick={onNext}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                >
                    One Last Thing 💝
                </motion.button>
            </div>

            {/* ── Lightbox ── */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/96 flex flex-col items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightbox(null)}
                    >
                        <motion.div
                            className="relative max-w-lg w-full"
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 22,
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={lightbox.src}
                                alt={lightbox.caption}
                                className="w-full rounded-2xl shadow-2xl object-contain max-h-[72vh]"
                            />
                            <p className="text-white text-center mt-3 text-sm font-light">
                                {lightbox.caption}
                            </p>
                            <div className="flex justify-between mt-4">
                                <button
                                    className="text-white/50 hover:text-white px-4 py-2 text-sm transition-colors"
                                    onClick={() => {
                                        const idx = photos.findIndex(
                                            (p) => p.id === lightbox.id,
                                        );
                                        setLightbox(
                                            photos[
                                                (idx - 1 + photos.length) %
                                                    photos.length
                                            ],
                                        );
                                    }}
                                >
                                    ← Prev
                                </button>
                                <button
                                    className="text-white/30 hover:text-white/70 text-xs px-4 py-2 transition-colors"
                                    onClick={() => setLightbox(null)}
                                >
                                    ✕ Close
                                </button>
                                <button
                                    className="text-white/50 hover:text-white px-4 py-2 text-sm transition-colors"
                                    onClick={() => {
                                        const idx = photos.findIndex(
                                            (p) => p.id === lightbox.id,
                                        );
                                        setLightbox(
                                            photos[(idx + 1) % photos.length],
                                        );
                                    }}
                                >
                                    Next →
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
