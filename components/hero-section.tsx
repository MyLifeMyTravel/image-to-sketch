import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6 text-balance">
            Transform Photos into Beautiful Sketches with AI
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Turn any image into stunning sketch art in seconds. Create professional pencil drawings, charcoal sketches,
            cartoon styles, and coloring book pages. Perfect for artists, educators, social media creators, and creative
            enthusiasts.
          </p>
          <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8">
            Start Creating Free
          </Button>
        </div>

        <div className="relative">
          <div className="bg-gray-50 rounded-2xl p-8">
            <img
              src="/cat-sketch-transformation-showing-original-photo-a.jpg"
              alt="Cat sketch transformation"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
