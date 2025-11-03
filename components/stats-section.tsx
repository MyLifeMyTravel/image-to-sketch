export function StatsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Creators Worldwide</h2>
          <p className="text-xl text-gray-900 font-semibold mb-2">Our Impact</p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of users transforming their photos into beautiful sketches with AI-powered precision
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">1,000+</div>
            <div className="text-lg text-gray-700 font-medium">Sketches Generated</div>
          </div>

          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">6</div>
            <div className="text-lg text-gray-700 font-medium">Unique Sketch Styles</div>
          </div>

          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">200+</div>
            <div className="text-lg text-gray-700 font-medium">Happy Users</div>
          </div>
        </div>
      </div>
    </section>
  )
}
