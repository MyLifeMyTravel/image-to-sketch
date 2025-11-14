export interface StyleConfig {
  name: string//风格名称
  preview: string//预览图片路径
  prompt: string//AI生成提示词
  description: string//中文风格描述（用途和特点）
  effect: string//详细效果说明（技术特征）
}

export const styles: StyleConfig[] = [
   {
    name: "Pencil Sketch",
    preview: "/realistic-pencil-sketch-of-cat.jpg",
    prompt: "Convert this image into a realistic pencil sketch with natural graphite texture, soft shading, and visible pencil strokes. Maintain original proportions and lighting. Use fine lines, medium contrast, white paper background, and avoid harsh outlines. Black and white only, pure graphite on white paper.",
    description: "高度逼真的铅笔素描风格，强调手绘质感和专业技法，尤其适合需要忠实还原原图光影与结构的场景。",
    effect: "​生成具有自然石墨颗粒、柔和阴影过渡和清晰笔触的素描图像；确保人物或物体不变形、光影准确；通过纤细线条和中对比度营造细腻、专业的素描效果，避免生硬轮廓。"
  },
  {
    name: "Coloring Book",
    preview: "/realistic-pencil-sketch-of-cat.jpg",
    prompt: "Convert this image into a clean coloring book line art outline. Use thick, bold, and solid black lines for the contours, with absolutely no shading, no shadows, no fine details, and no internal textures. Simple, minimalist design, ready for coloring, on a pure white background.",
    description: "高度逼真的铅笔素描风格，强调手绘质感和专业技法，尤其适合需要忠实还原原图光影与结构的场景。",
    effect: "​生成具有自然石墨颗粒、柔和阴影过渡和清晰笔触的素描图像；确保人物或物体不变形、光影准确；通过纤细线条和中对比度营造细腻、专业的素描效果，避免生硬轮廓。"
  },
   {
    name: "Cartoon Sketch",
    preview: "/realistic-pencil-sketch-of-cat.jpg",
    prompt: "Convert this image into a cartoon-style SKETCH with simplified outlines, slightly exaggerated proportions, and soft, clean shading. Maintain clear character features, use consistent black lines, and keep background minimal.",
    description: "高度逼真的铅笔素描风格，强调手绘质感和专业技法，尤其适合需要忠实还原原图光影与结构的场景。",
    effect: "​生成具有自然石墨颗粒、柔和阴影过渡和清晰笔触的素描图像；确保人物或物体不变形、光影准确；通过纤细线条和中对比度营造细腻、专业的素描效果，避免生硬轮廓。"
  },
  {
    name: "Classic Pencil",
    preview: "/realistic-pencil-sketch-of-cat.jpg",
    prompt: "Transform this image into a traditional pencil sketch with fine graphite textures, subtle cross-hatching, and realistic shading. Pay attention to highlights, mid-tones, and shadows to create depth and dimension.",
    description: "传统铅笔素描风格，适合写实肖像和静物",
    effect: "精细的石墨纹理、渐变阴影、立体层次感、专业素描效果"
  },
  {
    name: "Charcoal Drawing",
    preview: "/cartoon-sketch-style-of-cat.jpg",
    prompt: "Convert this image to a dramatic charcoal drawing with rich black tones, smudged edges, and bold contrasts. Use expressive strokes and blending techniques to create moody, atmospheric effects.",
    description: "戏剧性炭笔效果，营造强烈情感氛围",
    effect: "浓郁黑色调、晕染边缘、强烈对比、表现力丰富"
  },
  {
    name: "Ink Pen Art",
    preview: "/gesture-drawing-sketch.jpg",
    prompt: "Create a precise ink pen drawing with clean, confident lines, fine cross-hatching patterns, and stippling techniques. Focus on crisp edges and detailed linework with pure black and white contrast.",
    description: "精确钢笔画风格，适合技术和插画作品",
    effect: "清晰线条、交叉排线、点画技法、纯粹黑白对比"
  },
  {
    name: "Soft Pastel",
    preview: "/portrait-sketch-style.jpg",
    prompt: "Transform this image into a soft pastel sketch with gentle, blended strokes, powdery textures, and subtle color transitions. Use delicate layering and soft edges for a dreamy, artistic effect.",
    description: "柔和粉彩效果，梦幻艺术风格",
    effect: "柔和混合笔触、粉状纹理、渐变色彩、朦胧边缘"
  },
  {
    name: "Architectural Draft",
    preview: "/architectural-sketch-lines.jpg",
    prompt: "Convert this image to a technical architectural draft with precise geometric lines, measured proportions, and clean construction lines. Include subtle grid marks and professional drafting annotations.",
    description: "技术制图风格，专业建筑和工程草图",
    effect: "精确几何线条、比例测量、构造线条、网格标记"
  },
  {
    name: "Watercolor Wash",
    preview: "/realistic-pencil-sketch-of-cat.jpg",
    prompt: "Create a watercolor sketch with transparent washes, soft bleeding edges, and delicate color blending. Use wet-on-wet techniques and leave some white paper showing for highlights.",
    description: "水彩渲染效果，清新自然艺术风格",
    effect: "透明渲染、渗色边缘、色彩混合、留白高光"
  },
  {
    name: "Vintage Etching",
    preview: "/simple-line-art-sketch-of-cat.jpg",
    prompt: "Transform this image into an antique etching style with fine, detailed lines, cross-hatching, and a classical engraving aesthetic. Emulate the texture and character of old printmaking techniques.",
    description: "复古蚀刻版画，古典艺术风格",
    effect: "精细雕刻线条、交叉纹理、古典美学、印刷质感"
  },
  {
    name: "Expressionist Sketch",
    preview: "/portrait-sketch-style.jpg",
    prompt: "Create an expressive, emotive sketch with bold, energetic strokes, exaggerated contrasts, and dynamic movement. Focus on emotional impact over photorealistic accuracy.",
    description: "表现主义速写，强调情感和动态",
    effect: "大胆有力笔触、夸张对比、动感线条、情感冲击"
  },
  {
    name: "Minimalist Line",
    preview: "/simple-line-art-sketch-of-cat.jpg",
    prompt: "Reduce this image to its essential elements using the fewest possible lines. Create a clean, minimalist line drawing that captures the subject with elegant simplicity and negative space.",
    description: "极简主义线条，现代设计风格",
    effect: "最少化线条、优雅简洁、负空间运用、核心元素"
  },
  {
    name: "Colored Pencil",
    preview: "/realistic-pencil-sketch-of-cat.jpg",
    prompt: "Transform this image into a colored pencil drawing with layered strokes, texture marks, and subtle color blending. Use a limited color palette with visible pencil marks and artistic shading.",
    description: "彩色铅笔画，温和彩色艺术效果",
    effect: "层次笔触、纹理标记、色彩混合、有限色调"
  }
]