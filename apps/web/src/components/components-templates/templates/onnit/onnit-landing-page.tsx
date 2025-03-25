import React from "react"
import Image from "next/image"
import { Button } from "@documenso/ui/primitives/button"
import { Card, CardContent } from "@documenso/ui/primitives/card"
import { CheckCircle, ChevronRight, Zap, Brain, Leaf } from "lucide-react"

export default function OnnitLandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a] text-white">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-[#1a1a1a] relative overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="w-32 mb-6">
                <Image
                  src="/placeholder.svg?height=40&width=120"
                  alt="Onnit Logo"
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase leading-tight">
                WHEN PEAK
                <br />
                PERFORMANCE IS
                <br />
                EVERYTHING, ALPHA
                <br />
                BRAIN® HELPS GIVE YOU
                <br />
                THE EDGE
              </h1>
              <p className="text-gray-300 md:text-lg">
                Clinically studied to help healthy individuals support memory, focus, and speed of thought.†
              </p>
              <Button className="bg-[#ffc107] hover:bg-[#e6af06] text-black font-bold px-8 py-6 rounded-md">
                SHOP NOW. SAVE 15% →
              </Button>
              <div className="flex space-x-4 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="bg-white rounded-full p-2">
                    <CheckCircle className="h-5 w-5 text-black" />
                  </div>
                  <span className="text-sm text-gray-300">Gluten Free</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-white rounded-full p-2">
                    <CheckCircle className="h-5 w-5 text-black" />
                  </div>
                  <span className="text-sm text-gray-300">Caffeine Free</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=400"
                alt="Alpha Brain Bottle"
                width={400}
                height={500}
                className="object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* As Seen On Section */}
      <section className="w-full py-8 bg-gray-100">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-center text-gray-500 text-sm uppercase tracking-wider mb-6">AS SEEN ON</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <Image
              src="/placeholder.svg?height=30&width=100"
              alt="Men's Health"
              width={100}
              height={30}
              className="object-contain opacity-70"
            />
            <Image
              src="/placeholder.svg?height=30&width=100"
              alt="Forbes"
              width={100}
              height={30}
              className="object-contain opacity-70"
            />
            <Image
              src="/placeholder.svg?height=30&width=100"
              alt="The Wall Street Journal"
              width={100}
              height={30}
              className="object-contain opacity-70"
            />
            <Image
              src="/placeholder.svg?height=30&width=100"
              alt="Scientific American"
              width={100}
              height={30}
              className="object-contain opacity-70"
            />
            <Image
              src="/placeholder.svg?height=30&width=100"
              alt="Men's Journal"
              width={100}
              height={30}
              className="object-contain opacity-70"
            />
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="w-full py-8 bg-[#1e2a38] text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="flex items-center space-x-3">
              <Image
                src="/placeholder.svg?height=24&width=24"
                alt="Instagram Icon"
                width={24}
                height={24}
                className="object-contain"
              />
              <div>
                <p className="font-bold">860k+</p>
                <p className="text-xs text-gray-400">Instagram Followers</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Image
                src="/placeholder.svg?height=24&width=24"
                alt="Facebook Icon"
                width={24}
                height={24}
                className="object-contain"
              />
              <div>
                <p className="font-bold">635k+</p>
                <p className="text-xs text-gray-400">Facebook Likes</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Image
                src="/placeholder.svg?height=24&width=24"
                alt="Twitter Icon"
                width={24}
                height={24}
                className="object-contain"
              />
              <div>
                <p className="font-bold">160k+</p>
                <p className="text-xs text-gray-400">Twitter Followers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Options Section */}
      <section className="w-full py-12 bg-[#ffc107]">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-black uppercase mb-2">GET READY TO PERFORM</h2>
            <p className="text-black font-medium">CHOOSE YOUR PACKAGE AND SAVE BIG ON YOUR CHOICE OF ALPHA BRAIN®</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Option 1 */}
            <Card className="bg-white rounded-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-center mb-4">GET 1 BOTTLE</h3>
                  <div className="flex justify-center mb-4">
                    <Image
                      src="/placeholder.svg?height=200&width=150"
                      alt="Alpha Brain Single Bottle"
                      width={150}
                      height={200}
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center mb-4">
                    <p className="text-2xl font-bold">$50.92/BOTTLE</p>
                  </div>
                  <Button className="w-full bg-[#4caf50] hover:bg-[#45a049] text-white font-bold py-3">
                    ADD TO CART. SAVE 15% →
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Option 2 */}
            <Card className="bg-white rounded-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-[#ffc107] text-black text-center py-2 font-bold">MOST POPULAR</div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-center mb-4">BUY 2, GET 25% OFF + FREE GIFT</h3>
                  <div className="flex justify-center mb-4">
                    <Image
                      src="/placeholder.svg?height=200&width=150"
                      alt="Alpha Brain Double Pack"
                      width={150}
                      height={200}
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center mb-4">
                    <p className="text-2xl font-bold">$75.65/BOTTLE</p>
                    <p className="text-[#e53935] font-bold">YOU SAVE $73</p>
                  </div>
                  <Button className="w-full bg-[#4caf50] hover:bg-[#45a049] text-white font-bold py-3">
                    ADD TO CART. SAVE 15% →
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Option 3 */}
            <Card className="bg-white rounded-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-[#e53935] text-white text-center py-2 font-bold">BEST VALUE</div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-center mb-4">BUY 3, GET 40% OFF + FREE GIFT</h3>
                  <div className="flex justify-center mb-4">
                    <Image
                      src="/placeholder.svg?height=200&width=150"
                      alt="Alpha Brain Triple Pack"
                      width={150}
                      height={200}
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center mb-4">
                    <p className="text-2xl font-bold">$93.50/BOTTLE</p>
                    <p className="text-[#e53935] font-bold">YOU SAVE $137</p>
                  </div>
                  <Button className="w-full bg-[#4caf50] hover:bg-[#45a049] text-white font-bold py-3">
                    ADD TO CART. SAVE 15% →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-16 bg-[#1a1a1a]">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold uppercase mb-2">HELPS WITH FLOW STATE</h2>
            <p className="text-gray-400">(that feeling of being "in the zone")</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#ffc107] p-4 rounded-full mb-4">
                <Zap className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-bold uppercase mb-2">SUSTAINED FOCUS</h3>
              <p className="text-gray-400">Helps with focus even with the most complex tasks.†</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#ffc107] p-4 rounded-full mb-4">
                <Brain className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-bold uppercase mb-2">MEMORY</h3>
              <p className="text-gray-400">Support recall of names, places, ideas, and key information.†</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#ffc107] p-4 rounded-full mb-4">
                <Leaf className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-bold uppercase mb-2">CAREFULLY SELECTED INGREDIENTS</h3>
              <p className="text-gray-400">Formulated with nutrients, botanicals, and amino acids.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="w-full py-16 bg-[#1a1a1a]">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold uppercase text-center mb-12">MADE WITH CAREFULLY SELECTED INGREDIENTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full overflow-hidden mb-4 w-32 h-32">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="Bacopa"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold uppercase mb-2">BACOPA</h3>
              <p className="text-gray-400">
                Bacopa is a perennial herb that is known to help mental agility and can be particularly beneficial for
                memory. It's a nootropic that reduces messages from other nerves.†
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full overflow-hidden mb-4 w-32 h-32">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="Cat's Claw"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold uppercase mb-2">CAT'S CLAW</h3>
              <p className="text-gray-400">
                Cat's Claw grows in the Amazon and the bark of this vine contains antioxidants that are known to help
                promote cellular integrity.†
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full overflow-hidden mb-4 w-32 h-32">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="Huperzia Serrata"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold uppercase mb-2">HUPERZIA SERRATA</h3>
              <p className="text-gray-400">
                This traditional Chinese herb contains a compound called Huperzine A. This has been shown to support
                healthy acetylcholine for transporting messages across the brain.†
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full overflow-hidden mb-4 w-32 h-32">
                <Image
                  src="/placeholder.svg?height=128&width=128"
                  alt="Oat Straw"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold uppercase mb-2">OAT STRAW</h3>
              <p className="text-gray-400">
                The common oat, or Avena sativa, is a grass native to Northern Europe. It's been used to support brain
                health for centuries. Oat straw provides mental stimulation for optimal mental performance.†
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blends Section */}
      <section className="w-full py-16 bg-[#1a1a1a]">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold uppercase mb-2">THREE PEAK PERFORMANCE BLENDS IN ONE</h2>
            <p className="text-gray-400">FORMULATED WITH NUTRIENTS AND BOTANICALS TO SUPPORT MEMORY & FOCUS</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-lg overflow-hidden mb-4 w-full h-48 relative">
                <Image
                  src="/placeholder.svg?height=192&width=300"
                  alt="Onnit Flow Blend"
                  width={300}
                  height={192}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold uppercase mb-2">ONNIT FLOW BLEND™</h3>
              <p className="text-gray-400">
                Supports cognitive processing speed and reaction time in healthy individuals.†
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-lg overflow-hidden mb-4 w-full h-48 relative">
                <Image
                  src="/placeholder.svg?height=192&width=300"
                  alt="Onnit Focus Blend"
                  width={300}
                  height={192}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold uppercase mb-2">ONNIT FOCUS BLEND™</h3>
              <p className="text-gray-400">Helps support attention and focus in healthy individuals.†</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-lg overflow-hidden mb-4 w-full h-48 relative">
                <Image
                  src="/placeholder.svg?height=192&width=300"
                  alt="Onnit Fuel Blend"
                  width={300}
                  height={192}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold uppercase mb-2">ONNIT FUEL BLEND™</h3>
              <p className="text-gray-400">
                Helps the body maintain optimal levels of acetylcholine to keep your brain running at full power.†
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Button className="bg-[#4caf50] hover:bg-[#45a049] text-white font-bold px-8 py-4">
              SHOP NOW. SAVE 15% →
            </Button>
          </div>
        </div>
      </section>

      {/* Usage Section */}
      <section className="w-full py-12 bg-white text-black">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold uppercase mb-4">SUGGESTED USE</h2>
              <p className="mb-4">
                As a dietary supplement, take 2 capsules with a light meal. For best results, use consistently. Alpha
                BRAIN® can be used daily, but for some people, cycling off the product for 1-2 days a week after
                extended use (4-6 weeks) helps maintain maximum effectiveness.
              </p>
              <div className="flex space-x-4 mt-6">
                <div className="flex items-center space-x-2">
                  <div className="bg-[#4caf50] rounded-full p-2">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm">Gluten Free</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#4caf50] rounded-full p-2">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm">Caffeine Free</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold uppercase mb-4 text-center">Supplement Facts</h3>
              <div className="border-t border-b border-gray-300 py-2">
                <p className="font-bold">Serving Size: 2 Capsules</p>
                <p className="font-bold">Servings Per Container: 30</p>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Vitamin B6 (as Pyridoxine HCl)</span>
                  <span>10mg</span>
                </div>
                <div className="flex justify-between">
                  <span>Onnit Flow Blend™</span>
                  <span>650mg</span>
                </div>
                <div className="flex justify-between">
                  <span>Onnit Focus Blend™</span>
                  <span>240mg</span>
                </div>
                <div className="flex justify-between">
                  <span>Onnit Fuel Blend™</span>
                  <span>60mg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16 bg-[#1a1a1a]">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold uppercase text-center mb-12">FREQUENTLY ASKED QUESTIONS</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="border-b border-gray-700 pb-4">
              <button className="flex justify-between items-center w-full text-left">
                <h3 className="text-lg font-medium">How do I know Alpha BRAIN® will work?</h3>
                <ChevronRight className="h-5 w-5 transform rotate-90" />
              </button>
            </div>
            <div className="border-b border-gray-700 pb-4">
              <button className="flex justify-between items-center w-full text-left">
                <h3 className="text-lg font-medium">How does Alpha BRAIN® work?</h3>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="border-b border-gray-700 pb-4">
              <button className="flex justify-between items-center w-full text-left">
                <h3 className="text-lg font-medium">Is Alpha BRAIN® safe?</h3>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="border-b border-gray-700 pb-4">
              <button className="flex justify-between items-center w-full text-left">
                <h3 className="text-lg font-medium">Can I take Alpha BRAIN® with coffee?</h3>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="border-b border-gray-700 pb-4">
              <button className="flex justify-between items-center w-full text-left">
                <h3 className="text-lg font-medium">How fast does it work?</h3>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 bg-[#0f0f0f] text-gray-400">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-white mb-4">SHOP</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Alpha BRAIN®
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Supplements
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Fitness
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Foods
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">LEARN</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Podcast
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Videos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Research
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">COMPANY</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">CONNECT</h3>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="hover:text-white">
                  <Image
                    src="/placeholder.svg?height=24&width=24"
                    alt="Instagram"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </a>
                <a href="#" className="hover:text-white">
                  <Image
                    src="/placeholder.svg?height=24&width=24"
                    alt="Facebook"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </a>
                <a href="#" className="hover:text-white">
                  <Image
                    src="/placeholder.svg?height=24&width=24"
                    alt="Twitter"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </a>
              </div>
              <p className="text-xs">© {new Date().getFullYear()} Onnit Labs, Inc. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

