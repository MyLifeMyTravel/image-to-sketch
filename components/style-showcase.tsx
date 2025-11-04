'use client'

import React from 'react'
import { ImageComparison } from './image-comparison'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface StyleShowcaseProps {
  className?: string
}

export function StyleShowcase({ className }: StyleShowcaseProps) {
  const scrollToConverter = () => {
    const element = document.getElementById('image-to-sketch')
    if (element) {
      const headerHeight = 64 // 16 * 4 = 64px (h-16)
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const styles = [
    {
      name: "Realistic Sketch",
      description: "Transform portraits and photos into realistic pencil drawings with authentic shading and texture.",
      originalImage: "/placeholder.jpg",
      stylizedImage: "/realistic-pencil-sketch-of-cat.jpg"
    },
    {
      name: "Line Art",
      description: "Create clean, minimalist line drawings perfect for coloring books and modern art.",
      originalImage: "/placeholder.jpg",
      stylizedImage: "/simple-line-art-sketch-of-cat.jpg"
    },
    {
      name: "Portrait Sketch",
      description: "Professional portrait sketches with enhanced details and artistic expression.",
      originalImage: "/placeholder.jpg",
      stylizedImage: "/portrait-sketch-style.jpg"
    },
    {
      name: "Cartoon Style",
      description: "Turn photos into playful cartoon-style sketches with simplified features and fun artistic flair.",
      originalImage: "/placeholder.jpg",
      stylizedImage: "/cartoon-sketch-style-of-cat.jpg"
    },
    {
      name: "Architectural",
      description: "Convert building photos into clean architectural line drawings perfect for design presentations.",
      originalImage: "/placeholder.jpg",
      stylizedImage: "/architectural-sketch-lines.jpg"
    },
    {
      name: "Gesture Drawing",
      description: "Create dynamic gesture drawings that capture movement and flow with artistic expression.",
      originalImage: "/placeholder.jpg",
      stylizedImage: "/gesture-drawing-sketch.jpg"
    }
  ]

  return (
    <section id="use-cases" className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Transform Your Images into Art
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover the perfect sketch style for every creative project.
            Each style is optimized for different artistic needs and applications.
          </p>
        </div>

        <div className="space-y-16">
          {styles.map((style, index) => (
            <div
              key={style.name}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* 奇数项：左文案，右图片 */}
              {index % 2 === 0 && (
                <>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {style.name}
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {style.description}
                      </p>
                    </div>
                  </div>
                  <div className="order-first lg:order-last">
                    <ImageComparison
                      originalImage={style.originalImage}
                      stylizedImage={style.stylizedImage}
                      originalAlt={`Original image for ${style.name} style`}
                      stylizedAlt={`${style.name} style conversion`}
                      className="w-full shadow-lg rounded-lg"
                    />
                  </div>
                </>
              )}

              {/* 偶数项：左图片，右文案 */}
              {index % 2 === 1 && (
                <>
                  <div className="order-first lg:order-first">
                    <ImageComparison
                      originalImage={style.originalImage}
                      stylizedImage={style.stylizedImage}
                      originalAlt={`Original image for ${style.name} style`}
                      stylizedAlt={`${style.name} style conversion`}
                      className="w-full shadow-lg rounded-lg"
                    />
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {style.name}
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {style.description}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex flex-col items-center gap-4 p-6 bg-muted/50 rounded-lg">
            <h3 className="text-lg font-semibold">Ready to transform your images?</h3>
            <p className="text-muted-foreground">
              Upload your photo and choose from multiple sketch styles to create stunning artistic results.
            </p>
            <Button onClick={scrollToConverter} className="mt-2">
              Try It Now For Free
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}