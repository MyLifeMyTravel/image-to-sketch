import Link from "next/link"
import { Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="h-6 w-6 text-gray-700" />
            <span className="text-lg font-semibold text-gray-900">Image to Sketch</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#styles" className="text-sm text-gray-600 hover:text-gray-900">
              Styles
            </Link>
            <Link href="#use-cases" className="text-sm text-gray-600 hover:text-gray-900">
              Use Cases
            </Link>
            <Link href="#pricing" className="text-sm text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link href="#faq" className="text-sm text-gray-600 hover:text-gray-900">
              FAQ
            </Link>
            <Link href="#blog" className="text-sm text-gray-600 hover:text-gray-900">
              Blog
            </Link>
          </nav>

          <Button variant="outline" className="text-sm bg-transparent">
            Log In
          </Button>
        </div>
      </div>
    </header>
  )
}
