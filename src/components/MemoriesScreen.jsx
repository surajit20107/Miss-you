"use client"

import { motion, AnimatePresence } from "motion/react"
import { useState } from "react"

// ─── ADD / REMOVE PHOTOS HERE ────────────────────────────────────────────────
// Just drop your image files into /public/images/ and update this list.
// Layout slots: "full" = full-width hero, "half" = 2 per row, "third" = 3 per row
const photos = [
    { id: 1, src: "/images/1.jpg", caption: "Our First Date 💕",   layout: "full"  },
    { id: 2, src: "/images/2.jpg", caption: "That Cute Selfie 📸", layout: "third" },
    { id: 3, src: "/images/3.jpg", caption: "Dancing Together 💃",  layout: "third" },
    { id: 4, src: "/images/4.jpg", caption: "Sunset Walks 🌅",     layout: "third" },
    { id: 5, src: "/images/5.jpg", caption: "Just Us 🥰",          layout: "half"  },
    { id: 6, src: "/images/6.jpg", caption: "My Favourite Moment ✨", layout: "half" },
]
// ─────────────────────────────────────────────────────────────────────────────

// Group photos into rows based on layout
function buildRows(photos) {
    const rows = []
    let i = 0
    while (i < photos.length) {
        const p = photos[i]
        if (p.layout === "full") {
            rows.push({ type: "full", items: [p] })
            i++
        } else if (p.layout === "half") {
            const next = photos[i + 1]
            if (next && next.layout === "half") {
                rows.push({ type: "half", items: [p, next] })
                i += 2
            } else {
                rows.push({ type: "full", items: [p] })
                i++
            }
        } else if (p.layout === "third") {
            const p2 = photos[i + 1]
            const p3 = photos[i + 2]
            if (p2 && p3 && p2.layout === "third" && p3.layout === "third") {
                rows.push({ type: "third", items: [p, p2, p3] })
                i += 3
            } else if (p2 && p2.layout === "third") {
                rows.push({ type: "half", items: [p, p2] })
                i += 2
            } else {
                rows.push({ type: "full", items: [p] })
                i++
            }
        } else {
            rows.push({ type: "full", items: [p] })
            i++
        }
    }
    return rows
}

function PhotoTile({ photo, onClick, aspectClass }) {
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)

    return (
        <motion.div
            className={`relative overflow-hidden cursor-pointer group ${aspectClass}`}
            whileTap={{ scale: 0.97 }}
            onClick={() => onClick(photo)}
        >
            {/* Placeholder shown while loading or on error */}
            {(!loaded || error) && (
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-white/5 flex flex-col items-center justify-center">
                    <span className="text-3xl opacity-30">📷</span>
                    {error && (
                        <span className="text-white/20 text-xs mt-2 font-light">add {photo.src.split("/").pop()}</span>
                    )}
                </div>
            )}

            {!error && (
                <img
                    src={photo.src}
                    alt={photo.caption}
                    className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
                    onLoad={() => setLoaded(true)}
                    onError={() => setError(true)}
                />
            )}

            {/* Caption overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                <span className="text-white text-xs font-light">{photo.caption}</span>
            </div>
        </motion.div>
    )
}

export default function MemoriesScreen({ onNext, ...motionProps }) {
    const [lightbox, setLightbox] = useState(null)
    const rows = buildRows(photos)

    return (
        <motion.div {...motionProps} className="min-h-screen flex flex-col relative">

            {/* ── Sticky header ── */}
            <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-md px-4 pt-8 pb-4 border-b border-white/5">
                <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <img src="/gifs/cute.gif" alt="cute" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                        <h2 className="text-xl font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent leading-tight">
                            Our Memories 📸
                        </h2>
                        <p className="text-gray-500 text-xs font-light">These moments make me miss you even more ❤️</p>
                    </div>
                </motion.div>
            </div>

            {/* ── Scrollable gallery ── */}
            <div className="flex-1 overflow-y-auto px-1 pb-28">

                {/* Date label */}
                <motion.p
                    className="text-gray-500 text-xs font-semibold px-3 pt-4 pb-2 uppercase tracking-widest"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Our Story 💕
                </motion.p>

                {/* Photo grid */}
                <div className="flex flex-col gap-0.5">
                    {rows.map((row, ri) => (
                        <motion.div
                            key={ri}
                            className={`flex gap-0.5 ${row.type === "full" ? "" : ""}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * ri + 0.4 }}
                        >
                            {row.type === "full" && (
                                <PhotoTile
                                    photo={row.items[0]}
                                    onClick={setLightbox}
                                    aspectClass="flex-1 aspect-[4/3]"
                                />
                            )}
                            {row.type === "half" && row.items.map(p => (
                                <PhotoTile
                                    key={p.id}
                                    photo={p}
                                    onClick={setLightbox}
                                    aspectClass="flex-1 aspect-square"
                                />
                            ))}
                            {row.type === "third" && row.items.map(p => (
                                <PhotoTile
                                    key={p.id}
                                    photo={p}
                                    onClick={setLightbox}
                                    aspectClass="flex-1 aspect-square"
                                />
                            ))}
                        </motion.div>
                    ))}
                </div>

                {/* Photo count */}
                <motion.p
                    className="text-center text-gray-600 text-xs mt-4 font-light italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    {photos.length} moments frozen in time 🌸
                </motion.p>
            </div>

            {/* ── Floating next button ── */}
            <div className="fixed bottom-0 left-0 right-0 px-6 pb-6 pt-4 bg-gradient-to-t from-black via-black/80 to-transparent z-20 flex justify-center">
                <motion.button
                    className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-2xl shadow-pink-500/20 w-full max-w-sm"
                    onClick={onNext}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    Our Love Album 💌
                </motion.button>
            </div>

            {/* ── Lightbox ── */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4"
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
                            transition={{ type: "spring", stiffness: 260, damping: 22 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <img
                                src={lightbox.src}
                                alt={lightbox.caption}
                                className="w-full rounded-2xl shadow-2xl object-contain max-h-[75vh]"
                            />
                            <p className="text-white text-center mt-4 text-base font-light">{lightbox.caption}</p>

                            {/* Prev / Next in lightbox */}
                            <div className="flex justify-between mt-4">
                                <button
                                    className="text-white/50 hover:text-white px-4 py-2 text-sm"
                                    onClick={() => {
                                        const idx = photos.findIndex(p => p.id === lightbox.id)
                                        setLightbox(photos[(idx - 1 + photos.length) % photos.length])
                                    }}
                                >← Prev</button>
                                <button
                                    className="text-white/40 hover:text-white/80 text-xs px-4 py-2"
                                    onClick={() => setLightbox(null)}
                                >✕ Close</button>
                                <button
                                    className="text-white/50 hover:text-white px-4 py-2 text-sm"
                                    onClick={() => {
                                        const idx = photos.findIndex(p => p.id === lightbox.id)
                                        setLightbox(photos[(idx + 1) % photos.length])
                                    }}
                                >Next →</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
