'use client'

import {
  Plus,
  Settings,
  BookOpen,
  FileText,
  HelpCircle,
  Paperclip,
  ArrowUpRight,
  ArrowUp,
  Send,
  Copy,
  Download,
  ExternalLink,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type React from 'react'
import { useState } from 'react'

// ProjectCard Component
function ProjectCard({
  image,
  title,
  forks,
  avatarColor,
}: {
  image: string
  title: string
  forks: string
  avatarColor: string
}) {
  return (
    <div className="flex flex-col">
      <div className="rounded-md overflow-hidden mb-2 border border-zinc-200">
        <Image
          src={image || '/placeholder.svg'}
          width={300}
          height={200}
          alt={title}
          className="w-full h-32 object-cover"
        />
      </div>
      <div className="flex items-center gap-2">
        <div className={`w-6 h-6 rounded-full ${avatarColor}`}></div>
        <div className="flex-1">
          <h3 className="text-xs font-medium text-muted-foreground">{title}</h3>
          <div className="flex items-center gap-1 text-xs text-zinc-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-3" />
              <path d="M18 4h-9a2 2 0 0 0-2 2v9" />
              <path d="M13 8V4h4v4" />
              <path d="M13 4l5 5" />
            </svg>
            {forks} Forks
          </div>
        </div>
      </div>
    </div>
  )
}

function V0Clone() {
  return (
    <div className="flex flex-col">

      {/* Community Section */}
      <div className="mb-8 max-w-[800px] mx-auto mt-4">
        <div className="flex justify-between items-center mb-4 mx-auto">
          <h2 className="text-sm font-medium">Templates</h2>
          <Link
            href="#"
            className="text-xs text-zinc-500 flex items-center gap-1"
          >
            View All
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ProjectCard
            image="/placeholder.svg"
            title="Data Analysis"
            forks="1.4K"
            avatarColor="bg-gradient-to-r from-purple-500 to-pink-500"
          />
          <ProjectCard
            image="/placeholder.svg"
            title="Landing Page"
            forks="3.2K"
            avatarColor="bg-gray-700"
          />
          <ProjectCard
            image="/placeholder.svg"
            title="Promotion Page"
            forks="3.4K"
            avatarColor="bg-gradient-to-r from-blue-400 to-teal-400"
          />
          <ProjectCard
            image="/placeholder.svg"
            title="CTA Component"
            forks="1.7K"
            avatarColor="bg-gradient-to-r from-blue-400 to-teal-400"
          />
        </div>
      </div>
    </div>
  )
}

export default V0Clone
