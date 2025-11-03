"use client"

import { useState, useRef, useCallback } from "react"
import { Upload, Sparkles, ImageIcon, Download, Share2, ChevronLeft, ChevronRight } from "lucide-react"
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
  { id: 7, name: "Coloring Book", preview: "/simple-line-art-sketch-of-cat.jpg" },
  { id: 8, name: "Charcoal", preview: "/cartoon-sketch-style-of-cat.jpg" },
  { id: 9, name: "Ink Style", preview: "/gesture-drawing-sketch.jpg" },
  { id: 10, name: "Watercolor", preview: "/realistic-pencil-sketch-of-cat.jpg" },
  { id: 11, name: "Abstract", preview: "/portrait-sketch-style.jpg" },
  { id: 12, name: "Minimalist", preview: "/architectural-sketch-lines.jpg" },
]

export function ConverterSection() {
  const [selectedStyle, setSelectedStyle] = useState(1)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 文件处理函数
  const handleFileUpload = useCallback((file: File) => {
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
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
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
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight md:text-4xl">
            Transform Images into Stunning Sketches
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-gray-600 md:text-lg">
            Upload your photo, choose a style, and generate unique artistic sketches powered by AI
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[40fr_60fr]">
          {/* Upload Section */}
          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border bg-white/80 p-6 shadow-sm backdrop-blur">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <Upload className="size-5" />
                Upload Image
              </h3>

              <div
                className="group relative flex aspect-[16/9] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-colors border-gray-300/25 bg-gray-50/30 hover:border-gray-300/50 hover:bg-gray-50/50"
                onClick={openFileDialog}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {!uploadedImage ? (
                  <>
                    {/* 上传图标 */}
                    <Upload className="h-12 w-12 text-gray-400 mb-4" />

                    {/* 文字内容 */}
                    <p className="text-gray-700 font-medium mb-2 text-center">
                      Click to upload or drag image here
                    </p>
                    <p className="text-sm text-gray-500 text-center">
                      Supports JPG, PNG, WEBP formats (Max 10MB)
                    </p>
                  </>
                ) : (
                  <div className="relative size-full overflow-hidden rounded-2xl">
                    <img
                      src={uploadedImage}
                      alt="Uploaded image"
                      className="object-contain w-full h-full"
                    />
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleFileSelect}
                />
              </div>
            </div>

            <div className="rounded-3xl border bg-white/80 p-6 shadow-sm backdrop-blur">
              <h3 className="mb-4 text-lg font-semibold">Choose Style</h3>

              {/* 风格网格 - 3列，动态高度控制 */}
              <div className={`grid grid-cols-3 gap-3 mb-4 ${
                Math.ceil(styles.length / 6) > 1
                  ? 'grid-rows-2' // 强制2行布局
                  : '' // 自动行数
              }`}>
                {styles
                  .slice(currentPage * 6, (currentPage + 1) * 6)
                  .map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`group relative aspect-[4/3] overflow-hidden rounded-xl border-2 transition-all ${
                        selectedStyle === style.id
                          ? "border-blue-500 shadow-lg scale-105"
                          : "border-gray-200 hover:border-blue-400 hover:shadow-md"
                      }`}
                    >
                      <img
                        src={style.preview || "/placeholder.svg"}
                        alt={style.name}
                        className="w-full h-full object-cover"
                      />

                      {/* 选中状态标识 */}
                      {selectedStyle === style.id && (
                        <div className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-blue-500 shadow-lg">
                          <svg className="size-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      )}

                      {/* 风格名称 */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                        <p className="text-white text-xs font-medium text-center truncate">
                          {style.name}
                        </p>
                      </div>
                    </button>
                  ))}
              </div>

              {/* 分页控制 - 移到底部 */}
              {Math.ceil(styles.length / 6) > 1 && (
                <div className="flex items-center justify-between border-t pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                    disabled={currentPage === 0}
                    className="flex items-center gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>

                  <span className="text-sm text-gray-600">
                    Page {currentPage + 1} of {Math.ceil(styles.length / 6)}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(Math.ceil(styles.length / 6) - 1, prev + 1))}
                    disabled={currentPage >= Math.ceil(styles.length / 6) - 1}
                    className="flex items-center gap-1"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Button
                className="w-full rounded-xl py-6 font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all"
                disabled={!uploadedImage || isGenerating}
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
              >
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  <span>{isGenerating ? 'Creating your sketch...' : 'Generate Sketch'}</span>
                  {!isGenerating && (
                    <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium">
                      <svg className="h-3.5 w-3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                        <circle cx="8" cy="8" r="6"></circle>
                        <path d="M18.09 10.37A6 6 0 1 1 10.34 18"></path>
                        <path d="M7 6h1v4"></path>
                        <path d="m16.71 13.88.7.71-2.82 2.82"></path>
                      </svg>
                      2
                    </span>
                  )}
                </div>
              </Button>
            </div>
          </div>

          {/* Result Section */}
          <div className="rounded-3xl border bg-white/80 p-6 shadow-sm backdrop-blur">
            <h3 className="mb-4 text-lg font-semibold">Generated Result</h3>

            {!uploadedImage ? (
              <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border-2 border-dashed border-gray-300/25 bg-gray-50/30">
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="rounded-full bg-gray-100 p-4">
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm md:text-base font-medium">Waiting for Generation</p>
                    <p className="text-xs mt-1 md:text-sm text-gray-500 max-w-xs">
                      Upload an image and select a style, then click generate to create your artistic sketch
                    </p>
                  </div>
                </div>
              </div>
            ) : isGenerating ? (
              <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border-2 border-dashed border-gray-300/25 bg-gray-50/30">
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                  </div>
                  <div>
                    <p className="text-sm md:text-base font-medium">Generating your sketch...</p>
                    <p className="text-xs mt-1 md:text-sm text-gray-500 max-w-xs">
                      Our AI is creating your artistic sketch with the selected style
                    </p>
                  </div>
                </div>
              </div>
            ) : generatedImage ? (
              <div className="space-y-4">
                <ImageComparison
                  originalImage={uploadedImage}
                  stylizedImage={generatedImage}
                  originalAlt="Original uploaded image"
                  stylizedAlt={`Generated ${styles.find(s => s.id === selectedStyle)?.name} sketch`}
                  className="w-full aspect-[4/3] rounded-2xl overflow-hidden"
                />
                <div className="flex items-center justify-end gap-2">
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border-2 border-dashed border-gray-300/25 bg-gray-50/30">
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="rounded-full bg-gray-100 p-4">
                    <Sparkles className="h-12 w-12 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm md:text-base font-medium">Ready to Generate</p>
                    <p className="text-xs mt-1 md:text-sm text-gray-500 max-w-xs">
                      Your image is uploaded and style is selected. Click generate to create your artistic sketch
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
