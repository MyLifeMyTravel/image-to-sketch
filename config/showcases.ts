export interface ShowcaseConfig {
  name: string        //样例名称
  description: string //样例描述
  originalImage: string //原始图片路径
  stylizedImage: string //风格化图片路径
}

export const showcases: ShowcaseConfig[] = [
  {
    name: "Realistic Sketch",
    description: "Transform portraits and photos into realistic pencil drawings with authentic shading and texture.",
    originalImage: "/cat-sketch-transformation-showing-original-photo-a.jpg",
    stylizedImage: "/realistic-pencil-sketch-of-cat.jpg"
  },
  {
    name: "Line Art",
    description: "Create clean, minimalist line drawings perfect for coloring books and modern art.",
    originalImage: "/cat-sketch-transformation-showing-original-photo-a.jpg",
    stylizedImage: "/simple-line-art-sketch-of-cat.jpg"
  },
  {
    name: "Portrait Sketch",
    description: "Professional portrait sketches with enhanced details and artistic expression.",
    originalImage: "/cat-sketch-transformation-showing-original-photo-a.jpg",
    stylizedImage: "/portrait-sketch-style.jpg"
  },
  {
    name: "Cartoon Style",
    description: "Turn photos into playful cartoon-style sketches with simplified features and fun artistic flair.",
    originalImage: "/cat-sketch-transformation-showing-original-photo-a.jpg",
    stylizedImage: "/cartoon-sketch-style-of-cat.jpg"
  },
  {
    name: "Architectural",
    description: "Convert building photos into clean architectural line drawings perfect for design presentations.",
    originalImage: "/cat-sketch-transformation-showing-original-photo-a.jpg",
    stylizedImage: "/architectural-sketch-lines.jpg"
  },
  {
    name: "Gesture Drawing",
    description: "Create dynamic gesture drawings that capture movement and flow with artistic expression.",
    originalImage: "/cat-sketch-transformation-showing-original-photo-a.jpg",
    stylizedImage: "/gesture-drawing-sketch.jpg"
  }
]