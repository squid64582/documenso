'use client'

import { useNavigation } from './navigation/NavigationContext'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  RiRainbowLine,
  RiChat4Line,
  RiTeamLine,
  RiRobot2Line,
  RiFolder5Line,
  RiGitForkLine,
  RiToolsFill,
} from '@remixicon/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as React from 'react'

// This is sample data
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Chatspace',
      url: '/',
      icon: RiChat4Line,
      isActive: true,
    },
    {
      title: 'Teamspaces',
      url: '/teamspaces',
      icon: RiTeamLine,
      isActive: false,
    },
    {
      title: 'Employees',
      url: '/employees',
      icon: RiRobot2Line,
      isActive: false,
    },
    {
      title: 'Files',
      url: '/files',
      icon: RiFolder5Line,
      isActive: false,
    },
    {
      title: 'Workflows',
      url: '/workflows',
      icon: RiGitForkLine,
      isActive: false,
    },
    {
      title: 'Integrations',
      url: '/integrations',
      icon: RiToolsFill,
      isActive: false,
    },
  ],
}

export function IconSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter()
  const { activeItem, setActiveItem } = useNavigation()
  const { setOpen } = useSidebar()

  const handleNavigation = (
    path: string,
    item:
      | 'chatspace'
      | 'teamspaces'
      | 'employees'
      | 'files'
      | 'workflows'
      | 'integrations',
  ) => {
    setActiveItem(item)
    router.push(path)
  }

  return (
    <Sidebar
      side="left"
      collapsible="none"
      className="border-r bg-zinc-50 z-50 relative w-12 shrink-0 flex-shrink-0"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/">
              <SidebarMenuButton size="lg" className="md:h-8 md:p-0 !size-8">
                <div className="flex aspect-square size-8 items-center justify-center rounded-sm bg-rose-600 text-sidebar-primary-foreground">
                  <div className="size-4 text-white items-center justify-center">
                    <RiRainbowLine className="w-full h-full"/>
                  </div>
                </div>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-1.5 md:px-0">
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={{
                      children: item.title,
                      hidden: false,
                    }}
                    onClick={() =>
                      handleNavigation(
                        item.url,
                        item.title.toLowerCase().replace(' ', '') as
                          | 'chatspace'
                          | 'teamspaces'
                          | 'employees'
                          | 'files'
                          | 'workflows'
                          | 'integrations',
                      )
                    }
                    isActive={
                      item.title.toLowerCase().replace(' ', '') === activeItem
                    }
                    className="px-2.5 md:px-2 [&>svg]:data-[active=true]:text-rose-600 relative z-50"
                  >
                    <item.icon size={16} />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="md:h-8 md:p-0">
              <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-muted">
                <img
                  src={data.user.avatar}
                  alt={data.user.name}
                  className="size-8 rounded-full"
                />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
