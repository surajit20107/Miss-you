"use client"

import { memo, useEffect, useState } from 'react'

const BackgroundAnimation = memo(function BackgroundAnimation() {
    const [items, setItems] = useState([])

    useEffect(() => {
        // Generate stars + hearts once on mount, animate via CSS only
        const stars = Array.from({ length: 50 }, (_, i) => ({
            id: `s${i}`,
            type: 'star',
            left: Math.random() * 100,
            top: Math.random() * 100,
            size: Math.random() * 2 + 1,
            duration: Math.random() * 4 + 3,
            delay: Math.random() * 6,
        }))
        const hearts = Array.from({ length: 12 }, (_, i) => ({
            id: `h${i}`,
            type: 'heart',
            left: Math.random() * 100,
            top: Math.random() * 100,
            size: Math.random() * 10 + 10,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 8,
        }))
        setItems([...stars, ...hearts])
    }, [])

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {items.map(item =>
                item.type === 'star' ? (
                    <div
                        key={item.id}
                        className="bg-particle-star"
                        style={{
                            position: 'absolute',
                            left: `${item.left}%`,
                            top: `${item.top}%`,
                            width: `${item.size}px`,
                            height: `${item.size}px`,
                            borderRadius: '50%',
                            background: 'white',
                            animationName: 'starPulse',
                            animationDuration: `${item.duration}s`,
                            animationDelay: `${item.delay}s`,
                            animationIterationCount: 'infinite',
                            animationTimingFunction: 'ease-in-out',
                        }}
                    />
                ) : (
                    <div
                        key={item.id}
                        style={{
                            position: 'absolute',
                            left: `${item.left}%`,
                            top: `${item.top}%`,
                            fontSize: `${item.size}px`,
                            animationName: 'heartFloat',
                            animationDuration: `${item.duration}s`,
                            animationDelay: `${item.delay}s`,
                            animationIterationCount: 'infinite',
                            animationTimingFunction: 'ease-in-out',
                        }}
                    >
                        ❤️
                    </div>
                )
            )}
        </div>
    )
})

export default BackgroundAnimation
