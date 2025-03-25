'use client';

import React from 'react';
import { useState } from 'react';

import Image from 'next/image';

import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Code,
  FileText,
  GitBranch,
  ImageIcon,
  LayoutTemplate,
  MessageSquare,
  Plug,
  Plus,
  Users,
} from 'lucide-react';

import { Avatar, AvatarFallback } from '@documenso/ui/primitives/avatar';
import { Button } from '@documenso/ui/primitives/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@documenso/ui/primitives/card';
import { Progress } from '@documenso/ui/primitives/progress';
import { Tabs, TabsList, TabsTrigger } from '@documenso/ui/primitives/tabs';

export default function WidgetDashboard() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="mx-auto w-full max-w-screen-xl px-4 md:px-8">
      {/* App Banner */}
      <div className="relative mb-10 overflow-hidden rounded-lg border border-zinc-700 bg-[#18181b] p-6">
        <div className="flex items-center justify-between">
          <div className="z-10">
            <h2 className="mb-1 text-xl font-semibold text-zinc-50">
              Integrate your apps to supercharge your AI with real-time data
            </h2>
            <p className="mb-4 text-sm text-zinc-200">
              Give your agents access to over 1000+ apps.
            </p>
            <Button variant="outline" size="sm" className="flex items-center gap-1.5 text-zinc-50">
              Integrations <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="z-10 flex items-center gap-[-10px]">
            <div className="-ml-2 flex h-12 w-12 items-center justify-center rounded-full bg-white">
              <Image
                src="/gdrive.webp?height=36&width=36"
                alt="Google Drive"
                width={48}
                height={48}
              />
            </div>
            <div className="-ml-2 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800">
              <Image
                src="/mailchimp2.png?height=36&width=36"
                alt="Mailchimp"
                width={48}
                height={48}
              />
            </div>
            <div className="-ml-2 flex h-12 w-12 items-center justify-center rounded-full bg-white">
              <Image src="/shopify2.png?height=36&width=36" alt="Shopify" width={48} height={48} />
            </div>
            <div className="-ml-2 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800">
              <Image src="/gmail2.webp?height=48&width=48" alt="App" width={48} height={48} />
            </div>
            <div className="-ml-2 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800">
              <Image src="/outlook2.webp?height=36&width=36" alt="Outlook" width={48} height={48} />
            </div>
          </div>
        </div>
      </div>

      {/* App Icons */}
      <div className="mb-8 grid grid-cols-4 gap-4 md:grid-cols-8">
        <Button
          variant="outline"
          className="flex h-24 flex-col items-center justify-center border bg-zinc-50 p-2 transition-colors hover:border-zinc-200 hover:bg-zinc-100"
        >
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-rose-600">
            <MessageSquare className="h-4 w-4 text-white" />
          </div>
          <span className="text-xs font-medium text-zinc-800">Chatspace</span>
        </Button>

        <Button
          variant="outline"
          className="flex h-24 flex-col items-center justify-center border bg-zinc-50 p-2 transition-colors hover:border-zinc-200 hover:bg-zinc-100"
        >
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-rose-600">
            <Users className="h-4 w-4 text-white" />
          </div>
          <span className="text-xs font-medium text-zinc-800">Agents</span>
        </Button>

        <Button
          variant="outline"
          className="flex h-24 flex-col items-center justify-center border bg-zinc-50 p-2 transition-colors hover:border-zinc-200 hover:bg-zinc-100"
        >
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-rose-600">
            <ImageIcon className="h-4 w-4 text-white" />
          </div>
          <span className="text-xs font-medium text-zinc-800">Assets</span>
        </Button>

        <Button
          variant="outline"
          className="flex h-24 flex-col items-center justify-center border bg-zinc-50 p-2 transition-colors hover:border-zinc-200 hover:bg-zinc-100"
        >
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-rose-600">
            <Code className="h-4 w-4 text-white" />
          </div>
          <span className="text-xs font-medium text-zinc-800">Builder</span>
        </Button>

        <Button
          variant="outline"
          className="flex h-24 flex-col items-center justify-center border bg-zinc-50 p-2 transition-colors hover:border-zinc-200 hover:bg-zinc-100"
        >
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-rose-600">
            <FileText className="h-4 w-4 text-white" />
          </div>
          <span className="text-xs font-medium text-zinc-800">Documents</span>
        </Button>

        <Button
          variant="outline"
          className="flex h-24 flex-col items-center justify-center border bg-zinc-50 p-2 transition-colors hover:border-zinc-200 hover:bg-zinc-100"
        >
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-rose-600">
            <LayoutTemplate className="h-4 w-4 text-white" />
          </div>
          <span className="text-xs font-medium text-zinc-800">Templates</span>
        </Button>

        <Button
          variant="outline"
          className="flex h-24 flex-col items-center justify-center border bg-zinc-50 p-2 transition-colors hover:border-zinc-200 hover:bg-zinc-100"
        >
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-rose-600">
            <GitBranch className="h-4 w-4 text-white" />
          </div>
          <span className="text-xs font-medium text-zinc-800">Workflows</span>
        </Button>

        <Button
          variant="outline"
          className="flex h-24 flex-col items-center justify-center border bg-zinc-50 p-2 transition-colors hover:border-zinc-200 hover:bg-zinc-100"
        >
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-rose-600">
            <Plug className="h-4 w-4 text-white" />
          </div>
          <span className="text-xs font-medium text-zinc-800">Integrations</span>
        </Button>
      </div>

      {/* Widget Management Header */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Control Panel</h1>
      </div>

      {/* Widget Tabs and Search */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList className="h-auto rounded-md bg-zinc-100">
            <TabsTrigger
              value="all"
              className="rounded-md px-4 py-2 text-sm data-[state=active]:bg-white data-[state=active]:text-zinc-900"
            >
              Chatspace
            </TabsTrigger>
            <TabsTrigger
              value="agents"
              className="rounded-md px-4 py-2 text-sm data-[state=active]:bg-white data-[state=active]:text-zinc-900"
            >
              Agents
            </TabsTrigger>
            <TabsTrigger
              value="assets"
              className="rounded-md px-4 py-2 text-sm data-[state=active]:bg-white data-[state=active]:text-zinc-900"
            >
              Assets
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="rounded-md px-4 py-2 text-sm data-[state=active]:bg-white data-[state=active]:text-zinc-900"
            >
              Documents
            </TabsTrigger>
            <TabsTrigger
              value="templates"
              className="rounded-md px-4 py-2 text-sm data-[state=active]:bg-white data-[state=active]:text-zinc-900"
            >
              Templates
            </TabsTrigger>
            <TabsTrigger
              value="workflows"
              className="rounded-md px-4 py-2 text-sm data-[state=active]:bg-white data-[state=active]:text-zinc-900"
            >
              Workflows
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex w-full items-center gap-3 md:w-auto">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 whitespace-nowrap bg-white"
          >
            Sort by <ChevronDown className="h-4 w-4" />
          </Button>
          <Button size="sm" className="bg-rose-600 hover:bg-rose-500">
            + Create new
          </Button>
        </div>
      </div>

      {/* Sales & Financial Insights */}
      <div className="mb-8">
        {activeTab === 'all' && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Sales Revenue Widget */}
            <Card className="border border-zinc-200 bg-white">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-cyan-100 p-1">
                      <Plus className="h-4 w-4 text-cyan-500" />
                    </div>
                    <CardTitle className="text-base font-medium">Sales Revenue</CardTitle>
                  </div>
                  <ArrowRight className="h-4 w-4 text-zinc-400" />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-col">
                  <div className="text-xl font-medium">$5,832</div>
                  <div className="mt-1 text-sm text-zinc-500">
                    Your revenue decreased this month by about{' '}
                    <span className="text-rose-500">$421</span>
                  </div>
                  <div className="mt-4 h-20">
                    <div className="flex h-full items-end justify-between">
                      <div className="h-[60%] w-1/6 rounded-t-sm bg-zinc-100"></div>
                      <div className="h-[80%] w-1/6 rounded-t-sm bg-zinc-100"></div>
                      <div className="h-[70%] w-1/6 rounded-t-sm bg-zinc-100"></div>
                      <div className="h-[90%] w-1/6 rounded-t-sm bg-zinc-100"></div>
                      <div className="h-[65%] w-1/6 rounded-t-sm bg-zinc-100"></div>
                      <div className="h-[40%] w-1/6 rounded-t-sm bg-rose-500"></div>
                    </div>
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-zinc-500">
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start pt-4">
                <h3 className="mb-1 text-sm font-medium text-zinc-900">Sales Revenue</h3>
                <CardDescription className="text-xs text-zinc-500">
                  Allows users to quickly analyze and compare sales data
                </CardDescription>
              </CardFooter>
            </Card>

            {/* Revenue Forecast Widget */}
            <Card className="border border-zinc-200 bg-white">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">Revenue Forecast</CardTitle>
                  <ArrowRight className="h-4 w-4 text-zinc-400" />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-col">
                  <div className="text-xl font-medium">$3,850</div>
                  <div className="mt-1 text-sm text-zinc-500">
                    your estimated income this month is about around{' '}
                    <span className="font-medium">$4,500</span>
                  </div>
                  <div className="mt-4 h-20">
                    <div className="grid h-full grid-cols-6 items-end gap-1">
                      <div className="h-[60%] rounded-sm bg-cyan-400"></div>
                      <div className="h-[80%] rounded-sm bg-cyan-400"></div>
                      <div className="h-[65%] rounded-sm bg-cyan-400"></div>
                      <div className="h-[85%] rounded-sm bg-cyan-400"></div>
                      <div className="h-[70%] rounded-sm bg-cyan-400"></div>
                      <div className="h-[50%] rounded-sm bg-zinc-100"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start pt-4">
                <h3 className="mb-1 text-sm font-medium text-zinc-900">Revenue Forecast</h3>
                <CardDescription className="text-xs text-zinc-500">
                  Predict future sales based on historical data and current opportunities.
                </CardDescription>
              </CardFooter>
            </Card>

            {/* Customer Segmentation Widget */}
            <Card className="border border-zinc-200 bg-white">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">Customer Segmentation</CardTitle>
                  <ArrowRight className="h-4 w-4 text-zinc-400" />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-col items-center">
                  <div className="relative my-2 h-28 w-28">
                    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-8 border-[#e11d48]">
                      <div
                        className="absolute inset-0 rounded-full border-8 border-[#e11d48]"
                        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 30%, 0 30%)' }}
                      ></div>
                      <div
                        className="absolute inset-0 rounded-full border-8 border-[#22d3ee]"
                        style={{ clipPath: 'polygon(0 30%, 100% 30%, 100% 100%, 0 100%)' }}
                      ></div>
                      <div className="z-10 text-xl font-bold">2,758</div>
                    </div>
                  </div>
                  <div className="mt-2 w-full">
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 h-3 w-3 bg-[#e11d48]"></div>
                        <span className="text-sm">Small Business</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium">1,650</span>
                        <span className="ml-1 text-xs text-green-500">+424</span>
                      </div>
                    </div>
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 h-3 w-3 bg-[#22d3ee]"></div>
                        <span className="text-sm">Enterprise</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium">350</span>
                        <span className="ml-1 text-xs text-green-500">+24</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 h-3 w-3 bg-[#5cba47]"></div>
                        <span className="text-sm">Individuals</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium">458</span>
                        <span className="ml-1 text-xs text-green-500">+133</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start pt-4">
                <h3 className="mb-1 text-sm font-medium text-zinc-900">Customer Segmentation</h3>
                <CardDescription className="text-xs text-zinc-500">
                  Categorizing and analyzing customers based on various criteria.
                </CardDescription>
              </CardFooter>
            </Card>

            {/* Conversion Rates Widget */}
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-gray-200 p-1">
                      <span className="h-4 w-4 text-gray-600">-</span>
                    </div>
                    <CardTitle className="text-base font-medium">Conversion Rates</CardTitle>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-col">
                  <div className="mb-4">
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 h-3 w-3 bg-green-500"></div>
                        <span className="text-sm font-medium">75.3%</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                        <span className="text-green-500">2,424</span>
                      </div>
                    </div>
                    <Progress value={75} className="h-2 bg-zinc-100 [&>div]:bg-green-500" />
                    <div className="mt-1 flex justify-between text-xs text-gray-500">
                      <span>12,565 Visitor</span>
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 h-3 w-3 bg-yellow-400"></div>
                        <span className="text-sm font-medium">24.7%</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                        <span className="text-green-500">213</span>
                      </div>
                    </div>
                    <Progress value={25} className="h-2 bg-zinc-100 [&>div]:bg-yellow-400" />
                    <div className="mt-1 flex justify-between text-xs text-zinc-500">
                      <span>1,421 Product sales</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start pt-4">
                <h3 className="mb-1 font-medium text-black">Conversion rates</h3>
                <CardDescription className="text-sm text-zinc-500">
                  show different stages of the sales funnel are converting leads into customers.
                </CardDescription>
              </CardFooter>
            </Card>
          </div>
        )}

        {activeTab === 'installed' && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Sales Revenue Widget */}
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-green-100 p-1">
                      <Plus className="h-4 w-4 text-green-600" />
                    </div>
                    <CardTitle className="text-base font-medium">Sales Revenue</CardTitle>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-col">
                  <div className="text-3xl font-semibold">$5,832</div>
                  <div className="mt-1 text-sm text-gray-500">
                    Your revenue decreased this month by about{' '}
                    <span className="text-red-500">$421</span>
                  </div>
                  <div className="mt-4 h-20">
                    <div className="flex h-full items-end justify-between">
                      <div className="h-[60%] w-1/6 rounded-t-sm bg-gray-200"></div>
                      <div className="h-[80%] w-1/6 rounded-t-sm bg-gray-200"></div>
                      <div className="h-[70%] w-1/6 rounded-t-sm bg-gray-200"></div>
                      <div className="h-[90%] w-1/6 rounded-t-sm bg-gray-200"></div>
                      <div className="h-[65%] w-1/6 rounded-t-sm bg-gray-200"></div>
                      <div className="h-[40%] w-1/6 rounded-t-sm bg-red-500"></div>
                    </div>
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-gray-500">
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start pt-4">
                <h3 className="mb-1 font-medium text-black">Sales Revenue</h3>
                <CardDescription className="text-sm text-gray-500">
                  Allows users to quickly analyze and compare sales data
                </CardDescription>
              </CardFooter>
            </Card>

            {/* Revenue Forecast Widget */}
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">Revenue Forecast</CardTitle>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-col">
                  <div className="text-3xl font-semibold">$3,850</div>
                  <div className="mt-1 text-sm text-gray-500">
                    your estimated income this month is about around{' '}
                    <span className="font-medium">$4,500</span>
                  </div>
                  <div className="mt-4 h-20">
                    <div className="grid h-full grid-cols-6 items-end gap-1">
                      <div className="h-[60%] rounded-sm bg-emerald-400"></div>
                      <div className="h-[80%] rounded-sm bg-emerald-400"></div>
                      <div className="h-[65%] rounded-sm bg-emerald-400"></div>
                      <div className="h-[85%] rounded-sm bg-emerald-400"></div>
                      <div className="h-[70%] rounded-sm bg-emerald-400"></div>
                      <div className="h-[50%] rounded-sm bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start pt-4">
                <h3 className="mb-1 font-medium text-black">Revenue Forecast</h3>
                <CardDescription className="text-sm text-gray-500">
                  Predict future sales based on historical data and current opportunities.
                </CardDescription>
              </CardFooter>
            </Card>
          </div>
        )}

        {activeTab === 'uninstalled' && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Customer Segmentation Widget */}
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">Customer Segmentation</CardTitle>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-col items-center">
                  <div className="relative my-2 h-28 w-28">
                    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-8 border-[#f8bb86]">
                      <div
                        className="absolute inset-0 rounded-full border-8 border-[#ee675c]"
                        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 30%, 0 30%)' }}
                      ></div>
                      <div
                        className="absolute inset-0 rounded-full border-8 border-[#5cba47]"
                        style={{ clipPath: 'polygon(0 30%, 100% 30%, 100% 100%, 0 100%)' }}
                      ></div>
                      <div className="z-10 text-xl font-bold">2,758</div>
                    </div>
                  </div>
                  <div className="mt-2 w-full">
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 h-3 w-3 bg-[#ee675c]"></div>
                        <span className="text-sm">Small Business</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium">1,650</span>
                        <span className="ml-1 text-xs text-green-500">+424</span>
                      </div>
                    </div>
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 h-3 w-3 bg-[#f8bb86]"></div>
                        <span className="text-sm">Enterprise</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium">350</span>
                        <span className="ml-1 text-xs text-green-500">+24</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 h-3 w-3 bg-[#5cba47]"></div>
                        <span className="text-sm">Individuals</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="font-medium">458</span>
                        <span className="ml-1 text-xs text-green-500">+133</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start pt-4">
                <h3 className="mb-1 font-medium text-black">Customer Segmentation</h3>
                <CardDescription className="text-sm text-gray-500">
                  Categorizing and analyzing customers based on various criteria.
                </CardDescription>
              </CardFooter>
            </Card>

            {/* Conversion Rates Widget */}
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-gray-200 p-1">
                      <span className="h-4 w-4 text-gray-600">-</span>
                    </div>
                    <CardTitle className="text-base font-medium">Conversion Rates</CardTitle>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-col">
                  <div className="mb-4">
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 h-3 w-3 bg-green-500"></div>
                        <span className="text-sm font-medium">75.3%</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                        <span className="text-green-500">2,424</span>
                      </div>
                    </div>
                    <Progress value={75} className="h-2 bg-zinc-100 [&>div]:bg-green-500" />
                    <div className="mt-1 flex justify-between text-xs text-zinc-500">
                      <span>12,565 Visitor</span>
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 h-3 w-3 bg-yellow-400"></div>
                        <span className="text-sm font-medium">24.7%</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                        <span className="text-green-500">213</span>
                      </div>
                    </div>
                    <Progress value={25} className="h-2 bg-zinc-100 [&>div]:bg-yellow-400" />
                    <div className="mt-1 flex justify-between text-xs text-zinc-500">
                      <span>1,421 Product sales</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start pt-4">
                <h3 className="mb-1 font-medium text-black">Conversion rates</h3>
                <CardDescription className="text-sm text-gray-500">
                  show different stages of the sales funnel are converting leads into customers.
                </CardDescription>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>

      {/* Goals & Tasks Tracking */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Goals & Tasks Tracking</h2>
        {activeTab === 'all' && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Closed Won Widget */}
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">Closed Won by Type</CardTitle>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-col">
                  <div className="text-3xl font-semibold">$11,680</div>
                  <div className="mt-1 text-sm text-gray-500">
                    this month's total closed won increased from last month's around{' '}
                    <span className="text-green-500">+$6,450</span>
                  </div>
                  <div className="mt-4 h-20">
                    <div className="grid h-full grid-cols-5 items-end gap-2">
                      <div className="h-[30%] rounded-sm bg-blue-200"></div>
                      <div className="h-[45%] rounded-sm bg-blue-300"></div>
                      <div className="h-[70%] rounded-sm bg-blue-400"></div>
                      <div className="h-[40%] rounded-sm bg-blue-300"></div>
                      <div className="h-[60%] rounded-sm bg-blue-400"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start pt-4">
                <h3 className="mb-1 font-medium text-black">Closed Won</h3>
                <CardDescription className="text-sm text-gray-500">
                  detailed information about deals that have been successfully closed by type
                </CardDescription>
              </CardFooter>
            </Card>

            {/* Task Completion Rate Widget */}
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">Task Completion Rate</CardTitle>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-col">
                  <div className="flex items-end gap-2">
                    <div className="text-3xl font-semibold">92%</div>
                    <div className="mb-1 flex items-center text-sm text-green-500">
                      <ArrowUp className="mr-0.5 h-3 w-3" />
                      12%
                    </div>
                  </div>
                  <div className="mt-4">
                    <Progress value={92} className="h-3 bg-zinc-100 [&>div]:bg-green-500" />
                  </div>
                  <div className="mt-4 flex items-center">
                    <div className="mr-2 flex -space-x-2">
                      <Avatar className="h-6 w-6 border-2 border-white">
                        <AvatarFallback className="bg-purple-500 text-xs text-white">
                          JD
                        </AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border-2 border-white">
                        <AvatarFallback className="bg-blue-500 text-xs text-white">
                          AB
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="text-xs text-gray-500">+10</div>
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    Almost all assigned tasks completed on time.
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start pt-4">
                <h3 className="mb-1 font-medium text-black">Task Completion Rate</h3>
                <CardDescription className="text-sm text-gray-500">
                  Display tasks based on their completion rates from highest to lowest
                </CardDescription>
              </CardFooter>
            </Card>

            {/* Sales Targets Widget */}
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">Sales Targets</CardTitle>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="mb-4 flex items-center justify-center">
                  <div className="relative flex h-28 w-28 items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-8 border-gray-100"></div>
                    <div
                      className="absolute inset-0 rounded-full border-8 border-yellow-400"
                      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 80%)' }}
                    ></div>
                    <div className="z-10 text-lg font-bold">80%</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl font-semibold">3,415</span>
                    <span className="text-gray-500">/4,000</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    less than <span className="font-medium text-green-500">20%</span> of your sales
                    target will be achieved.
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start pt-4">
                <h3 className="mb-1 font-medium text-black">Sales Targets</h3>
                <CardDescription className="text-sm text-gray-500">
                  Allow users to effectively manage and track their sales targets
                </CardDescription>
              </CardFooter>
            </Card>

            {/* Top Country Sales Overview Widget */}
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-gray-200 p-1">
                      <span className="h-4 w-4 text-gray-600">-</span>
                    </div>
                    <CardTitle className="text-base font-medium">
                      Top 5 Country Sales Overview
                    </CardTitle>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-col">
                  <div className="text-3xl font-semibold">64,450</div>
                  <div className="mt-1 text-sm text-gray-500">
                    Most of employees complete their jobs on time.
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6">🇺🇸</div>
                      <Progress value={85} className="h-2 flex-1 bg-zinc-100 [&>div]:bg-blue-500" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6">🇩🇪</div>
                      <Progress value={65} className="h-2 flex-1 bg-zinc-100 [&>div]:bg-blue-500" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6">🇮🇹</div>
                      <Progress value={75} className="h-2 flex-1 bg-zinc-100 [&>div]:bg-blue-500" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6">🇧🇷</div>
                      <Progress value={55} className="h-2 flex-1 bg-zinc-100 [&>div]:bg-blue-500" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6">🇳🇱</div>
                      <Progress value={45} className="h-2 flex-1 bg-zinc-100 [&>div]:bg-blue-500" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start pt-4">
                <h3 className="mb-1 font-medium text-black">Top Country Sales Overview</h3>
                <CardDescription className="text-sm text-gray-500">
                  Display the 5 countries with the highest sales revenue.
                </CardDescription>
              </CardFooter>
            </Card>
          </div>
        )}

        {activeTab === 'installed' && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Show only a subset of widgets for "Installed" tab */}
            {/* Task Completion Rate Widget */}
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">Task Completion Rate</CardTitle>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-col">
                  <div className="flex items-end gap-2">
                    <div className="text-3xl font-semibold">92%</div>
                    <div className="mb-1 flex items-center text-sm text-green-500">
                      <ArrowUp className="mr-0.5 h-3 w-3" />
                      12%
                    </div>
                  </div>
                  <div className="mt-4">
                    <Progress value={92} className="h-3 bg-zinc-100 [&>div]:bg-green-500" />
                  </div>
                  <div className="mt-4 flex items-center">
                    <div className="mr-2 flex -space-x-2">
                      <Avatar className="h-6 w-6 border-2 border-white">
                        <AvatarFallback className="bg-purple-500 text-xs text-white">
                          JD
                        </AvatarFallback>
                      </Avatar>
                      <Avatar className="h-6 w-6 border-2 border-white">
                        <AvatarFallback className="bg-blue-500 text-xs text-white">
                          AB
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="text-xs text-gray-500">+10</div>
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    Almost all assigned tasks completed on time.
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start pt-4">
                <h3 className="mb-1 font-medium text-black">Task Completion Rate</h3>
                <CardDescription className="text-gray-500">
                  Display tasks based on their completion rates from highest to lowest
                </CardDescription>
              </CardFooter>
            </Card>

            {/* Sales Targets Widget */}
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">Sales Targets</CardTitle>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="mb-4 flex items-center justify-center">
                  <div className="relative flex h-28 w-28 items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-8 border-gray-100"></div>
                    <div
                      className="absolute inset-0 rounded-full border-8 border-yellow-400"
                      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 80%)' }}
                    ></div>
                    <div className="z-10 text-lg font-bold">80%</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl font-semibold">3,415</span>
                    <span className="text-gray-500">/4,000</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    less than <span className="font-medium text-green-500">20%</span> of your sales
                    target will be achieved.
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start pt-4">
                <h3 className="mb-1 font-medium text-black">Sales Targets</h3>
                <CardDescription className="text-gray-500">
                  Allow users to effectively manage and track their sales targets
                </CardDescription>
              </CardFooter>
            </Card>
          </div>
        )}

        {activeTab === 'uninstalled' && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Show different widgets for "Uninstalled" tab */}
            {/* Closed Won Widget */}
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">Closed Won by Type</CardTitle>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-col">
                  <div className="text-3xl font-semibold">$11,680</div>
                  <div className="mt-1 text-sm text-gray-500">
                    this month's total closed won increased from last month's around{' '}
                    <span className="text-green-500">+$6,450</span>
                  </div>
                  <div className="mt-4 h-20">
                    <div className="grid h-full grid-cols-5 items-end gap-2">
                      <div className="h-[30%] rounded-sm bg-blue-200"></div>
                      <div className="h-[45%] rounded-sm bg-blue-300"></div>
                      <div className="h-[70%] rounded-sm bg-blue-400"></div>
                      <div className="h-[40%] rounded-sm bg-blue-300"></div>
                      <div className="h-[60%] rounded-sm bg-blue-400"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start pt-4">
                <h3 className="mb-1 font-medium text-black">Closed Won</h3>
                <CardDescription className="text-gray-500">
                  detailed information about deals that have been successfully closed by type
                </CardDescription>
              </CardFooter>
            </Card>

            {/* Top Country Sales Overview Widget */}
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-gray-200 p-1">
                      <span className="h-4 w-4 text-gray-600">-</span>
                    </div>
                    <CardTitle className="text-base font-medium">
                      Top 5 Country Sales Overview
                    </CardTitle>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-col">
                  <div className="text-3xl font-semibold">64,450</div>
                  <div className="mt-1 text-sm text-gray-500">
                    Most of employees complete their jobs on time.
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6">🇺🇸</div>
                      <Progress value={85} className="h-2 flex-1 bg-zinc-100 [&>div]:bg-blue-500" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6">🇩🇪</div>
                      <Progress value={65} className="h-2 flex-1 bg-zinc-100 [&>div]:bg-blue-500" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6">🇮🇹</div>
                      <Progress value={75} className="h-2 flex-1 bg-zinc-100 [&>div]:bg-blue-500" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6">🇧🇷</div>
                      <Progress value={55} className="h-2 flex-1 bg-zinc-100 [&>div]:bg-blue-500" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6">🇳🇱</div>
                      <Progress value={45} className="h-2 flex-1 bg-zinc-100 [&>div]:bg-blue-500" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start pt-4">
                <h3 className="mb-1 font-medium text-black">Top Country Sales Overview</h3>
                <CardDescription className="text-gray-500">
                  Display the 5 countries with the highest sales revenue.
                </CardDescription>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
