'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { ChevronDown, Download, Folder, LayoutGrid, Plus } from 'lucide-react';

import { Button } from '@documenso/ui/primitives/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@documenso/ui/primitives/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@documenso/ui/primitives/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@documenso/ui/primitives/tabs';
import MarketAnalystDashboard from '~/components/brand-analysis/market-analyst-dashboard';
import ProductsView from '~/components/products/product-view';
import { BrandKitModal } from '~/components/brand-analysis/brand-kit/brand-kit-modal';
import ComponentsView from '~/components/components-templates/ComponentsView';

interface FileCardProps {
  title: string;
  metadata: string;
  thumbnail: string;
}

function FileCard({ title, metadata, thumbnail }: FileCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white">
      <div className="aspect-[4/3] overflow-hidden">
        <Image
          src={thumbnail || '/placeholder.svg'}
          alt={title}
          width={400}
          height={300}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{metadata}</p>
      </div>
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-4">
      <Button className="gap-2">
        <Plus className="h-4 w-4" />
        Create
      </Button>
      <Button variant="outline" className="gap-2">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Upload
      </Button>
      <Button variant="outline" className="gap-2">
        <Folder className="h-4 w-4" />
        Create folder
      </Button>
      <Button variant="outline" className="gap-2">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path
            d="M12 18.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13zM12 14a2 2 0 100-4 2 2 0 000 4z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Record
      </Button>
    </div>
  );
}

function ContentFilters() {
  return (
    <div className="mb-6">
      <Tabs defaultValue="recent">
        <TabsList>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="starred">Starred</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

function FileGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <FileCard
        title="Q4 Sales Deck"
        metadata="Shared folder • 8 presentations"
        thumbnail="/placeholder.svg"
      />
      <FileCard
        title="Product Videos"
        metadata="Shared folder • 5 videos"
        thumbnail="/placeholder.svg"
      />
      <FileCard
        title="ROI Calculator"
        metadata="Shared file • 1 Excel"
        thumbnail="/placeholder.svg"
      />
      <FileCard
        title="Marketing Assets"
        metadata="Shared folder • 12 files"
        thumbnail="/placeholder.svg"
      />
      <FileCard
        title="Customer Testimonials"
        metadata="Shared folder • 3 videos"
        thumbnail="/placeholder.svg"
      />
      <FileCard
        title="Product Roadmap"
        metadata="Shared file • 1 PDF"
        thumbnail="/placeholder.svg"
      />
    </div>
  );
}

function ColorSwatch({ color, name, hex }: { color: string; name: string; hex: string }) {
  return (
    <div className="flex flex-col">
      <div className={`h-16 w-full rounded-md border`} style={{ backgroundColor: hex }} />
      <div className="mt-2">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs uppercase text-gray-500">{hex}</p>
      </div>
    </div>
  );
}

function AssetCard({
  title,
  description,
  thumbnail,
}: {
  title: string;
  description: string;
  thumbnail: string;
}) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[3/2] w-full overflow-hidden bg-gray-100">
        <Image
          src={thumbnail || '/placeholder.svg'}
          alt={title}
          width={300}
          height={200}
          className="h-full w-full object-cover"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Button variant="outline" size="sm" className="w-full gap-2">
          <Download className="h-3 w-3" />
          Download
        </Button>
      </CardContent>
    </Card>
  );
}

function FontSample({ name, style, sample }: { name: string; style: string; sample: string }) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-gray-500">{style}</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-3 w-3" />
          Download
        </Button>
      </div>
      <p className="text-2xl" style={{ fontFamily: name.split(' ')[0].toLowerCase() }}>
        {sample}
      </p>
    </div>
  );
}

export default function FileManager() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div className="mx-auto w-full max-w-screen-xl">
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          {/* Title and Search Row */}
          <div className="mb-4 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <h1 className="text-2xl font-semibold">Library</h1>
            <Button
              variant="default"
              size="sm"
              className="flex items-center gap-1.5 bg-rose-600 text-white hover:bg-rose-500"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Generate Brand Kit
            </Button>
            <BrandKitModal open={isModalOpen} onOpenChange={setIsModalOpen} />
          </div>

          {/* Main Navigation Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <div className="mb-6 border-b">
              <TabsList className="h-auto w-full justify-start gap-1 border-0 bg-transparent p-0">
                <TabsTrigger
                  value="all"
                  className="gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-gray-900 data-[state=active]:bg-gray-100"
                >
                  <LayoutGrid className="h-4 w-4" />
                  <span>All content</span>
                </TabsTrigger>
                <TabsTrigger
                  value="brand"
                  className="gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-gray-900 data-[state=active]:bg-gray-100"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      d="M15 3v18M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>Brand Kit</span>
                </TabsTrigger>
                <TabsTrigger
                  value="pods"
                  className="gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-gray-900 data-[state=active]:bg-gray-100"
                >
                  <Plus className="h-4 w-4" />
                  <span>PODS</span>
                </TabsTrigger>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-auto gap-2 px-4 py-3 text-sm font-normal">
                      <Folder className="h-4 w-4" />
                      <span>Collections</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuItem>
                      <Link href="#" className="flex w-full items-center gap-2">
                        <Folder className="h-4 w-4 text-gray-400" />
                        <span>Product Demos</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="#" className="flex w-full items-center gap-2">
                        <Folder className="h-4 w-4 text-gray-400" />
                        <span>Case Studies</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="#" className="flex w-full items-center gap-2">
                        <Folder className="h-4 w-4 text-gray-400" />
                        <span>Sales Collateral</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="#" className="flex w-full items-center gap-2">
                        <Folder className="h-4 w-4 text-gray-400" />
                        <span>Training Materials</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TabsList>
            </div>

            {/* Tab Content */}
            <TabsContent value="all" className="mt-0">
              <ActionButtons />
              <ContentFilters />
              <FileGrid />
            </TabsContent>

            <TabsContent value="brand" className="mt-0">
              {/* Brand Kit Content */}
              <div className="mb-8">
                <Tabs defaultValue="logos" className="w-full">
                  <TabsList className="mb-6 w-full justify-start">
                    <TabsTrigger value="logos">Logos</TabsTrigger>
                    <TabsTrigger value="colors">Colors</TabsTrigger>
                    <TabsTrigger value="typography">Typography</TabsTrigger>
                    <TabsTrigger value="imagery">Imagery</TabsTrigger>
                    <TabsTrigger value="voice">Voice & Tone</TabsTrigger>
                    <TabsTrigger value="templates">Templates</TabsTrigger>
                    <TabsTrigger value="brand-analysis">Brand Analysis</TabsTrigger>
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="components">Components</TabsTrigger>
                  </TabsList>

                  {/* Logos Section */}
                  <TabsContent value="logos" className="mt-0">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      <AssetCard
                        title="Primary Logo"
                        description="Full color logo for light backgrounds"
                        thumbnail="/placeholder.svg?height=200&width=300"
                      />
                      <AssetCard
                        title="Reversed Logo"
                        description="White logo for dark backgrounds"
                        thumbnail="/placeholder.svg?height=200&width=300"
                      />
                      <AssetCard
                        title="Icon Only"
                        description="Brand mark without wordmark"
                        thumbnail="/placeholder.svg?height=200&width=300"
                      />
                      <AssetCard
                        title="Horizontal Logo"
                        description="For narrow spaces and headers"
                        thumbnail="/placeholder.svg?height=200&width=300"
                      />
                      <AssetCard
                        title="Monochrome Logo"
                        description="Single color version"
                        thumbnail="/placeholder.svg?height=200&width=300"
                      />
                      <AssetCard
                        title="Logo with Tagline"
                        description="Full logo with company slogan"
                        thumbnail="/placeholder.svg?height=200&width=300"
                      />
                    </div>

                    <div className="mt-8 rounded-lg border bg-gray-50 p-6">
                      <h3 className="mb-4 text-lg font-medium">Logo Usage Guidelines</h3>
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                          <h4 className="mb-2 font-medium">Clear Space</h4>
                          <p className="mb-4 text-sm text-gray-600">
                            Always maintain a minimum clear space around the logo equal to the
                            height of the logo mark.
                          </p>
                          <Image
                            src="/placeholder.svg?height=150&width=300"
                            alt="Logo clear space example"
                            width={300}
                            height={150}
                            className="rounded-md border"
                          />
                        </div>
                        <div>
                          <h4 className="mb-2 font-medium">Minimum Size</h4>
                          <p className="mb-4 text-sm text-gray-600">
                            Do not reproduce the logo smaller than 1 inch or 72 pixels wide to
                            ensure legibility.
                          </p>
                          <Image
                            src="/placeholder.svg?height=150&width=300"
                            alt="Logo minimum size example"
                            width={300}
                            height={150}
                            className="rounded-md border"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Colors Section */}
                  <TabsContent value="colors" className="mt-0">
                    <div className="mb-8">
                      <h3 className="mb-4 text-lg font-medium">Primary Colors</h3>
                      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        <ColorSwatch color="primary" name="Primary" hex="#0070F3" />
                        <ColorSwatch color="secondary" name="Secondary" hex="#6B7280" />
                        <ColorSwatch color="accent" name="Accent" hex="#F59E0B" />
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="mb-4 text-lg font-medium">Neutral Colors</h3>
                      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        <ColorSwatch color="black" name="Black" hex="#000000" />
                        <ColorSwatch color="dark-gray" name="Dark Gray" hex="#374151" />
                        <ColorSwatch color="gray" name="Gray" hex="#9CA3AF" />
                        <ColorSwatch color="light-gray" name="Light Gray" hex="#E5E7EB" />
                        <ColorSwatch color="off-white" name="Off White" hex="#F9FAFB" />
                        <ColorSwatch color="white" name="White" hex="#FFFFFF" />
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="mb-4 text-lg font-medium">Extended Palette</h3>
                      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        <ColorSwatch color="success" name="Success" hex="#10B981" />
                        <ColorSwatch color="warning" name="Warning" hex="#F59E0B" />
                        <ColorSwatch color="error" name="Error" hex="#EF4444" />
                        <ColorSwatch color="info" name="Info" hex="#3B82F6" />
                      </div>
                    </div>

                    <div className="rounded-lg border bg-gray-50 p-6">
                      <h3 className="mb-4 text-lg font-medium">Color Usage Guidelines</h3>
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                          <h4 className="mb-2 font-medium">Accessibility</h4>
                          <p className="text-sm text-gray-600">
                            Ensure sufficient contrast between text and background colors. Text
                            should have a contrast ratio of at least 4.5:1 for normal text and 3:1
                            for large text.
                          </p>
                        </div>
                        <div>
                          <h4 className="mb-2 font-medium">Color Proportions</h4>
                          <p className="text-sm text-gray-600">
                            Primary colors should be used for emphasis and call-to-action elements.
                            Neutral colors should dominate most layouts with accent colors used
                            sparingly.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Typography Section */}
                  <TabsContent value="typography" className="mt-0">
                    <div className="mb-8">
                      <h3 className="mb-4 text-lg font-medium">Primary Typefaces</h3>

                      <FontSample
                        name="Inter"
                        style="Headings & UI Elements"
                        sample="The quick brown fox jumps over the lazy dog"
                      />

                      <FontSample
                        name="Merriweather"
                        style="Body Copy & Long-form Content"
                        sample="The quick brown fox jumps over the lazy dog"
                      />
                    </div>

                    <div className="mb-8">
                      <h3 className="mb-4 text-lg font-medium">Type Scale</h3>
                      <div className="space-y-6">
                        <div>
                          <p className="mb-2 text-5xl font-bold">Heading 1</p>
                          <p className="text-sm text-gray-500">32px / 40px line height / Bold</p>
                        </div>
                        <div>
                          <p className="mb-2 text-4xl font-bold">Heading 2</p>
                          <p className="text-sm text-gray-500">28px / 36px line height / Bold</p>
                        </div>
                        <div>
                          <p className="mb-2 text-3xl font-bold">Heading 3</p>
                          <p className="text-sm text-gray-500">24px / 32px line height / Bold</p>
                        </div>
                        <div>
                          <p className="mb-2 text-2xl font-bold">Heading 4</p>
                          <p className="text-sm text-gray-500">20px / 28px line height / Bold</p>
                        </div>
                        <div>
                          <p className="mb-2 text-xl font-bold">Heading 5</p>
                          <p className="text-sm text-gray-500">18px / 24px line height / Bold</p>
                        </div>
                        <div>
                          <p className="mb-2 text-base">Body Text</p>
                          <p className="text-sm text-gray-500">16px / 24px line height / Regular</p>
                        </div>
                        <div>
                          <p className="mb-2 text-sm">Small Text</p>
                          <p className="text-sm text-gray-500">14px / 20px line height / Regular</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border bg-gray-50 p-6">
                      <h3 className="mb-4 text-lg font-medium">Typography Guidelines</h3>
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                          <h4 className="mb-2 font-medium">Line Length</h4>
                          <p className="text-sm text-gray-600">
                            Aim for 60-75 characters per line for optimal readability. Use
                            containers and column widths to control line length.
                          </p>
                        </div>
                        <div>
                          <h4 className="mb-2 font-medium">Hierarchy</h4>
                          <p className="text-sm text-gray-600">
                            Maintain clear visual hierarchy using size, weight, and spacing. Never
                            skip heading levels for accessibility.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Imagery Section */}
                  <TabsContent value="imagery" className="mt-0">
                    <div className="mb-8">
                      <h3 className="mb-4 text-lg font-medium">Photography Style</h3>
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div>
                          <Image
                            src="/placeholder.svg?height=200&width=300"
                            alt="Photography example 1"
                            width={300}
                            height={200}
                            className="mb-3 rounded-md"
                          />
                          <p className="text-sm text-gray-600">Natural lighting with warm tones</p>
                        </div>
                        <div>
                          <Image
                            src="/placeholder.svg?height=200&width=300"
                            alt="Photography example 2"
                            width={300}
                            height={200}
                            className="mb-3 rounded-md"
                          />
                          <p className="text-sm text-gray-600">
                            Authentic people in real environments
                          </p>
                        </div>
                        <div>
                          <Image
                            src="/placeholder.svg?height=200&width=300"
                            alt="Photography example 3"
                            width={300}
                            height={200}
                            className="mb-3 rounded-md"
                          />
                          <p className="text-sm text-gray-600">Dynamic compositions with depth</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="mb-4 text-lg font-medium">Illustration Style</h3>
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div>
                          <Image
                            src="/placeholder.svg?height=200&width=300"
                            alt="Illustration example 1"
                            width={300}
                            height={200}
                            className="mb-3 rounded-md"
                          />
                          <p className="text-sm text-gray-600">Flat design with brand colors</p>
                        </div>
                        <div>
                          <Image
                            src="/placeholder.svg?height=200&width=300"
                            alt="Illustration example 2"
                            width={300}
                            height={200}
                            className="mb-3 rounded-md"
                          />
                          <p className="text-sm text-gray-600">Consistent line weight and style</p>
                        </div>
                        <div>
                          <Image
                            src="/placeholder.svg?height=200&width=300"
                            alt="Illustration example 3"
                            width={300}
                            height={200}
                            className="mb-3 rounded-md"
                          />
                          <p className="text-sm text-gray-600">Simple, clear visual metaphors</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border bg-gray-50 p-6">
                      <h3 className="mb-4 text-lg font-medium">Imagery Guidelines</h3>
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                          <h4 className="mb-2 font-medium">Do's</h4>
                          <ul className="list-disc space-y-2 pl-5 text-sm text-gray-600">
                            <li>Use high-quality, high-resolution images</li>
                            <li>Maintain consistent color treatment across all imagery</li>
                            <li>Represent diversity in people and perspectives</li>
                            <li>Choose images that convey authentic emotion</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="mb-2 font-medium">Don'ts</h4>
                          <ul className="list-disc space-y-2 pl-5 text-sm text-gray-600">
                            <li>Avoid generic stock photography clichés</li>
                            <li>Don't use low-resolution or pixelated images</li>
                            <li>Avoid imagery that conflicts with brand values</li>
                            <li>Don't use overly manipulated or artificial-looking photos</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Voice & Tone Section */}
                  <TabsContent value="voice" className="mt-0">
                    <div className="mb-8">
                      <h3 className="mb-4 text-lg font-medium">Brand Voice</h3>
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <Card>
                          <CardHeader>
                            <CardTitle>Confident</CardTitle>
                            <CardDescription>We speak with authority and expertise</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm font-medium text-green-600">Do:</p>
                                <p className="text-sm text-gray-600">
                                  "Our solution delivers measurable results for enterprise teams."
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-red-600">Don't:</p>
                                <p className="text-sm text-gray-600">
                                  "We think our product might help your business grow."
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>Approachable</CardTitle>
                            <CardDescription>We're friendly and easy to understand</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm font-medium text-green-600">Do:</p>
                                <p className="text-sm text-gray-600">
                                  "Let's walk through how this works for your team."
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-red-600">Don't:</p>
                                <p className="text-sm text-gray-600">
                                  "The implementation methodology facilitates cross-functional
                                  integration."
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>Innovative</CardTitle>
                            <CardDescription>We're forward-thinking and creative</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm font-medium text-green-600">Do:</p>
                                <p className="text-sm text-gray-600">
                                  "We're reimagining how teams collaborate in the digital
                                  workspace."
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-red-600">Don't:</p>
                                <p className="text-sm text-gray-600">
                                  "Our product is similar to others but with a few new features."
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="mb-4 text-lg font-medium">Tone by Context</h3>
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <Card>
                          <CardHeader>
                            <CardTitle>Marketing Materials</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="mb-3 text-sm text-gray-600">
                              Enthusiastic, inspiring, and benefit-focused. Use active voice and
                              compelling calls-to-action.
                            </p>
                            <div className="rounded border bg-gray-50 p-3 text-sm">
                              "Transform your workflow with our intuitive platform. Start your free
                              trial today."
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>Technical Documentation</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="mb-3 text-sm text-gray-600">
                              Clear, precise, and instructional. Use straightforward language and
                              avoid unnecessary jargon.
                            </p>
                            <div className="rounded border bg-gray-50 p-3 text-sm">
                              "Select your project settings from the dropdown menu. Configure each
                              option according to your requirements."
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div className="rounded-lg border bg-gray-50 p-6">
                      <h3 className="mb-4 text-lg font-medium">Writing Guidelines</h3>
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                          <h4 className="mb-2 font-medium">Grammar & Style</h4>
                          <ul className="list-disc space-y-2 pl-5 text-sm text-gray-600">
                            <li>Use active voice whenever possible</li>
                            <li>Write in present tense for immediacy</li>
                            <li>Keep sentences concise (15-20 words max)</li>
                            <li>Use Oxford commas for clarity</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="mb-2 font-medium">Content Structure</h4>
                          <ul className="list-disc space-y-2 pl-5 text-sm text-gray-600">
                            <li>Lead with the most important information</li>
                            <li>Use descriptive headings and subheadings</li>
                            <li>Break up long text with bullet points</li>
                            <li>Include a clear call-to-action</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Templates Section */}
                  <TabsContent value="templates" className="mt-0">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      <AssetCard
                        title="Presentation Template"
                        description="PowerPoint/Keynote slides with brand elements"
                        thumbnail="/placeholder.svg?height=200&width=300"
                      />
                      <AssetCard
                        title="Email Signature"
                        description="HTML and image files for email clients"
                        thumbnail="/placeholder.svg?height=200&width=300"
                      />
                      <AssetCard
                        title="Social Media Templates"
                        description="Formats for all major platforms"
                        thumbnail="/placeholder.svg?height=200&width=300"
                      />
                      <AssetCard
                        title="Business Card Design"
                        description="Print-ready files with guidelines"
                        thumbnail="/placeholder.svg?height=200&width=300"
                      />
                      <AssetCard
                        title="Letterhead"
                        description="Word template with brand elements"
                        thumbnail="/placeholder.svg?height=200&width=300"
                      />
                      <AssetCard
                        title="Report Template"
                        description="Formatted document for case studies"
                        thumbnail="/placeholder.svg?height=200&width=300"
                      />
                    </div>
                  </TabsContent>
                  {/* Brand Analysis Section */}
                  <TabsContent value="brand-analysis" className="mt-0">
                    <div className="flex flex-col">
                      <div className="mb-4 w-full">
                        <MarketAnalystDashboard />
                      </div>
                    </div>
                  </TabsContent>
                  {/* Products Section */}
                  <TabsContent value="products" className="mt-0">
                    <div className="flex flex-col">
                      <div className="mb-4 w-full">
                        <ProductsView />
                      </div>
                    </div>
                  </TabsContent>
                  {/* Components Section */}
                  <TabsContent value="components" className="mt-0">
                    <div className="flex flex-col">
                      <div className="mb-4 w-full">
                        <ComponentsView />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>

            <TabsContent value="pods" className="mt-0">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <Plus className="h-8 w-8 text-gray-500" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">PODS</h3>
                <p className="max-w-md text-gray-500">
                  Create and manage your PODS to organize and share content with your team.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
