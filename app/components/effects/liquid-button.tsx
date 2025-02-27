"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface LiquidButtonProps {
  children: React.ReactNode
  className?: string
}

export function LiquidButton({ children, className = "" }: LiquidButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const liquidRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    const canvas = liquidRef.current
    if (!button || !canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0
    const points: { x: number; y: number; originX: number; originY: number }[] = []
    const numberOfPoints = 8
    const viscosity = 20
    const mouseDist = 80
    const damping = 0.15
    const mousePos = { x: 0, y: 0 }
    let isMouseOver = false // Changed from const to let

    const resize = () => {
      canvas.width = button.offsetWidth
      canvas.height = button.offsetHeight

      // Initialize points
      points.length = 0
      for (let i = 0; i < numberOfPoints; i++) {
        const x = canvas.width * (i / (numberOfPoints - 1))
        const y = canvas.height / 2
        points.push({
          x,
          y,
          originX: x,
          originY: y,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#FFD700"
      ctx.beginPath()
      ctx.moveTo(0, 0)

      // Update points
      for (let i = 0; i < points.length; i++) {
        const point = points[i]
        const dx = mousePos.x - point.x
        const dy = mousePos.y - point.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < mouseDist && isMouseOver) {
          const angle = Math.atan2(dy, dx)
          const force = (mouseDist - dist) / mouseDist
          point.x += Math.cos(angle) * force * viscosity
          point.y += Math.sin(angle) * force * viscosity
        }

        // Spring back to original position
        point.x += (point.originX - point.x) * damping
        point.y += (point.originY - point.y) * damping
      }

      // Draw liquid
      ctx.moveTo(points[0].x, points[0].y)
      for (let i = 0; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2
        const yc = (points[i].y + points[i + 1].y) / 2
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
      }
      ctx.lineTo(canvas.width, canvas.height)
      ctx.lineTo(0, canvas.height)
      ctx.closePath()
      ctx.fill()

      time += 0.1
      animationFrameId = requestAnimationFrame(animate)
    }

    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect()
      mousePos.x = e.clientX - rect.left
      mousePos.y = e.clientY - rect.top
    })
    button.addEventListener("mouseenter", () => (isMouseOver = true))
    button.addEventListener("mouseleave", () => (isMouseOver = false))
    window.addEventListener("resize", resize)

    resize()
    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.button
      ref={buttonRef}
      className={`relative overflow-hidden ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <canvas ref={liquidRef} className="absolute inset-0 pointer-events-none" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

