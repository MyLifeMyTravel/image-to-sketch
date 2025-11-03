"use client"

import { useState } from "react"
import { Upload, Sparkles, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const styles = [
  { id: 1, name: "Realistic Sketch", preview: "/realistic-pencil-sketch-of-cat.jpg" },
  { id: 2, name: "Line Art", preview: "/simple-line-art-sketch-of-cat.jpg" },
  { id: 3, name: "Portrait", preview: "/portrait-sketch-style.jpg" },
  { id: 4, name: "Cartoon", preview: "/cartoon-sketch-style-of-cat.jpg" },
  { id: 5, name: "Architectural", preview: "/architectural-sketch-lines.jpg" },
  { id: 6, name: "Gesture", preview: "/gesture-drawing-sketch.jpg" },
]

export function ConverterSection() {
  const [selectedStyle, setSelectedStyle] = useState(1)

  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-balance">
            Transform Images into Stunning Sketches
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your photo, choose a style, and generate unique artistic sketches powered by AI
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Upload className="h-5 w-5 text-gray-700" />
                <h3 className="font-semibold text-gray-900">Upload Image</h3>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors cursor-pointer">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-700 font-medium mb-1">Click to upload or drag image here</p>
                <p className="text-sm text-gray-500">Supports JPG, PNG, WEBP formats (Max 10MB)</p>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Choose Style</h3>
              <div className="grid grid-cols-3 gap-3">
                {styles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                      selectedStyle === style.id
                        ? "border-black ring-2 ring-black ring-offset-2"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={style.preview || "/placeholder.svg"}
                      alt={style.name}
                      className="w-full aspect-square object-cover"
                    />
                  </button>
                ))}
              </div>
            </Card>

            <Button className="w-full bg-gray-700 hover:bg-gray-800 text-white py-6 text-base" size="lg">
              <Sparkles className="h-5 w-5 mr-2" />
              Generate Sketch
              <span className="ml-2 text-xs bg-gray-600 px-2 py-0.5 rounded">2</span>
            </Button>
          </div>

          {/* Result Section */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <ImageIcon className="h-5 w-5 text-gray-700" />
              <h3 className="font-semibold text-gray-900">Generated Result</h3>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 min-h-[400px] flex flex-col items-center justify-center text-center">
              <ImageIcon className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-gray-700 font-medium mb-2">Waiting for Generation</p>
              <p className="text-sm text-gray-500 max-w-xs">
                Upload an image and select a style, then click generate to create your artistic sketch
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
