export interface PricingPlan {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  currency: string
  billingPeriod: 'monthly' | 'yearly' | 'lifetime'
  credits: number
  features: {
    name: string
    included: boolean
    description?: string
  }[]
  popular?: boolean
  cta: string
  badge?: string
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for trying out our sketch converter',
    price: 0,
    currency: 'USD',
    billingPeriod: 'monthly',
    credits: 10,
    features: [
      {
        name: 'Sketch Generations',
        included: true,
        description: '5 sketches per month'
      },
      {
        name: 'Basic Quality',
        included: true,
        description: 'Standard resolution output'
      },
      {
        name: 'All Styles',
        included: true,
        description: 'Access to all sketch styles'
      },
      {
        name: 'No Watermark',
        included: false
      },
      {
        name: 'Priority Processing',
        included: false
      },
      {
        name: 'Commercial License',
        included: false
      },
      {
        name: 'Priority Support',
        included: false
      }
    ],
    cta: 'Get Started'
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Best for regular users and content creators',
    price: 9.99,
    originalPrice: 14.99,
    currency: 'USD',
    billingPeriod: 'monthly',
    credits: 150,
    popular: true,
    badge: 'Most Popular',
    features: [
      {
        name: 'Sketch Generations',
        included: true,
        description: '75 sketches per month'
      },
      {
        name: 'HD Quality',
        included: true,
        description: 'High resolution output'
      },
      {
        name: 'All Styles',
        included: true,
        description: 'Access to all sketch styles'
      },
      {
        name: 'No Watermark',
        included: true,
        description: 'Clean, professional results'
      },
      {
        name: 'Priority Processing',
        included: true,
        description: '2x faster generation'
      },
      {
        name: 'Commercial License',
        included: true,
        description: 'Use for commercial projects'
      },
      {
        name: 'Email Support',
        included: true,
        description: '24-hour response time'
      }
    ],
    cta: 'Start Free Trial'
  },
  {
    id: 'max',
    name: 'Max',
    description: 'Perfect for professionals and heavy users',
    price: 19.99,
    originalPrice: 29.99,
    currency: 'USD',
    billingPeriod: 'monthly',
    credits: 500,
    badge: 'Best Value',
    features: [
      {
        name: 'Sketch Generations',
        included: true,
        description: '250 sketches per month'
      },
      {
        name: 'Ultra HD Quality',
        included: true,
        description: 'Maximum resolution output'
      },
      {
        name: 'All Styles',
        included: true,
        description: 'Access to all sketch styles'
      },
      {
        name: 'No Watermark',
        included: true,
        description: 'Clean, professional results'
      },
      {
        name: 'Priority Processing',
        included: true,
        description: '4x faster generation'
      },
      {
        name: 'Commercial License',
        included: true,
        description: 'Unlimited commercial use'
      },
      {
        name: 'Priority Support',
        included: true,
        description: 'Priority email & chat support'
      },
      {
        name: 'API Access',
        included: true,
        description: 'Integrate with your apps'
      },
      {
        name: 'Custom Styles',
        included: true,
        description: 'Create custom sketch styles'
      }
    ],
    cta: 'Start Free Trial'
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    description: 'One-time payment for unlimited access',
    price: 299,
    originalPrice: 499,
    currency: 'USD',
    billingPeriod: 'lifetime',
    credits: -1, // unlimited
    badge: 'Limited Offer',
    features: [
      {
        name: 'Unlimited Sketches',
        included: true,
        description: 'Generate unlimited sketches'
      },
      {
        name: 'Ultra HD Quality',
        included: true,
        description: 'Maximum resolution output'
      },
      {
        name: 'All Styles',
        included: true,
        description: 'Access to all sketch styles'
      },
      {
        name: 'No Watermark',
        included: true,
        description: 'Clean, professional results'
      },
      {
        name: 'Priority Processing',
        included: true,
        description: 'Fastest generation speed'
      },
      {
        name: 'Commercial License',
        included: true,
        description: 'Unlimited commercial use'
      },
      {
        name: 'Priority Support',
        included: true,
        description: 'Lifetime priority support'
      },
      {
        name: 'API Access',
        included: true,
        description: 'Full API access'
      },
      {
        name: 'Custom Styles',
        included: true,
        description: 'Create custom sketch styles'
      },
      {
        name: 'Future Features',
        included: true,
        description: 'Access to all future features'
      }
    ],
    cta: 'Get Lifetime Access'
  }
]

export interface FAQItem {
  question: string
  answer: string
  category?: string
}

export const pricingFAQ: FAQItem[] = [
  {
    question: "What image formats do you support?",
    answer: "We support JPG, PNG, and WEBP formats. Images must be under 10MB for optimal processing. All common photo formats work perfectly with our sketch converter.",
    category: "general"
  },
  {
    question: "What's the difference between free and premium sketches?",
    answer: "Free sketches include a small watermark and standard quality. Premium users (Pro and Max plans) enjoy HD quality output without watermarks, faster processing speeds, and priority support.",
    category: "features"
  },
  {
    question: "How long does it take to generate a sketch?",
    answer: "Free users can expect generation to take around 60 seconds. Pro and Max plan users enjoy significantly faster processing at 20-30 seconds with priority queue access for faster turnaround.",
    category: "features"
  },
  {
    question: "Can I use the sketches commercially?",
    answer: "Yes! All sketches created with our service can be used for both personal and commercial purposes. Premium users receive full commercial usage rights without attribution requirements.",
    category: "licensing"
  },
  {
    question: "How do credits work?",
    answer: "Each sketch generation costs 2 credits. Starter plan includes 10 credits monthly (5 sketches), Pro plan includes 150 credits monthly (75 sketches), and Max plan includes 500 credits monthly (250 sketches). Unused credits expire at the end of each billing cycle and do not roll over.",
    category: "billing"
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time from your billing settings. You'll retain access to premium features until the end of your current billing period.",
    category: "billing"
  },
  {
    question: "What is your refund policy?",
    answer: "We offer a 14-day money-back guarantee for first-time subscription purchases. Refunds are available if you've used less than 80% of your credits and your account is in good standing. Each customer is eligible for one refund only.",
    category: "billing"
  },
  {
    question: "Is my data and uploaded images secure?",
    answer: "Absolutely. We use industry-standard encryption to protect your data. Uploaded images are processed securely and automatically deleted from our servers after 24 hours. We never share your images with third parties.",
    category: "security"
  }
]

export const billingPeriods = [
  { value: 'monthly', label: 'Monthly billing', discount: 0 },
  { value: 'yearly', label: 'Yearly billing', discount: 20 },
] as const