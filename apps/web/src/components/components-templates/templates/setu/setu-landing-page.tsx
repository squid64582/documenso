import React from "react"
import Image from "next/image"
import { Button } from "@documenso/ui/primitives/button"
import { Card, CardContent } from "@documenso/ui/primitives/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@documenso/ui/primitives/tabs"
import { CheckCircle, Star, ChevronRight, ArrowRight } from "lucide-react"

export default function SetuLandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-r from-[#f8f0eb] to-[#fdf6f2]">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-widest text-orange-500 font-semibold">
                  SETU NUTRACEUTICALS PRESENTS
                </p>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Reveal Your Skin&apos;s Inner Glow.
                </h1>
                <p className="text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our Radiant Skin Complex, featuring Marine Collagen, Hyaluronic Acid, and Vitamin C, works from within
                  to give you glowing, youthful skin.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-6">
                  Shop Now
                </Button>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600">4.8/5 based on 2,000+ reviews</span>
              </div>
            </div>
            <div className="flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <Image
                  src="/setu-1.png?height=500&width=500"
                  alt="Setu Skin Products"
                  width={500}
                  height={500}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-8 border-t border-b border-gray-200">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              { icon: "🌿", text: "100% Natural" },
              { icon: "🧪", text: "Clinically Tested" },
              { icon: "🔬", text: "Science-Backed" },
              { icon: "🌱", text: "Vegan Friendly" },
              { icon: "🐰", text: "Cruelty Free" },
              { icon: "✨", text: "No Additives" },
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center p-2">
                <span className="text-2xl mb-1">{feature.icon}</span>
                <span className="text-xs font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="w-full py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Setu Skin Products"
                  width={500}
                  height={500}
                  className="object-contain"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Marine Collagen",
                    description:
                      "Premium marine collagen peptides that are easily absorbed to support skin elasticity and reduce fine lines.",
                  },
                  {
                    title: "Hyaluronic Acid",
                    description:
                      "Helps retain moisture in the skin, reducing dryness and creating a plumping effect for smoother skin.",
                  },
                  {
                    title: "Vitamin C",
                    description:
                      "A powerful antioxidant that brightens skin tone, reduces hyperpigmentation, and boosts collagen production.",
                  },
                  {
                    title: "Biotin",
                    description:
                      "Supports healthy skin, hair, and nails by improving keratin infrastructure, the protein that forms these tissues.",
                  },
                  {
                    title: "Zinc",
                    description:
                      "Helps regulate oil production, reduce inflammation, and promote wound healing for clearer skin.",
                  },
                  {
                    title: "Vitamin E",
                    description:
                      "Protects skin cells from oxidative damage while supporting healthy skin growth and appearance.",
                  },
                ].map((item, index) => (
                  <Card key={index} className="border rounded-lg overflow-hidden">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-orange-500 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skin Dream Duo Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-r from-[#f8f0eb] to-[#fdf6f2]">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Our Skin Dream Duo</h2>
            <p className="text-gray-600 mt-2">Ingredients that work together for maximum results</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <ul className="space-y-3">
                {[
                  "Clinically proven to improve skin elasticity by 40%",
                  "Reduces fine lines and wrinkles in 8 weeks",
                  "Increases skin hydration by 30%",
                  "Enhances skin radiance and even tone",
                  "Supports collagen production naturally",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-6 mt-4">
                Shop Now
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Skin Dream Duo Products"
                  width={500}
                  height={500}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="w-full py-8 border-t border-b border-gray-200">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex flex-col items-center text-center p-2">
                <div className="flex mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                  ))}
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 mb-2 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=32&width=32"
                    alt="User"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <p className="text-xs text-gray-600 line-clamp-3">
                  "I've been using the Skin Dream Duo for 3 months and my skin has never looked better. The glow is
                  real!"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Route Map Section */}
      <section className="w-full py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">The Route Map To</h2>
            <p className="text-2xl font-semibold">Radiant & Youthful Skin</p>
          </div>

          <Tabs defaultValue="daily" className="w-full max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger
                value="daily"
                className="rounded-full bg-orange-100 data-[state=active]:bg-orange-500 data-[state=active]:text-white py-2"
              >
                DAILY WELLNESS BENEFITS
              </TabsTrigger>
              <TabsTrigger
                value="long"
                className="rounded-full bg-orange-100 data-[state=active]:bg-orange-500 data-[state=active]:text-white py-2"
              >
                LONG TERM BENEFITS
              </TabsTrigger>
            </TabsList>
            <TabsContent value="daily" className="mt-0">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-orange-500 font-semibold">Hydration & Plumpness</h3>
                    <ul className="text-sm text-gray-600 mt-1 space-y-1">
                      <li>• Immediate skin hydration</li>
                      <li>• Reduced dryness</li>
                      <li>• Plumper appearance</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-orange-500 font-semibold">Radiance & Glow</h3>
                    <ul className="text-sm text-gray-600 mt-1 space-y-1">
                      <li>• Enhanced skin brightness</li>
                      <li>• Reduced dullness</li>
                      <li>• Healthy-looking complexion</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-orange-500 font-semibold">Skin Texture</h3>
                    <ul className="text-sm text-gray-600 mt-1 space-y-1">
                      <li>• Smoother skin feel</li>
                      <li>• Refined pore appearance</li>
                      <li>• Even skin surface</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-orange-500 font-semibold">Protection</h3>
                    <ul className="text-sm text-gray-600 mt-1 space-y-1">
                      <li>• Antioxidant defense</li>
                      <li>• Environmental protection</li>
                      <li>• Reduced oxidative stress</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="long" className="mt-0">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-orange-500 font-semibold">Collagen Production</h3>
                    <ul className="text-sm text-gray-600 mt-1 space-y-1">
                      <li>• Increased skin firmness</li>
                      <li>• Improved elasticity</li>
                      <li>• Structural support</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-orange-500 font-semibold">Fine Lines & Wrinkles</h3>
                    <ul className="text-sm text-gray-600 mt-1 space-y-1">
                      <li>• Reduced appearance of lines</li>
                      <li>• Smoother skin surface</li>
                      <li>• Prevention of new wrinkles</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-orange-500 font-semibold">Skin Tone</h3>
                    <ul className="text-sm text-gray-600 mt-1 space-y-1">
                      <li>• Even complexion</li>
                      <li>• Reduced dark spots</li>
                      <li>• Brightened skin tone</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-orange-500 font-semibold">Skin Health</h3>
                    <ul className="text-sm text-gray-600 mt-1 space-y-1">
                      <li>• Strengthened skin barrier</li>
                      <li>• Improved cellular function</li>
                      <li>• Long-term skin resilience</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Progress Section */}
      <section className="w-full py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">
              Your Progress, <span className="text-orange-500">In A Nutshell.</span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <span className="text-orange-500 font-bold">Day 1-15</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                As your body begins to absorb the nutrients, you'll notice initial improvements in skin hydration and a
                subtle glow beginning to appear.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <span className="text-orange-500 font-bold">Month 1</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Collagen production increases, leading to improved skin texture, reduced fine lines, and a more even
                skin tone with noticeable radiance.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <span className="text-orange-500 font-bold">Month 2-3</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                By now, you'll see significant improvements in skin elasticity, firmness, and a dramatic reduction in
                fine lines and wrinkles for a youthful appearance.
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-6">Get Started</Button>
          </div>
        </div>
      </section>

      {/* Clinical Results Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-r from-[#f8f0eb] to-[#fdf6f2]">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Clinical Tests based on</h2>
            <p className="text-2xl font-semibold text-orange-500">5000+ Customers</p>
          </div>

          <div className="grid grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-orange-500">92%</span>
                </div>
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="10"
                    strokeDasharray="283"
                    strokeDashoffset="23"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
              <p className="mt-4 text-center text-sm">Reported Improved Skin Elasticity & Firmness</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-orange-500">87%</span>
                </div>
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="10"
                    strokeDasharray="283"
                    strokeDashoffset="37"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
              <p className="mt-4 text-center text-sm">Noticed Reduction in Fine Lines & Wrinkles</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-orange-500">Skin Hydration</p>
              <p className="text-sm text-gray-600">30% increase in 4 weeks</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-orange-500">Skin Radiance</p>
              <p className="text-sm text-gray-600">78% reported brighter skin</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-orange-500">Collagen Density</p>
              <p className="text-sm text-gray-600">43% improvement in 8 weeks</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-orange-500">Overall Satisfaction</p>
              <p className="text-sm text-gray-600">94% would recommend</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">50,000+</h2>
            <p className="text-2xl font-semibold text-orange-500">Happy Customers</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    "I've tried many collagen supplements before, but Setu's Skin Dream Duo has given me the best
                    results by far. My skin feels firmer, more hydrated, and has a natural glow that I haven't seen in
                    years!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="Customer"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Sarah J.</p>
                      <p className="text-xs text-gray-500">Verified Buyer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-r from-[#f8f0eb] to-[#fdf6f2]">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Get 40% OFF</h2>
            <p className="text-xl font-semibold text-orange-500">Our Skin Dream Duo</p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="flex space-x-4">
              {["1", "2", "3"].map((num, index) => (
                <div
                  key={index}
                  className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold"
                >
                  {num}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center max-w-4xl mx-auto">
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Skin Dream Duo Products"
                  width={400}
                  height={400}
                  className="object-contain"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-orange-500 mb-2">Radiant Skin Complex + Marine Collagen</h3>
                <div className="flex items-center mb-2">
                  <span className="text-sm line-through text-gray-500 mr-2">$99.99</span>
                  <span className="text-lg font-bold text-orange-500">$59.99</span>
                  <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">SAVE 40%</span>
                </div>
                <ul className="space-y-2 mb-4">
                  {[
                    "2-month supply (60 servings)",
                    "Free shipping on all orders",
                    "30-day money-back guarantee",
                    "Clinically proven results",
                    "Thousands of happy customers",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-6">
                  Buy Now
                </Button>
              </div>
              <div className="flex justify-center space-x-4">
                {["visa", "mastercard", "amex", "paypal", "apple-pay"].map((payment, index) => (
                  <div key={index} className="w-8 h-8 bg-gray-200 rounded-md"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="w-full py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-orange-500">Potent, Pure & Natural</h2>
            <p className="text-xl font-semibold">Ingredients</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {[
              {
                icon: "🌊",
                title: "Marine Collagen Peptides",
                description:
                  "Sourced from wild-caught fish, our marine collagen is highly bioavailable and easily absorbed by the body to support skin structure.",
              },
              {
                icon: "💧",
                title: "Hyaluronic Acid",
                description:
                  "A powerful humectant that can hold up to 1000x its weight in water, our HA helps maintain optimal skin hydration from within.",
              },
              {
                icon: "🍊",
                title: "Vitamin C",
                description:
                  "Essential for collagen synthesis, our stabilized vitamin C helps brighten skin tone and provides antioxidant protection against free radicals.",
              },
            ].map((item, index) => (
              <Card key={index} className="overflow-hidden border-orange-200">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <span className="text-4xl">{item.icon}</span>
                  </div>
                  <h3 className="font-semibold text-orange-500 text-center mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 text-center">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Science Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-r from-[#f8f0eb] to-[#fdf6f2]">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">The Science</h2>
            <p className="text-xl font-semibold">Behind The Magic</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 items-center max-w-4xl mx-auto">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Skin Diagram"
                width={400}
                height={400}
                className="object-contain"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-orange-500 mb-2">
                  Collagen is your skin's primary structural protein
                </h3>
                <p className="text-sm text-gray-600">
                  Collagen makes up 75-80% of your skin and provides the structural framework that keeps it firm and
                  youthful. After age 25, collagen production decreases by about 1% each year, leading to visible signs
                  of aging.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-orange-500 mb-2">Our formula works at the cellular level</h3>
                <p className="text-sm text-gray-600">
                  Marine collagen peptides are absorbed into the bloodstream and distributed to the dermis, where they
                  stimulate fibroblasts to produce more collagen, elastin, and hyaluronic acid naturally.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-orange-500 mb-2">Clinically proven results</h3>
                <p className="text-sm text-gray-600">
                  Multiple clinical studies have shown that daily supplementation with marine collagen peptides can
                  significantly improve skin elasticity, hydration, and reduce the appearance of fine lines and wrinkles
                  in 8-12 weeks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "How soon will I see results?",
                answer:
                  "Most customers report seeing initial improvements in skin hydration and radiance within 2-4 weeks. More significant results for skin elasticity and reduction in fine lines typically become noticeable after 8-12 weeks of consistent use.",
              },
              {
                question: "How do I take the Skin Dream Duo?",
                answer:
                  "For best results, take one scoop of the Marine Collagen powder mixed in water or your favorite beverage, and one Radiant Skin Complex capsule daily. We recommend taking them in the morning with breakfast.",
              },
              {
                question: "Is this product suitable for vegetarians?",
                answer:
                  "The Marine Collagen is sourced from fish, so it's not suitable for vegetarians. However, our Radiant Skin Complex is vegetarian-friendly. We're currently developing a plant-based collagen alternative.",
              },
              {
                question: "Are there any side effects?",
                answer:
                  "Our products are made with natural ingredients and are generally well-tolerated. Some people may experience mild digestive discomfort when first starting collagen supplements, which typically resolves within a few days.",
              },
              {
                question: "Can I take this if I'm pregnant or breastfeeding?",
                answer:
                  "While our ingredients are natural, we recommend consulting with your healthcare provider before taking any supplements during pregnancy or while breastfeeding.",
              },
            ].map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center cursor-pointer">
                  <h3 className="font-medium">{item.question}</h3>
                  <ChevronRight className="h-5 w-5 text-orange-500" />
                </div>
                <div className="mt-2 text-sm text-gray-600">{item.answer}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-6">Shop Now</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Setu</h3>
              <p className="text-sm text-gray-600 mb-4">
                Scientifically formulated supplements for radiant skin and overall wellness.
              </p>
              <div className="flex space-x-4">
                {["facebook", "instagram", "twitter", "youtube"].map((social, index) => (
                  <a key={index} href="#" className="text-gray-500 hover:text-orange-500">
                    <span className="sr-only">{social}</span>
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Shop</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {["Skin Care", "Hair Care", "Immunity", "Digestion", "Sleep", "All Products"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="hover:text-orange-500">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {["About Us", "Our Science", "Blog", "Reviews", "Contact Us", "FAQs"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="hover:text-orange-500">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
              <p className="text-sm text-gray-600 mb-4">Join our newsletter for exclusive offers and skin care tips.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-r-lg rounded-l-none">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>© {new Date().getFullYear()} Setu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

