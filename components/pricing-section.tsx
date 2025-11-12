"use client"

import { useState } from "react"
import { Check, X, Star, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { pricingPlans, pricingFAQ } from "@/config/pricing"
import { useAuth } from "@/hooks/use-auth"

export function PricingSection() {
  const { user } = useAuth()
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handlePlanSelect = async (planId: string) => {
    if (!user) {
      // Redirect to login if user is not authenticated
      window.location.href = `/api/auth/google?redirectUrl=${encodeURIComponent(window.location.pathname)}`
      return
    }

    setSelectedPlan(planId)
    const plan = pricingPlans.find(p => p.id === planId)

    if (plan?.price === 0) {
      // Handle free plan signup
      alert('Free plan activated! You can now start creating sketches.')
      return
    }

    try {
      // Call payment API
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId,
          userId: user.id
        })
      })

      const data = await response.json()

      if (data.success) {
        // Redirect to Creem checkout or payment page
        if (data.paymentUrl) {
          window.location.href = data.paymentUrl
        } else if (data.clientSecret) {
          // Handle Stripe-like checkout if needed
          alert('Payment setup successful! You will be redirected to complete your purchase.')
        }
      } else {
        alert(`Payment setup failed: ${data.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Payment setup error:', error)
      alert('Payment setup failed. Please try again.')
    } finally {
      setSelectedPlan(null)
    }
  }

  const getAdjustedPrice = (plan: any) => {
    if (plan.billingPeriod === 'lifetime') return plan
    if (billingPeriod === 'yearly' && plan.billingPeriod === 'monthly') {
      return {
        ...plan,
        price: Math.round(plan.price * 12 * 0.8), // 20% discount for yearly
        originalPrice: plan.price * 12,
        billingPeriod: 'yearly' as const
      }
    }
    return plan
  }

  const filteredPlans = pricingPlans.filter(plan =>
    billingPeriod === 'monthly' ? plan.billingPeriod !== 'lifetime' : true
  )

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-3 h-3 mr-1" />
            Simple, Transparent Pricing
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Transform your photos into stunning sketches with our AI-powered converter.
            Start free, upgrade when you need more.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm font-medium ${billingPeriod === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <Switch
              checked={billingPeriod === 'yearly'}
              onCheckedChange={(checked) => setBillingPeriod(checked ? 'yearly' : 'monthly')}
            />
            <span className={`text-sm font-medium ${billingPeriod === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly
            </span>
            <Badge variant="destructive" className="ml-2">
              Save 20%
            </Badge>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {filteredPlans.map((plan) => {
            const adjustedPlan = getAdjustedPrice(plan)
            const isPopular = adjustedPlan.popular

            return (
              <Card
                key={plan.id}
                className={`relative ${isPopular ? 'border-blue-500 shadow-xl scale-105' : 'border-gray-200'}
                  ${selectedPlan === plan.id ? 'ring-2 ring-blue-500' : ''}
                  transition-all duration-200 hover:shadow-lg`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 hover:bg-blue-600">
                      <Star className="w-3 h-3 mr-1" />
                      {adjustedPlan.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold">{adjustedPlan.name}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {adjustedPlan.description}
                  </CardDescription>

                  <div className="mt-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold">${adjustedPlan.price}</span>
                      {adjustedPlan.billingPeriod !== 'lifetime' && (
                        <span className="text-gray-500 ml-2">/{adjustedPlan.billingPeriod}</span>
                      )}
                    </div>
                    {adjustedPlan.originalPrice && (
                      <div className="text-sm text-gray-500 line-through mt-1">
                        ${adjustedPlan.originalPrice}
                        {adjustedPlan.billingPeriod !== 'lifetime' && `/${adjustedPlan.billingPeriod}`}
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Credits Info */}
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-700">
                      {adjustedPlan.credits === -1 ? 'Unlimited' : adjustedPlan.credits} credits
                    </div>
                    <div className="text-xs text-gray-500">
                      {adjustedPlan.credits === -1
                        ? 'Unlimited sketches'
                        : `${Math.floor(adjustedPlan.credits / 2)} sketches per month`}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {adjustedPlan.features.slice(0, 5).map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <div className={`text-sm font-medium ${feature.included ? 'text-gray-900' : 'text-gray-400'}`}>
                            {feature.name}
                          </div>
                          {feature.description && (
                            <div className={`text-xs ${feature.included ? 'text-gray-600' : 'text-gray-400'}`}>
                              {feature.description}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {adjustedPlan.features.length > 5 && (
                      <div className="text-sm text-gray-500 text-center pt-2">
                        +{adjustedPlan.features.length - 5} more features
                      </div>
                    )}
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    className={`w-full ${isPopular ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
                    variant={isPopular ? 'default' : 'outline'}
                    onClick={() => handlePlanSelect(plan.id)}
                    disabled={selectedPlan === plan.id}
                  >
                    {selectedPlan === plan.id ? 'Processing...' : adjustedPlan.cta}
                    {selectedPlan !== plan.id && <ArrowRight className="w-4 h-4 ml-2" />}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-lg text-gray-600">
              Got questions? We've got answers.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {pricingFAQ.slice(0, 4).map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}