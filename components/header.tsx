"use client"

import { useState } from "react"
import { Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { LoginModal } from "@/components/auth/login-modal"
import { UserInfo } from "@/components/auth/user-info"

export function Header() {
  const { user, loading } = useAuth()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 64 // 16 * 4 = 64px (h-16)
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    scrollToSection(sectionId)
  }

  const openLoginModal = () => {
    setIsLoginModalOpen(true)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="h-6 w-6 text-gray-700" />
              <span className="text-lg font-semibold text-gray-900">Image to Sketch</span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#styles"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                onClick={(e) => handleNavClick(e, 'styles')}
              >
                Styles
              </a>
              <a
                href="#use-cases"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                onClick={(e) => handleNavClick(e, 'use-cases')}
              >
                Use Cases
              </a>
              <a
                href="#pricing"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                onClick={(e) => handleNavClick(e, 'pricing')}
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                onClick={(e) => handleNavClick(e, 'faq')}
              >
                FAQ
              </a>
            </nav>

            <div className="flex items-center">
              {loading ? (
                <Button variant="outline" className="text-sm bg-transparent hover:bg-gray-50" disabled>
                  Loading...
                </Button>
              ) : user ? (
                <UserInfo />
              ) : (
                <Button
                  variant="outline"
                  className="text-sm bg-transparent hover:bg-gray-50"
                  onClick={openLoginModal}
                >
                  Log In
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        redirectUrl="/"
      />
    </>
  )
}
