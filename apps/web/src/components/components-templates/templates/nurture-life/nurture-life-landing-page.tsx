"use client"

import React from "react"
import Image from "next/image"
import { Button } from "@documenso/ui/primitives/button"
import { Clock, CheckCircle, Truck, User, Star } from "lucide-react"

export default function NurtureLifeLandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="w-full py-6">
        <div className="container px-4 md:px-6 flex justify-center">
          <div className="w-48">
            <Image
              src="/placeholder.svg?height=60&width=180"
              alt="Nurture Life Logo"
              width={180}
              height={60}
              className="object-contain"
              style={{ filter: "hue-rotate(120deg)" }}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-8 md:py-12 bg-[#3d9970] text-white relative overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                3 WEEKS OF SAVINGS
                <br />
                ON MEALS KIDS LOVE!
              </h1>
              <div className="flex flex-col md:flex-row items-center justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex flex-col items-center">
                  <div className="bg-white rounded-full p-2 mb-2">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Shirt icon"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm font-bold">
                    50% OFF
                    <br />
                    1ST WEEK...
                  </p>
                </div>
                <div className="text-2xl">→</div>
                <div className="flex flex-col items-center">
                  <div className="flex space-x-2">
                    <div className="bg-white rounded-full p-2 mb-2">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="Shirt icon"
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div className="bg-white rounded-full p-2 mb-2">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="Shirt icon"
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <p className="text-sm font-bold">
                    20% OFF YOUR
                    <br />
                    NEXT 2 WEEKS!
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-md text-black max-w-md mx-auto md:mx-0">
                <p className="text-center text-sm">
                  Once you set your Klaviyo embed code in the Config tab, your embedded Klaviyo Form will appear here.
                </p>
              </div>
              <div className="flex justify-center md:justify-start">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-6 rounded-md">
                  GET OUR BEST DEAL
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="Nurture Life Meals"
                width={500}
                height={500}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-12 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="text-[#3d9970]">
                <Clock className="h-16 w-16" />
              </div>
              <h3 className="text-[#3d9970] font-bold uppercase text-sm">
                Ready in 1<br />
                minute
              </h3>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="text-[#3d9970]">
                <Image
                  src="/placeholder.svg?height=64&width=64"
                  alt="Fresh food icon"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="text-[#3d9970] font-bold uppercase text-sm">
                Made fresh,
                <br />
                never frozen
              </h3>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="text-[#3d9970]">
                <Image
                  src="/placeholder.svg?height=64&width=64"
                  alt="Balanced nutrition icon"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="text-[#3d9970] font-bold uppercase text-sm">
                Balanced
                <br />
                nutrition in
                <br />
                every meal
              </h3>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="text-[#3d9970]">
                <Image
                  src="/placeholder.svg?height=64&width=64"
                  alt="Clean ingredients icon"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="text-[#3d9970] font-bold uppercase text-sm">
                Made with
                <br />
                real, clean
                <br />
                ingredients
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 bg-[#1b5e41] text-white rounded-3xl mx-auto my-8 max-w-[95%]">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">PICKY EATERS LOVE US TOO!</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="rounded-full overflow-hidden mb-6 w-48 h-48">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Child eating"
                  width={200}
                  height={200}
                  className="object-cover"
                />
              </div>
              <p className="text-center italic mb-4">
                "I love being able to offer my kids something that's easy for me, but nutritious for them."
              </p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="rounded-full overflow-hidden mb-6 w-48 h-48">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Child eating"
                  width={200}
                  height={200}
                  className="object-cover"
                />
              </div>
              <p className="text-center italic mb-4">
                "Having meals delivered to my door weekly for the girls really is amazing."
              </p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="rounded-full overflow-hidden mb-6 w-48 h-48">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Mother and baby"
                  width={200}
                  height={200}
                  className="object-cover"
                />
              </div>
              <p className="text-center italic mb-4">"IT MAKES MOMMIN EASIER and who doesn't love that!"</p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-6 rounded-md">
              GET OUR BEST DEAL
            </Button>
          </div>
        </div>
      </section>

      {/* Hidden Veggies Section */}
      <section className="w-full py-12 bg-[#1b5e41] text-white rounded-3xl mx-auto my-8 max-w-[95%] relative overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                SHHHHH...
                <br />
                WE HAVE A SECRET
              </h2>
              <p className="text-xl">YOUR LITTLE ONE WON'T EVEN KNOW THEY'RE THERE!</p>
            </div>
            <div className="relative">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Pasta with hidden vegetables"
                  width={300}
                  height={300}
                  className="object-contain mx-auto"
                />
                <div className="absolute top-0 right-0 transform rotate-45 bg-[#1b5e41] text-white p-2 rounded-full">
                  <p className="text-xs font-bold text-center">
                    OUR MEALS HAVE
                    <br />
                    HIDDEN VEGGIES
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-10 -left-10">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Cauliflower"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
              <div className="absolute -top-10 -right-10">
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Broccoli"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1b5e41] text-center mb-12">HOW IT WORKS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="border-2 border-[#1b5e41] rounded-md p-4 mb-4">
                <CheckCircle className="h-16 w-16 text-[#1b5e41]" />
              </div>
              <h3 className="text-xl font-bold text-[#1b5e41] mb-2">1. CHOOSE YOUR MEALS</h3>
              <p className="text-gray-600">Made with real, clean ingredients like organic veggies</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="border-2 border-[#1b5e41] rounded-md p-4 mb-4">
                <Truck className="h-16 w-16 text-[#1b5e41]" />
              </div>
              <h3 className="text-xl font-bold text-[#1b5e41] mb-2">2. WE COOK & DELIVER</h3>
              <p className="text-gray-600">Chef-made meals are cooked in our kitchen and delivered to your door</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="border-2 border-[#1b5e41] rounded-md p-4 mb-4">
                <User className="h-16 w-16 text-[#1b5e41]" />
              </div>
              <h3 className="text-xl font-bold text-[#1b5e41] mb-2">3. EAT. LOVE. REPEAT.</h3>
              <p className="text-gray-600">Serve up every meal in 1 minute. Skip, pause or cancel at anytime!</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 bg-[#1b5e41] text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="bg-[#0d4d31] p-8 rounded-xl">
              <div className="flex flex-col md:flex-row items-center justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex flex-col items-center">
                  <div className="bg-white rounded-full p-2 mb-2">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Shirt icon"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm font-bold">
                    50% OFF
                    <br />
                    1ST WEEK...
                  </p>
                </div>
                <div className="text-2xl">→</div>
                <div className="flex flex-col items-center">
                  <div className="flex space-x-2">
                    <div className="bg-white rounded-full p-2 mb-2">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="Shirt icon"
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div className="bg-white rounded-full p-2 mb-2">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="Shirt icon"
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <p className="text-sm font-bold">
                    20% OFF YOUR
                    <br />
                    NEXT 2 WEEKS!
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold">OUR BEST DEAL</h2>
              <p className="text-xl">3 WEEKS OF SAVINGS ON MEALS KIDS LOVE</p>
              <div className="flex justify-center md:justify-start">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-6 rounded-md">
                  GET OUR BEST DEAL
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Press Section */}
      <section className="w-full py-12 bg-gray-100">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70">
            <Image
              src="/placeholder.svg?height=40&width=120"
              alt="Forbes"
              width={120}
              height={40}
              className="object-contain"
            />
            <Image
              src="/placeholder.svg?height=40&width=120"
              alt="Martha Stewart"
              width={120}
              height={40}
              className="object-contain"
            />
            <Image
              src="/placeholder.svg?height=40&width=120"
              alt="People"
              width={120}
              height={40}
              className="object-contain"
            />
            <Image
              src="/placeholder.svg?height=40&width=120"
              alt="Vogue"
              width={120}
              height={40}
              className="object-contain"
            />
            <Image
              src="/placeholder.svg?height=40&width=120"
              alt="Goop"
              width={120}
              height={40}
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-[#1b5e41] text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-4">About Us</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Our Meals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Nutrition
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Help</h3>
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
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Twitter
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
          <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm">
            <p>© {new Date().getFullYear()} Nurture Life. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

