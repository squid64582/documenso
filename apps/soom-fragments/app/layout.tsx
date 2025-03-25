import './globals.css'
import { PostHogProvider, ThemeProvider } from './providers'
import { NavigationProvider } from '@/components/navigation/NavigationContext'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/toaster'
import { IconSidebar } from '@/components/vertical-sidebar'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Code by Soom',
  description: "Open-source version of Anthropic's Artifacts",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <PostHogProvider>
        <body className={GeistSans.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <NavigationProvider>
                <div className="flex h-screen w-screen overflow-hidden">
                  <IconSidebar />
                  <div className="flex-1 overflow-auto">{children}</div>
                </div>
              </NavigationProvider>
            </SidebarProvider>
          </ThemeProvider>
          <Toaster />
        </body>
      </PostHogProvider>
    </html>
  )
}
