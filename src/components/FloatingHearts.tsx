"use client"

import { Heart } from "lucide-react"
import { useEffect, useState } from "react"

interface HeartPosition {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<HeartPosition[]>([])

  useEffect(() => {
    const generateHearts = () => {
      const newHearts: HeartPosition[] = []
      for (let i = 0; i < 8; i++) {
        newHearts.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          delay: Math.random() * 6,
          duration: Math.random() * 4 + 4,
        })
      }
      setHearts(newHearts)
    }

    generateHearts()
  }, [])

  const colors = ["text-blood-red-600/30", "text-purple-600/30", "text-blood-red-500/30"]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute will-change-transform"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          <Heart
            size={heart.size}
            className={`${colors[heart.id % colors.length]} heart-float fill-current smooth-transition`}
          />
        </div>
      ))}
    </div>
  )
}

export default FloatingHearts
