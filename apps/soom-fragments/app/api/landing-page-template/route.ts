// apps/soom-fragments/app/api/landing-page-template/route.ts
import { prisma } from '@documenso/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const templateId = request.nextUrl.searchParams.get('id')

  if (!templateId) {
    return NextResponse.json(
      { error: 'Template ID is required' },
      { status: 400 },
    )
  }

  try {
    // Handle special case for string IDs
    if (templateId === 'setu-landing-page-template') {
      // Return a simplified version of the Setu Landing Page template code
      return NextResponse.json({
        templateCode: `
import React from "react"

export default function SetuLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">The Hidden Snowboard</h1>
              <p className="text-xl mb-8">Experience the ultimate ride with our revolutionary snowboard design.</p>
              <button className="bg-white text-indigo-700 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300">
                Pre-order Now
              </button>
            </div>
            <div className="md:w-1/2">
              <img src="/snowboard-image.jpg" alt="The Hidden Snowboard" className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose The Hidden?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature items would go here */}
          </div>
        </div>
      </section>

      {/* Add more sections as needed */}
    </div>
  )
}
        `,
      })
    } else if (templateId === 'javvy-landing-page-template') {
      // Map to the numeric ID
      const numericId = 2 // Javvy template ID

      const template = await prisma.landingPageTemplate.findUnique({
        where: { id: numericId },
      })

      if (template) {
        return NextResponse.json({ templateCode: template.componentCode })
      }
    } else if (!isNaN(Number(templateId))) {
      // If it's already a number, use it directly
      const template = await prisma.landingPageTemplate.findUnique({
        where: { id: parseInt(templateId) },
      })

      if (template) {
        return NextResponse.json({ templateCode: template.componentCode })
      }
    }

    // If we get here, the template wasn't found
    return NextResponse.json({ error: 'Template not found' }, { status: 404 })
  } catch (error) {
    console.error('Error fetching template:', error)
    return NextResponse.json(
      { error: 'Failed to fetch template' },
      { status: 500 },
    )
  }
}
