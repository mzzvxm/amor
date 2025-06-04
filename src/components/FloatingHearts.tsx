"use client"

import { Heart } from "lucide-react"
import { useEffect, useState } from "react"

interface HeartPosition {
  id: number
  x: number
  y: number
  size: number
  delay: number
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<HeartPosition[]>([])

  useEffect(() => {
    const generateHearts = () => {
      const newHearts: HeartPosition[] = []
      for (let i = 0; i < 4; i++) {
        newHearts.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 2,
          delay: Math.random() * 8,
        })
      }
      setHearts(newHearts)
    }

    generateHearts()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute opacity-10"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          <Heart
            size={heart.size}
            className="text-blood-red-400 fill-current"
            style={{
              animation: `heartFloat 12s ease-in-out infinite`,
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default FloatingHearts
