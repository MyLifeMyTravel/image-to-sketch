'use client'

import React from 'react'
import { ImageComparison } from './image-comparison'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { showcases } from '@/config/showcases'

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
          {showcases.map((showcase, index) => (
            <div
              key={showcase.name}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* 奇数项：左文案，右图片 */}
              {index % 2 === 0 && (
                <>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {showcase.name}
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {showcase.description}
                      </p>
                    </div>
                  </div>
                  <div className="order-first lg:order-last">
                    <ImageComparison
                      originalImage={showcase.originalImage}
                      stylizedImage={showcase.stylizedImage}
                      originalAlt={`Original image for ${showcase.name} style`}
                      stylizedAlt={`${showcase.name} style conversion`}
                      className="w-full shadow-xl rounded-xl hover:shadow-2xl transition-shadow duration-300"
                    />
                  </div>
                </>
              )}

              {/* 偶数项：左图片，右文案 */}
              {index % 2 === 1 && (
                <>
                  <div className="order-first lg:order-first">
                    <ImageComparison
                      originalImage={showcase.originalImage}
                      stylizedImage={showcase.stylizedImage}
                      originalAlt={`Original image for ${showcase.name} style`}
                      stylizedAlt={`${showcase.name} style conversion`}
                      className="w-full shadow-xl rounded-xl hover:shadow-2xl transition-shadow duration-300"
                    />
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {showcase.name}
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {showcase.description}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-6 p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900">Ready to transform your images?</h3>
            <p className="text-gray-600 max-w-md">
              Upload your photo and choose from multiple sketch styles to create stunning artistic results.
            </p>
            <Button
              onClick={scrollToConverter}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition-all duration-200 hover:shadow-lg"
            >
              Try It Now For Free
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}