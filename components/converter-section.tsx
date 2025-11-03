"use client"

import { useState, useRef, useCallback } from "react"
import { Upload, Sparkles, ImageIcon, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ImageComparison } from "@/components/image-comparison"

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
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 文件处理函数
  const handleFileUpload = useCallback((file: File) => {
    // 验证文件类型
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      alert('请选择 JPG、PNG 或 WEBP 格式的图片')
      return
    }

    // 验证文件大小 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('图片大小不能超过 10MB')
      return
    }

    // 读取文件并设置为预览图
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setUploadedImage(result)
      setGeneratedImage(null) // 重置生成结果
    }
    reader.readAsDataURL(file)
  }, [])

  // 文件选择处理
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }, [handleFileUpload])

  // 拖拽处理
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileUpload(file)
    }
  }, [handleFileUpload])

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  return (
    <section id="image-to-sketch" className="bg-gray-50 py-16 md:py-24">
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

              {!uploadedImage ? (
                <div className="space-y-4">
                  <div
                    className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer ${
                      isDragging
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={openFileDialog}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <Upload className={`h-12 w-12 mx-auto mb-4 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
                    <p className="text-gray-700 font-medium mb-1">Click to upload or drag image here</p>
                    <p className="text-sm text-gray-500">Supports JPG, PNG, WEBP formats (Max 10MB)</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleFileSelect}
                    />
                  </div>
                  <div className="text-center">
                    <Button
                      variant="outline"
                      onClick={() => setUploadedImage("/cat-sketch-transformation-showing-original-photo-a.jpg")}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Use Example Image
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={uploadedImage}
                      alt="Uploaded image"
                      className="w-full h-auto object-cover"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                      onClick={() => {
                        setUploadedImage(null)
                        setGeneratedImage(null)
                      }}
                    >
                      Change Image
                    </Button>
                  </div>
                </div>
              )}
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

            <Button
              className="w-full bg-gray-700 hover:bg-gray-800 text-white py-6 text-base"
              size="lg"
              onClick={() => {
                if (!uploadedImage) return

                setIsGenerating(true)
                // 模拟生成过程
                setTimeout(() => {
                  // 这里应该是实际的API调用
                  // 现在使用示例图片来演示
                  const selectedStyleData = styles.find(s => s.id === selectedStyle)
                  setGeneratedImage(selectedStyleData?.preview || "/placeholder.svg")
                  setIsGenerating(false)
                }, 2000)
              }}
              disabled={!uploadedImage || isGenerating}
            >
              <Sparkles className={`h-5 w-5 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
              {isGenerating ? 'Generating...' : 'Generate Sketch'}
              <span className="ml-2 text-xs bg-gray-600 px-2 py-0.5 rounded">2</span>
            </Button>
          </div>

          {/* Result Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-gray-700" />
                <h3 className="font-semibold text-gray-900">Generated Result</h3>
              </div>
              {generatedImage && (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              )}
            </div>

            {!uploadedImage ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 min-h-[400px] flex flex-col items-center justify-center text-center">
                <ImageIcon className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-700 font-medium mb-2">Waiting for Generation</p>
                <p className="text-sm text-gray-500 max-w-xs">
                  Upload an image and select a style, then click generate to create your artistic sketch
                </p>
              </div>
            ) : isGenerating ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 min-h-[400px] flex flex-col items-center justify-center text-center">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
                <p className="text-gray-700 font-medium mt-4">Generating your sketch...</p>
                <p className="text-sm text-gray-500 max-w-xs">
                  Our AI is creating your artistic sketch with the selected style
                </p>
              </div>
            ) : generatedImage ? (
              <ImageComparison
                originalImage={uploadedImage}
                stylizedImage={generatedImage}
                originalAlt="Original uploaded image"
                stylizedAlt={`Generated ${styles.find(s => s.id === selectedStyle)?.name} sketch`}
                className="w-full"
              />
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 min-h-[400px] flex flex-col items-center justify-center text-center">
                <Sparkles className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-700 font-medium mb-2">Ready to Generate</p>
                <p className="text-sm text-gray-500 max-w-xs">
                  Your image is uploaded and style is selected. Click generate to create your artistic sketch
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}
