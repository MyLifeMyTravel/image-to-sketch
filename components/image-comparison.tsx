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
    updateSliderPosition(e)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    setIsDragging(true)
    updateSliderPositionFromTouch(e)
  }

  const updateSliderPosition = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100

    setSliderPosition(Math.min(Math.max(percentage, 0), 100))
  }

  const updateSliderPositionFromTouch = (e: React.TouchEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const percentage = (x / rect.width) * 100

    setSliderPosition(Math.min(Math.max(percentage, 0), 100))
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
        "relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm cursor-pointer",
        "focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2",
        "hover:shadow-md transition-shadow duration-200",
        className
      )}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="slider"
      aria-label="Drag to move or focus and use arrow keys"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={sliderPosition}
    >
      {/* Original Image (Bottom Layer) */}
      <img
        src={originalImage}
        alt={originalAlt}
        className="h-auto w-full object-cover select-none"
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
          className="h-auto w-full object-cover select-none"
          draggable={false}
        />
      </div>

      {/* Click Hint Overlay */}
      {!isDragging && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-medium">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 21V3" />
              </svg>
              <span>Click to drag</span>
            </div>
          </div>
        </div>
      )}

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 flex flex-col items-center pointer-events-none text-white"
        style={{
          left: `${sliderPosition}%`,
          transform: 'translateX(-50%)',
          cursor: isDragging ? 'ew-resize' : 'ew-resize'
        }}
      >
        {/* Top Line */}
        <div
          className="flex-grow h-full w-0.5 bg-current pointer-events-auto"
          style={{
            boxShadow: '0 0 4px rgba(0,0,0,0.5)'
          }}
        />

        {/* Slider Handle Button */}
        <div
          className={cn(
            "flex items-center justify-center flex-shrink-0 pointer-events-auto transition-all duration-200",
            "backdrop-blur-sm",
            isDragging ? "scale-105" : "hover:scale-105"
          )}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            border: '2px solid rgba(255, 255, 255, 0.8)',
            backgroundColor: 'rgba(0, 0, 0, 0.125)',
            boxShadow: '0 0 4px rgba(0,0,0,0.35)',
            display: 'grid',
            gridAutoFlow: 'column',
            gap: '8px',
            placeContent: 'center'
          }}
        >
          {/* Left Arrow */}
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: '8px solid transparent',
              borderBottom: '8px solid transparent',
              borderRight: '10px solid white'
            }}
          />

          {/* Right Arrow */}
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: '8px solid transparent',
              borderBottom: '8px solid transparent',
              borderLeft: '10px solid white'
            }}
          />
        </div>

        {/* Bottom Line */}
        <div
          className="flex-grow h-full w-0.5 bg-current pointer-events-auto"
          style={{
            boxShadow: '0 0 4px rgba(0,0,0,0.5)'
          }}
        />
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
        Click anywhere to drag • Use arrow keys to fine-tune
      </div>
    </div>
  )
}