'use client'

import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface ImageComparisonProps {
  originalImage: string
  stylizedImage: string
  originalAlt?: string
  stylizedAlt?: string
  className?: string
}

export function ImageComparison({
  originalImage,
  stylizedImage,
  originalAlt = "Original image",
  stylizedAlt = "Stylized image",
  className
}: ImageComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100

    setSliderPosition(Math.min(Math.max(percentage, 0), 100))
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const percentage = (x / rect.width) * 100

    setSliderPosition(Math.min(Math.max(percentage, 0), 100))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!containerRef.current) return

    const step = e.shiftKey ? 10 : 1

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        setSliderPosition(prev => Math.min(Math.max(prev - step, 0), 100))
        break
      case 'ArrowRight':
        e.preventDefault()
        setSliderPosition(prev => Math.min(Math.max(prev + step, 0), 100))
        break
      case 'Home':
        e.preventDefault()
        setSliderPosition(0)
        break
      case 'End':
        e.preventDefault()
        setSliderPosition(100)
        break
    }
  }

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => handleMouseMove(e)
    const handleGlobalMouseUp = () => setIsDragging(false)
    const handleGlobalTouchMove = (e: TouchEvent) => handleTouchMove(e)
    const handleGlobalTouchEnd = () => setIsDragging(false)

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('mouseup', handleGlobalMouseUp)
      document.addEventListener('touchmove', handleGlobalTouchMove)
      document.addEventListener('touchend', handleGlobalTouchEnd)
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
      document.removeEventListener('touchmove', handleGlobalTouchMove)
      document.removeEventListener('touchend', handleGlobalTouchEnd)
    }
  }, [isDragging])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm",
        "focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2",
        className
      )}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="slider"
      aria-label="Image comparison slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={sliderPosition}
    >
      {/* Original Image (Bottom Layer) */}
      <img
        src={originalImage}
        alt={originalAlt}
        className="h-auto w-full object-cover"
        draggable={false}
      />

      {/* Stylized Image (Top Layer) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
        }}
      >
        <img
          src={stylizedImage}
          alt={stylizedAlt}
          className="h-auto w-full object-cover"
          draggable={false}
        />
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg cursor-ew-resize"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        {/* Slider Handle */}
        <div
          className={cn(
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
            "w-10 h-10 bg-white rounded-full shadow-lg border-2 border-gray-300",
            "flex items-center justify-center cursor-ew-resize",
            "hover:scale-110 transition-transform duration-200",
            isDragging && "scale-110"
          )}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="flex items-center space-x-1">
            <div className="w-1 h-4 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-4 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-md text-sm">
        Original
      </div>
      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-md text-sm">
        Stylized
      </div>

      {/* Instructions */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-md text-sm opacity-0 hover:opacity-100 transition-opacity duration-200">
        Drag to move or focus and use arrow keys
      </div>
    </div>
  )
}