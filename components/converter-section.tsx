"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Upload, Sparkles, ImageIcon, Download, Share2, ChevronLeft, ChevronRight, Palette, Edit3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ImageComparison } from "@/components/image-comparison"
import { GoogleGenAI } from "@google/genai"
import { styles } from "@/config/styles"

export function ConverterSection() {
  const [selectedStyle, setSelectedStyle] = useState("Classic Pencil")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [isCustomPrompt, setIsCustomPrompt] = useState(false)
  const [customPrompt, setCustomPrompt] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // 设置textarea固定高度以保持与风格选择区域一致
  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current
    if (textarea) {
      // 固定高度为184px，与风格选择网格高度保持一致
      textarea.style.height = '184px'
    }
  }, [])

  // 处理自定义提示词输入
  const handleCustomPromptChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomPrompt(e.target.value)
    adjustTextareaHeight()
  }, [adjustTextareaHeight])

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

  // 下载生成的图片
  const downloadImage = useCallback(() => {
    if (!generatedImage) return

    try {
      // 创建一个临时的链接元素来触发下载
      const link = document.createElement('a')
      link.href = generatedImage

      // 从 base64 数据中提取文件类型
      const mimeType = generatedImage.split(':')[1].split(';')[0]
      const extension = mimeType.split('/')[1] || 'png'

      // 生成文件名
      const selectedStyleData = styles.find(s => s.name === selectedStyle)
      const styleName = selectedStyleData?.name?.replace(/\s+/g, '_').toLowerCase() || 'sketch'
      const timestamp = new Date().toISOString().slice(0, 10)
      const filename = `${styleName}_${timestamp}.${extension}`

      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error downloading image:', error)
    }
  }, [generatedImage, selectedStyle])

  // Gemini API 调用函数
  const generateImage = useCallback(async () => {
    if (!uploadedImage) return

    setIsGenerating(true)
    try {
      // 初始化 Gemini AI
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "" })

      // 将 base64 图片转换为可用格式
      const base64Data = uploadedImage.split(',')[1] // 移除 data:image/...;base64, 前缀

      // 构建提示词 - 使用自定义提示词或预设风格提示词
      let prompt: string
      if (isCustomPrompt && customPrompt.trim()) {
        prompt = customPrompt.trim()
      } else {
        const selectedStyleData = styles.find(s => s.name === selectedStyle)
        prompt = selectedStyleData?.prompt || "Convert this image into a sketch style drawing."
      }

      // 如果有图片，将图片添加到提示词中
      const contents = base64Data ? [
        {
          text: prompt
        },
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Data
          }
        }
      ] : prompt

      // 调用 API - 按照示例代码的方式
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: contents,
      })

      // 处理响应 - 按照示例代码的方式
      if (response.candidates && response.candidates.length > 0 && response.candidates[0].content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.text) {
            console.log(part.text);
          } else if (part.inlineData) {
            const imageData = part.inlineData.data;
            // 直接使用 base64 数据创建 data URL
            const mimeType = part.inlineData.mimeType || "image/png"
            setGeneratedImage(`data:${mimeType};base64,${imageData}`)
            break
          }
        }
      } else {
        throw new Error("No generated image received")
      }
    } catch (error) {
      console.error("Error generating image:", error)
      // 如果 API 调用失败，使用示例图片作为后备
      const selectedStyleData = styles.find(s => s.name === selectedStyle)
      setGeneratedImage(selectedStyleData?.preview || "/placeholder.svg")
    } finally {
      setIsGenerating(false)
    }
  }, [uploadedImage, selectedStyle, isCustomPrompt, customPrompt])

  // 当切换到自定义模式时调整textarea高度
  useEffect(() => {
    if (isCustomPrompt && textareaRef.current) {
      // 使用setTimeout确保DOM已更新
      setTimeout(() => {
        adjustTextareaHeight()
      }, 0)
    }
  }, [isCustomPrompt, adjustTextareaHeight])

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
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {isCustomPrompt ? "Custom Prompt" : "Choose Style"}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsCustomPrompt(!isCustomPrompt)}
                  className="flex items-center gap-2 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                >
                  {isCustomPrompt ? (
                    <>
                      <Palette className="h-4 w-4" />
                      Choose Style
                    </>
                  ) : (
                    <>
                      <Edit3 className="h-4 w-4" />
                      Custom Prompt
                    </>
                  )}
                </Button>
              </div>

              {/* 条件渲染：风格选择或自定义输入框 */}
              {!isCustomPrompt ? (
                <>
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
                      key={style.name}
                      onClick={() => setSelectedStyle(style.name)}
                      className={`group relative aspect-[4/3] overflow-hidden rounded-xl border-2 transition-all ${
                        selectedStyle === style.name
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
                      {selectedStyle === style.name && (
                        <div className="absolute right-2 top-2 flex size-4 items-center justify-center rounded-full bg-blue-500 shadow-lg">
                          <svg className="size-3 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
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
                </>
              ) : (
                /* 自定义提示词输入框 */
                <div className="space-y-3">
                  <Textarea
                    ref={textareaRef}
                    placeholder="Enter your custom prompt, e.g., Convert this image into a watercolor painting with soft brushstrokes and pastel colors..."
                    value={customPrompt}
                    onChange={handleCustomPromptChange}
                    className="min-h-[184px] max-h-[184px] resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 overflow-y-auto"
                    style={{ height: '184px' }}
                    rows={5}
                  />
                  <div className="text-xs text-gray-500">
                    <p>💡 Tip: Describe the artistic effect you want, such as brush types, color styles, textures, etc.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Button
                className="w-full rounded-xl py-6 font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all"
                disabled={!uploadedImage || isGenerating || (isCustomPrompt && !customPrompt.trim())}
                onClick={generateImage}
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
              <div className="flex min-h-[200px] items-center justify-center rounded-2xl border-2 border-dashed border-gray-300/25 bg-gray-50/30">
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
              <div className="flex min-h-[200px] items-center justify-center rounded-2xl border-2 border-dashed border-gray-300/25 bg-gray-50/30">
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
                  stylizedAlt={`Generated ${styles.find(s => s.name === selectedStyle)?.name} sketch`}
                  className="w-full rounded-2xl overflow-hidden"
                />
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg"
                    onClick={downloadImage}
                  >
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
              <div className="flex min-h-[200px] items-center justify-center rounded-2xl border-2 border-dashed border-gray-300/25 bg-gray-50/30">
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
