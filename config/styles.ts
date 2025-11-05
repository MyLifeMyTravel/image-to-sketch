export interface StyleConfig {
  id: number
  name: string
  preview: string
  prompt: string
}

export const styles: StyleConfig[] = [
  {
    id: 1,
    name: "Realistic Sketch",
    preview: "/realistic-pencil-sketch-of-cat.jpg",
    prompt: "Convert this image to a realistic pencil sketch with authentic shading, texture, and fine details. Make it look like a professional pencil drawing."
  },
  {
    id: 2,
    name: "Line Art",
    preview: "/simple-line-art-sketch-of-cat.jpg",
    prompt: "Transform this image into clean, minimalist line art with smooth contours and no shading. Create a simple black and white outline drawing."
  },
  {
    id: 3,
    name: "Portrait",
    preview: "/portrait-sketch-style.jpg",
    prompt: "Create a professional portrait sketch with enhanced details and artistic expression. Focus on facial features and capture the essence with careful shading."
  },
  {
    id: 4,
    name: "Cartoon",
    preview: "/cartoon-sketch-style-of-cat.jpg",
    prompt: "Convert this image into a playful cartoon-style sketch with simplified features and fun artistic flair. Use bold lines and exaggerated, friendly expressions."
  },
  {
    id: 5,
    name: "Architectural",
    preview: "/architectural-sketch-lines.jpg",
    prompt: "Transform this image into clean architectural line drawings with precise geometric shapes and technical drawing style. Focus on structure and form."
  },
  {
    id: 6,
    name: "Gesture",
    preview: "/gesture-drawing-sketch.jpg",
    prompt: "Create dynamic gesture drawings that capture movement and flow with expressive, fluid lines. Emphasize energy and motion over precise details."
  },
  {
    id: 7,
    name: "Coloring Book",
    preview: "/simple-line-art-sketch-of-cat.jpg",
    prompt: "Convert this image into a coloring book style with thick, clean outlines and no shading. Make it suitable for coloring with clear defined spaces."
  },
  {
    id: 8,
    name: "Charcoal",
    preview: "/cartoon-sketch-style-of-cat.jpg",
    prompt: "Transform this image into a charcoal drawing with rich dark tones, smudges, and dramatic contrast. Create expressive, moody artwork."
  },
  {
    id: 9,
    name: "Ink Style",
    preview: "/gesture-drawing-sketch.jpg",
    prompt: "Convert this image to an ink drawing style with bold black lines, cross-hatching, and ink wash techniques. Create a striking monochrome artwork."
  },
  {
    id: 10,
    name: "Watercolor",
    preview: "/realistic-pencil-sketch-of-cat.jpg",
    prompt: "Transform this image into a watercolor sketch with soft edges, bleeding colors, and transparent washes. Create an artistic, flowing watercolor painting."
  },
  {
    id: 11,
    name: "Abstract",
    preview: "/portrait-sketch-style.jpg",
    prompt: "Convert this image into an abstract sketch interpretation with exaggerated shapes, expressive lines, and artistic distortion. Focus on artistic expression over realism."
  },
  {
    id: 12,
    name: "Minimalist",
    preview: "/architectural-sketch-lines.jpg",
    prompt: "Transform this image into a minimalist sketch using the simplest possible lines and forms. Remove unnecessary details and focus only on essential elements."
  },
  {
    id: 13,
    name: "Minimalist",
    preview: "/architectural-sketch-lines.jpg",
    prompt: "Convert to a pencil sketch style with visible graphite texture and cross-hatching, while keeping the background layout unchanged."
  }
]