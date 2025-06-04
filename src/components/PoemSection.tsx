"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"

interface PoemSectionProps {
  onProgressUpdate?: (progress: number) => void
}

const PoemSection = ({ onProgressUpdate }: PoemSectionProps) => {
  const [currentPhase, setCurrentPhase] = useState<"welcome" | "poem">("welcome")
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showDaysCounter, setShowDaysCounter] = useState(false)
  const [showEyesPhoto, setShowEyesPhoto] = useState(false)
  const [lineKey, setLineKey] = useState(0)
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const welcomeLines = [
    "oi meu amor",
    "hoje é dia 12",
    "eu fiz esse site pra tentar demonstrar todo o meu amor por você, mesmo que apenas assim seja pouco",
    "eu provavelmente estou na sua frente agora",
    "eu te amo. aproveite um de seus presentes!",
  ]

  const poemLines = [
    "sinto um fervor subir do peito quando penso em ti",
    "e não desses que queimam e somem",
    "mas um que se espalha devargarinho",
    "do coração até a ponta dos dedos",
    "como se teu nome tivesse acendido uma estrela dentro de mim",
    "e transformasse cada célula do meu corpo",
    "num altar aceso",
    "só pra te receber",
    "você é um feitiço bordado a mão",
    "o universo te costurou do avesso do tempo",
    "só pra caber no meu destino",
    "você é mística",
    "te amar é ter a alma lavada toda vez que seus olhos",
    "(seus olhos que são só teus)",
    "se debruçam sobre mim",
    "e fazem o mundo desaparecer",
    "somos nós dois",
    "sempre.",
  ]

  // Calculate time difference
  useEffect(() => {
    const startDate = new Date("2024-01-03")

    const updateTime = () => {
      const now = new Date()
      const diff = now.getTime() - startDate.getTime()

      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24))
      const totalHours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const totalMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const totalSeconds = Math.floor((diff % (1000 * 60)) / 1000)

      setDays(totalDays)
      setHours(totalHours)
      setMinutes(totalMinutes)
      setSeconds(totalSeconds)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  const getCurrentLines = () => {
    return currentPhase === "welcome" ? welcomeLines : poemLines
  }

  const getCurrentLine = () => {
    const lines = getCurrentLines()
    return lines[currentLineIndex] || ""
  }

  const getLineDuration = (line: string) => {
    return line.length > 50 ? 4500 : 3500
  }

  const getTotalLines = () => {
    return welcomeLines.length + poemLines.length
  }

  const getCurrentProgress = () => {
    const totalWelcomeLines = welcomeLines.length
    if (currentPhase === "welcome") {
      return currentLineIndex + 1
    } else {
      return totalWelcomeLines + currentLineIndex + 1
    }
  }

  const shouldShowDaysCounter = () => {
    return currentPhase === "poem" && currentLineIndex >= 8
  }

  const shouldShowEyesPhoto = () => {
    return currentPhase === "poem" && (currentLineIndex === 12 || currentLineIndex === 13)
  }

  // Auto-dismiss pop-ups with smooth transitions
  useEffect(() => {
    if (showDaysCounter) {
      const timer = setTimeout(() => {
        setShowDaysCounter(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showDaysCounter])

  useEffect(() => {
    if (showEyesPhoto) {
      const timer = setTimeout(() => {
        setShowEyesPhoto(false)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [showEyesPhoto])

  useEffect(() => {
    if (isComplete) return

    const lines = getCurrentLines()
    const currentLine = getCurrentLine()
    const duration = getLineDuration(currentLine)

    // Show elements based on progress
    if (shouldShowDaysCounter() && !showDaysCounter) {
      setShowDaysCounter(true)
    }
    if (shouldShowEyesPhoto() && !showEyesPhoto) {
      setShowEyesPhoto(true)
    }

    // Notify parent about progress
    if (onProgressUpdate) {
      const progress = getCurrentProgress()
      const total = getTotalLines()
      onProgressUpdate((progress / total) * 100)
    }

    const timer = setTimeout(() => {
      if (currentLineIndex < lines.length - 1) {
        setCurrentLineIndex((prev) => prev + 1)
        setLineKey((prev) => prev + 1)
      } else if (currentPhase === "welcome") {
        setCurrentPhase("poem")
        setCurrentLineIndex(0)
        setLineKey((prev) => prev + 1)
      } else {
        setIsComplete(true)
        if (onProgressUpdate) {
          onProgressUpdate(100)
        }
      }
    }, duration)

    return () => clearTimeout(timer)
  }, [currentLineIndex, currentPhase, isComplete, onProgressUpdate])

  if (isComplete) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-95 backdrop-blur-smooth flex items-center justify-center overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blood-red-900/10 via-transparent via-purple-900/5 to-blood-red-900/10 animate-gradient"></div>

      {/* Floating hearts with improved animations */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute will-change-transform"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          >
            <Heart size={Math.random() * 6 + 3} className="text-blood-red-400 heart-float fill-current opacity-20" />
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full px-6 text-center">
        {/* Eyes photo popup - Smooth entrance */}
        <div
          className={`fixed top-8 right-8 z-20 transition-all duration-700 ease-custom ${
            showEyesPhoto
              ? "opacity-80 translate-y-0 scale-100"
              : "opacity-0 translate-y-4 scale-95 pointer-events-none"
          }`}
        >
          <div className="bg-black/50 backdrop-blur-smooth rounded-xl p-4 border border-blood-red-400/20 shadow-2xl smooth-transition smooth-hover">
            <div className="w-52 h-14 bg-gradient-to-r from-blood-red-900/20 to-purple-900/20 rounded-lg flex items-center justify-center text-blood-red-200 text-sm font-light">
              ✨ Seus olhos únicos
            </div>
          </div>
        </div>

        {/* Main poem content with smooth text reveal */}
        <div className="min-h-[200px] flex items-center justify-center">
          <div key={lineKey} className="animate-text-reveal will-change-transform will-change-opacity">
            <div
              className={`leading-relaxed smooth-transition ${
                currentPhase === "welcome"
                  ? "text-xl md:text-2xl lg:text-3xl font-light"
                  : "text-lg md:text-xl lg:text-2xl font-light"
              } ${getCurrentLine().includes("(seus olhos") ? "text-blood-red-300 italic text-base" : ""} ${
                getCurrentLine().includes("seus olhos") ? "text-blood-red-200" : ""
              } text-white`}
            >
              {getCurrentLine()}
            </div>
          </div>
        </div>

        {/* Days Counter Popup - Smooth entrance */}
        <div
          className={`fixed bottom-8 left-8 z-20 transition-all duration-700 ease-custom ${
            showDaysCounter
              ? "opacity-90 translate-y-0 scale-100"
              : "opacity-0 translate-y-4 scale-95 pointer-events-none"
          }`}
        >
          <div className="bg-black/60 backdrop-blur-smooth rounded-xl p-5 border border-blood-red-400/20 shadow-2xl max-w-xs smooth-transition smooth-hover">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Heart className="text-blood-red-400 animate-soft-pulse fill-current" size={18} />
              <h3 className="text-sm font-semibold text-blood-red-200">Te amando há</h3>
              <Heart className="text-blood-red-400 animate-soft-pulse fill-current" size={18} />
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              {[
                { value: days, label: "dias" },
                { value: hours, label: "horas" },
                { value: minutes, label: "min" },
                { value: seconds, label: "seg" },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`bg-blood-red-900/20 rounded-lg p-3 smooth-transition hover:bg-blood-red-900/30 stagger-${index + 1}`}
                >
                  <div className="text-xl font-bold text-blood-red-300 smooth-transition">{item.value}</div>
                  <div className="text-xs text-blood-red-400">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PoemSection
