"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Button } from "@documenso/ui/primitives/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@documenso/ui/primitives/tabs"
import { Star, ChevronRight, ChevronLeft, Heart, Plus, Minus } from "lucide-react"

export default function GlossierLandingPage() {
  const [selectedColor, setSelectedColor] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("details")

  const colors = [
    { name: "Subtle Peach", hex: "#F8C3B0" },
    { name: "Cake", hex: "#E27C7C" },
    { name: "Crush", hex: "#D13B40" },
    { name: "Zip", hex: "#B22E2F" },
    { name: "Jam", hex: "#8E2C3C" },
    { name: "Leo", hex: "#A05E4C" },
    { name: "Malt", hex: "#9C6A5C" },
    { name: "Fuzz", hex: "#C68B7D" },
  ]

  const features = [
    { name: "Easy", value: true },
    { name: "Enhancing", value: true },
    { name: "Vegan", value: true },
    { name: "Buildable", value: true },
    { name: "Cruelty-free", value: true },
    { name: "Fragrance-free", value: true },
  ]

  const ingredients = [
    { name: "Blue Agave Extract", description: "Hydrating and soothing" },
    { name: "Vitamin E", description: "Antioxidant protection" },
    { name: "Wax-Bound Sodium Hyaluronate", description: "Creates a silky-smooth feel" },
  ]

  const howToUse = [
    "Starting at the arch, remove the squeezable from the tube and brush from here in an upward motion.",
    "Enhance: dip back in and apply to the lip.",
  ]

  const relatedProducts = [
    {
      name: "Starface x Glossier Refill",
      price: "$23",
      image: "/placeholder.svg?height=200&width=200",
      description: "16 hydrocolloid pimple patches + Glossier pink case",
    },
    {
      name: "Starface x Glossier Compact",
      price: "$23",
      image: "/placeholder.svg?height=200&width=200",
      description: "16 hydrocolloid pimple patches + Glossier pink case",
    },
    {
      name: "Generation G",
      price: "$19",
      image: "/placeholder.svg?height=200&width=200",
      description: "Sheer matte lipstick",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="w-full py-4 border-b sticky top-0 bg-white z-50">
        <div className="container px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-black">
              <span className="sr-only">Menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>
            <a href="#" className="font-medium text-xl">
              glossier.
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-black">
              <span className="sr-only">Search</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            <button className="text-gray-500 hover:text-black">
              <span className="sr-only">Account</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
            <button className="text-gray-500 hover:text-black relative">
              <span className="sr-only">Cart</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Product Section */}
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-sm">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Generation G lipstick"
                  width={600}
                  height={600}
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                <button className="relative aspect-square overflow-hidden rounded-sm border-2 border-black">
                  <Image
                    src="/placeholder.svg?height=150&width=150"
                    alt="Generation G lipstick thumbnail"
                    width={150}
                    height={150}
                    className="object-cover"
                  />
                </button>
                <button className="relative aspect-square overflow-hidden rounded-sm border border-gray-200 hover:border-gray-300">
                  <Image
                    src="/placeholder.svg?height=150&width=150"
                    alt="Generation G lipstick thumbnail"
                    width={150}
                    height={150}
                    className="object-cover"
                  />
                </button>
                <button className="relative aspect-square overflow-hidden rounded-sm border border-gray-200 hover:border-gray-300">
                  <Image
                    src="/placeholder.svg?height=150&width=150"
                    alt="Generation G lipstick thumbnail"
                    width={150}
                    height={150}
                    className="object-cover"
                  />
                </button>
                <button className="relative aspect-square overflow-hidden rounded-sm border border-gray-200 hover:border-gray-300">
                  <Image
                    src="/placeholder.svg?height=150&width=150"
                    alt="Generation G lipstick thumbnail"
                    width={150}
                    height={150}
                    className="object-cover"
                  />
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-medium">Generation G</h1>
                <div className="flex items-center mt-1">
                  <p className="text-sm text-gray-600">Sheer matte lip tint</p>
                  <div className="flex ml-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current text-black" />
                    ))}
                  </div>
                  <span className="ml-1 text-xs text-gray-500">(1241)</span>
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <p className="text-sm font-medium mb-2">Subtle Peach</p>
                <div className="flex space-x-2">
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      className={`w-6 h-6 rounded-full ${
                        selectedColor === index ? "ring-2 ring-offset-2 ring-black" : ""
                      }`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => setSelectedColor(index)}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Add to Bag */}
              <div className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center border rounded-md">
                    <button
                      className="px-3 py-2 border-r"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2">{quantity}</span>
                    <button
                      className="px-3 py-2 border-l"
                      onClick={() => setQuantity(quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="font-medium">$19</span>
                </div>
                <div className="flex space-x-2">
                  <Button className="flex-1 bg-black hover:bg-gray-800 text-white rounded-sm">Add to bag</Button>
                  <Button variant="outline" size="default" className="rounded-sm">
                    <Heart className="h-5 w-5" />
                    <span className="sr-only">Add to wishlist</span>
                  </Button>
                </div>
              </div>

              {/* Product Description */}
              <div className="pt-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  Just-blotted lipstick, without the blot. The sheer matte lipstick that gives the diffused flush of
                  color. Inspired by the makeup artist trick of blotting lipstick after application, the matte effect is
                  casual and effortless. The moisturizing, buildable formula can be layered for more color, but it's
                  sheer, so your natural lip color still comes through. Gives lips a little something-extra, with shades
                  that adapt to your natural lip color. Available in Cake, Zip, Jam, Leo, Crush, Fuzz, Malt and Subtle
                  Peach.
                </p>
              </div>

              {/* Product Features */}
              <div className="grid grid-cols-2 gap-2 pt-4">
                {features.map((feature, index) => (
                  <div key={index} className="text-sm">
                    <p className="font-medium">{feature.name}</p>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div className="pt-6">
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-transparent border-b">
                    <TabsTrigger
                      value="details"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none"
                    >
                      Details
                    </TabsTrigger>
                    <TabsTrigger
                      value="ingredients"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none"
                    >
                      Ingredients
                    </TabsTrigger>
                    <TabsTrigger
                      value="how-to-use"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none"
                    >
                      How to Use
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="details" className="pt-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Key Benefits</h3>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li>Sheer, matte finish</li>
                          <li>Buildable color</li>
                          <li>Moisturizing formula</li>
                          <li>Adapts to your natural lip color</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Size</h3>
                        <p className="text-sm">0.07 oz / 2 g</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="ingredients" className="pt-4">
                    <div className="space-y-4">
                      <h3 className="font-medium mb-2">Key Ingredients</h3>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="w-16 h-16 bg-rose-100 rounded-sm mr-4 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-medium">
                              A surge of Blue Agave Extract, Vitamin E, and Wax-Bound Sodium Hyaluronate
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">create a silky-smooth feel with every swipe.</p>
                          </div>
                        </div>
                        <table className="w-full text-sm">
                          <tbody>
                            {ingredients.map((ingredient, index) => (
                              <tr key={index} className="border-b">
                                <td className="py-2 font-medium">{ingredient.name}</td>
                                <td className="py-2 text-right">+</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <p className="text-xs text-gray-500">
                          <a href="#" className="underline">
                            Full ingredients list
                          </a>
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="how-to-use" className="pt-4">
                    <div className="space-y-4">
                      <h3 className="font-medium mb-2">How to Use</h3>
                      <ol className="list-decimal pl-5 text-sm space-y-2">
                        {howToUse.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="bg-gray-50 py-12">
          <div className="container px-4 md:px-6">
            <h2 className="text-xl font-medium mb-6">Customer Reviews</h2>
            <div className="bg-white p-6 rounded-sm shadow-sm">
              <div className="flex items-start mb-4">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-black" />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium">This really is it. My favorite lipstick for daytime ever.</p>
                  <p className="text-sm text-gray-600 mt-2">
                    I love a bold lip at night, but there isn't a hard time finding a lipstick that's subtle enough for
                    daytime but still has a presence. The formula for Generation G lipstick is amazing, looks so natural
                    and just really pulls my look together. I got Cake and Leo for everyday and Zip for a pop of color
                    for the holidays and they all need it too. It's the best!
                  </p>
                </div>
              </div>
              <a href="#" className="text-sm font-medium underline">
                Read all reviews
              </a>
            </div>
          </div>
        </section>

        {/* Product Gallery */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <h2 className="text-xl font-medium mb-6">Get the Look</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative aspect-square overflow-hidden rounded-sm">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Generation G shades"
                  width={400}
                  height={400}
                  className="object-cover"
                />
                <p className="text-xs mt-2">Generation G in every shade</p>
              </div>
              <div className="relative aspect-square overflow-hidden rounded-sm">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Model wearing Generation G"
                  width={400}
                  height={400}
                  className="object-cover"
                />
                <p className="text-xs mt-2">Sophia wears Generation G in Malt</p>
              </div>
              <div className="relative aspect-square overflow-hidden rounded-sm">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Generation G swatches"
                  width={400}
                  height={400}
                  className="object-cover"
                />
                <p className="text-xs mt-2">Swipe on 8 shades of Generation G</p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="py-12 bg-gray-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-xl font-medium mb-6">You May Also Like</h2>
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProducts.map((product, index) => (
                  <div key={index} className="bg-white p-4 rounded-sm">
                    <div className="relative aspect-square overflow-hidden rounded-sm mb-4">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span>{product.price}</span>
                      <Button variant="outline" className="text-xs h-8 rounded-sm">
                        Add to bag
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white rounded-full p-2 shadow-md hidden md:block">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white rounded-full p-2 shadow-md hidden md:block">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="flex justify-center mt-6">
              <div className="flex space-x-2">
                {[...Array(6)].map((_, i) => (
                  <button
                    key={i}
                    className={`w-2 h-2 rounded-full ${i === 0 ? "bg-black" : "bg-gray-300"}`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-medium mb-4">Shop</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Skincare
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Makeup
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Body
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Fragrance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Sets
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">About</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Social Responsibility
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Wholesale
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Help</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Accessibility
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Social</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    YouTube
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Pinterest
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Glossier. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

