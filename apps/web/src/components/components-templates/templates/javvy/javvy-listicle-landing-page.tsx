"use client"

import React from "react"
import Image from "next/image"
import { Button } from "@documenso/ui/primitives/button"
import { CheckCircle, Star, Clock } from "lucide-react"

export default function JavvyListicleLandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header Section */}
      <header className="w-full py-4 border-b">
        <div className="container px-4 md:px-6 flex justify-center">
          <Image
            src="/javvy-logo.png?height=50&width=120"
            alt="Javvy Logo"
            width={120}
            height={50}
            className="object-contain"
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-8 md:py-12">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
            5 Reasons Why This Coffee Is On Everyones Black Friday Wishlist ☕
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Here are the big five reasons why everyone is finally tossing the coffee grounds, ditching big chain coffee
            shops, and saving tons of money by switching to the world&apos;s most convenient (and delicious) Coffee ever
            by Javy.
          </p>
        </div>
      </section>

      {/* Reason 1 */}
      <section className="w-full py-8 md:py-12 border-t">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Cold Brew Coffee"
                width={400}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                <span className="text-indigo-700">1.</span> Fastest, Easiest, & Most Convenient Cold Brew Ever
              </h2>
              <p className="text-gray-600 mb-4">
                Here are the big five reasons why everyone is finally tossing the coffee grounds, ditching big chain
                coffee shops, and saving tons of money by switching to the world&apos;s most convenient (and delicious)
                Coffee ever by Javy.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-700 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Ready in seconds - just add water</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-700 mr-2 flex-shrink-0 mt-0.5" />
                  <span>No equipment needed</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-700 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Perfect coffee every time</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reason 2 */}
      <section className="w-full py-8 md:py-12 bg-gray-50">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                <span className="text-indigo-700">2.</span> Make It Anyway You Like It
              </h2>
              <p className="text-gray-600 mb-4">
                Javy is created so that you can personalize your Cold Brew Coffee just the way you like it. Make any
                style coffee that you want with each and every pour.
              </p>
              <div className="flex space-x-2 mb-4">
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">ICED</span>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">HOT</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">COLD BREW</span>
              </div>
              <p className="text-gray-600">
                Add milk, cream, sugar, or any flavoring you prefer to create your perfect cup.
              </p>
            </div>
            <div>
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Coffee Customization"
                width={400}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reason 3 */}
      <section className="w-full py-8 md:py-12">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Money Saving Coffee"
                width={400}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                <span className="text-indigo-700">3.</span> The Ultimate Money Saver
              </h2>
              <p className="text-gray-600 mb-4">
                Big chain coffee shops are costing you a fortune, especially driving to them with gas prices at an all
                time high. Javy comes in at around $0.66¢ per cup and delivered right to your door for FREE.
              </p>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="font-bold text-indigo-700 mb-2">Cost Comparison</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Big Chain Coffee:</span>
                    <span className="font-bold">$5-7 per cup</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Javy Coffee:</span>
                    <span className="font-bold text-indigo-700">$0.66 per cup</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span>Annual Savings:</span>
                    <span className="font-bold text-indigo-700">$1,500+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reason 4 */}
      <section className="w-full py-8 md:py-12 bg-gray-50">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                <span className="text-indigo-700">4.</span> We Are Truly Changing The World
              </h2>
              <p className="text-gray-600 mb-4">
                Javy is leading the way for coffee sustainability. We pay a premium for our coffee and work directly
                with farmers to build a regenerative agriculture based coffee source.
              </p>
              <p className="text-gray-600 mb-4">(Not to mention we are also plastic free).</p>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-bold text-green-700 mb-2">Our Sustainability Commitment</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-700 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Direct trade with farmers</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-700 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Regenerative agriculture practices</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-700 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Plastic-free packaging</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Coffee Farmer"
                width={400}
                height={400}
                className="rounded-lg object-cover"
              />
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                PLASTIC FREE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reason 5 */}
      <section className="w-full py-8 md:py-12">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Coffee Community"
                  width={400}
                  height={400}
                  className="rounded-lg object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  <div className="flex flex-wrap gap-2">
                    {["FOX", "NBC", "CBS NEWS", "ABC"].map((network, index) => (
                      <div key={index} className="bg-white/90 px-2 py-1 rounded text-xs font-bold">
                        {network}
                      </div>
                    ))}
                  </div>
                  <div className="bg-white/90 p-3 rounded-lg">
                    <div className="flex mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm font-medium">Absolutely Love It!</p>
                    <p className="text-xs text-gray-600">
                      "I actually look forward to my coffee now, and I rave about it to my family and friends."
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                <span className="text-indigo-700">5.</span> The Fastest Growing Coffee Community
              </h2>
              <p className="text-gray-600 mb-4">
                We have over 150,000,000 organic views for our #drinkjavy hashtag across social media! Javy has also
                been featured in some of the largest publications.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-indigo-700 font-bold">150M+</span>
                  </div>
                  <div>
                    <h3 className="font-bold">Organic Views</h3>
                    <p className="text-sm text-gray-600">Across social media platforms</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-indigo-700 font-bold">10K+</span>
                  </div>
                  <div>
                    <h3 className="font-bold">5-Star Reviews</h3>
                    <p className="text-sm text-gray-600">From satisfied customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promotion Section */}
      <section className="w-full py-8 md:py-12 bg-amber-50 border-t border-b border-dashed border-amber-200">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">Exclusive Early Black Friday Deal</h2>
            <div className="flex items-center justify-center mt-2 space-x-2">
              <Clock className="h-5 w-5 text-red-600" />
              <p className="text-red-600 font-medium">Sale Ends In 12:14:11</p>
            </div>
            <p className="mt-2">Join the #1 coffee club and try Javy while it's on sale now!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Javy Coffee Bundle"
                width={300}
                height={300}
                className="mx-auto"
              />
            </div>
            <div className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-indigo-700 rounded-full p-1 mr-3 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium">FREE Javy with your order</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-indigo-700 rounded-full p-1 mr-3 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium">FREE gifts with your order</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-indigo-700 rounded-full p-1 mr-3 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium">Biggest sale of the year</span>
                </li>
              </ul>

              <Button className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-6 rounded-md text-lg">
                Redeem up to 67% OFF
              </Button>

              <div className="flex justify-between text-sm pt-2">
                <div className="flex items-center">
                  <span className="font-bold mr-1">SELL OUT RISK:</span>
                  <span className="text-red-600 font-bold">HIGH</span>
                </div>
                <div>
                  <span className="font-bold text-green-600">FREE SHIPPING</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-8">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <Button className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-6 rounded-md text-lg">
            Redeem up to 67% OFF
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-100">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Javy Coffee. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-indigo-700">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-indigo-700">
              Terms of Service
            </a>
            <a href="#" className="hover:text-indigo-700">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

