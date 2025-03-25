"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Filter, Settings, Download, Share2, type LucideIcon, User, Bell, Sun, Edit2, Lock } from "lucide-react"

interface ToolbarItem {
  id: string
  title: string
  icon: LucideIcon
  content?: React.ReactNode
  type?: never
}

interface ToolbarProps {
  className?: string
  activeColor?: string
  onSearch?: (value: string) => void
}

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
}

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
}

const notificationVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: -10 },
  exit: { opacity: 0, y: -20 },
}

const lineVariants = {
  initial: { scaleX: 0, x: "-50%" },
  animate: {
    scaleX: 1,
    x: "0%",
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: {
    scaleX: 0,
    x: "50%",
    transition: { duration: 0.2, ease: "easeIn" },
  },
}

const transition = { type: "spring", bounce: 0, duration: 0.4 }

export function Toolbar({ className, activeColor = "text-primary", onSearch }: ToolbarProps) {
  const [selected, setSelected] = React.useState<string | null>("filter")
  const [isToggled, setIsToggled] = React.useState(false)
  const [activeNotification, setActiveNotification] = React.useState<string | null>(null)
  const outsideClickRef = React.useRef(null)

  const toolbarItems: ToolbarItem[] = [
    {
      id: "filter",
      title: "Chat",
      icon: Filter,
      content: (
        <div className="p-4">
          <p className="text-xs font-medium mb-3">Chat</p>
          <div className="space-y-2">
            <div className="flex items-center">
              <input id="filter-1" type="checkbox" className="mr-2" />
              <label htmlFor="filter-1">Show archived items</label>
            </div>
            <div className="flex items-center">
              <input id="filter-2" type="checkbox" className="mr-2" />
              <label htmlFor="filter-2">Only show favorites</label>
            </div>
            <div className="flex items-center">
              <input id="filter-3" type="checkbox" className="mr-2" />
              <label htmlFor="filter-3">Hide completed</label>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "settings",
      title: "Search",
      icon: Settings,
      content: (
        <div className="p-4">
          <h3 className="text-xs font-medium mb-3">Search</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Dark Mode</span>
              <div className="w-10 h-5 bg-gray-200 rounded-full relative">
                <div className="absolute w-4 h-4 bg-white rounded-full top-0.5 left-0.5"></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Notifications</span>
              <div className="w-10 h-5 bg-primary rounded-full relative">
                <div className="absolute w-4 h-4 bg-white rounded-full top-0.5 right-0.5"></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "download",
      title: "Download",
      icon: Download,
      content: (
        <div className="p-4">
          <h3 className="text-lg font-medium mb-3">Download Options</h3>
          <div className="space-y-3">
            <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg">Download as PDF</button>
            <button className="w-full py-2 bg-gray-100 text-gray-800 rounded-lg">Download as CSV</button>
            <button className="w-full py-2 bg-gray-100 text-gray-800 rounded-lg">Download as Excel</button>
          </div>
        </div>
      ),
    },
    {
      id: "share",
      title: "Share",
      icon: Share2,
      content: (
        <div className="p-4">
          <h3 className="text-xs font-medium mb-3">Share</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value="https://example.com/share/abc123"
                readOnly
                className="flex-1 p-2 border rounded-lg text-sm"
              />
              <button className="p-2 bg-primary text-primary-foreground rounded-lg">Copy</button>
            </div>
            <div className="flex justify-center space-x-4 mt-3">
              <button className="p-2 bg-blue-500 text-white rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </button>
              <button className="p-2 bg-blue-700 text-white rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </button>
              <button className="p-2 bg-pink-600 text-white rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: Bell,
      content: (
        <div className="p-4">
          <h3 className="text-lg font-medium mb-3">Notifications</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium">New message</div>
              <div className="text-sm text-gray-500">John sent you a message</div>
              <div className="text-xs text-gray-400 mt-1">2 minutes ago</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium">System update</div>
              <div className="text-sm text-gray-500">Your system has been updated</div>
              <div className="text-xs text-gray-400 mt-1">1 hour ago</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "profile",
      title: "Profile",
      icon: User,
      content: (
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={20} />
            </div>
            <div>
              <div className="font-medium">John Doe</div>
              <div className="text-sm text-gray-500">john.doe@example.com</div>
            </div>
          </div>
          <div className="space-y-2">
            <button className="w-full py-2 text-left">Edit Profile</button>
            <button className="w-full py-2 text-left">Account Settings</button>
            <button className="w-full py-2 text-left">Privacy</button>
            <button className="w-full py-2 text-left text-red-500">Logout</button>
          </div>
        </div>
      ),
    },
    {
      id: "theme",
      title: "Theme",
      icon: Sun,
      content: (
        <div className="p-4">
          <h3 className="text-lg font-medium mb-3">Theme Settings</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 bg-white border rounded-lg">
              <div className="h-10 bg-gray-100 rounded mb-2"></div>
              <div className="text-sm">Light</div>
            </button>
            <button className="p-3 bg-gray-900 border border-gray-700 rounded-lg">
              <div className="h-10 bg-gray-800 rounded mb-2"></div>
              <div className="text-sm text-white">Dark</div>
            </button>
            <button className="p-3 bg-blue-50 border rounded-lg">
              <div className="h-10 bg-blue-100 rounded mb-2"></div>
              <div className="text-sm">Blue</div>
            </button>
            <button className="p-3 bg-green-50 border rounded-lg">
              <div className="h-10 bg-green-100 rounded mb-2"></div>
              <div className="text-sm">Green</div>
            </button>
          </div>
        </div>
      ),
    },
  ]

  const handleItemClick = (itemId: string) => {
    setSelected(selected === itemId ? null : itemId)
    setActiveNotification(itemId)
    setTimeout(() => setActiveNotification(null), 1500)
  }

  return (
    <div className="flex flex-col justify-center w-full space-y-4 mt-8">
      <div
        ref={outsideClickRef}
        className={cn(
          "flex items-center gap-3 p-2 relative",
          "bg-background",
          "border rounded-md",
          "transition-all duration-200",
          "max-w-fit mx-auto",
          "shadow-lg",
          className,
        )}
      >
        <AnimatePresence>
          {activeNotification && (
            <motion.div
              variants={notificationVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-50"
            >
              <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs">
                {toolbarItems.find((item) => item.id === activeNotification)?.title} clicked!
              </div>
              <motion.div
                variants={lineVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute -bottom-1 left-1/2 w-full h-[2px] bg-primary origin-left"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2">
          {toolbarItems.map((item) => (
            <motion.button
              key={item.id}
              variants={buttonVariants}
              initial={false}
              animate="animate"
              custom={selected === item.id}
              onClick={() => handleItemClick(item.id)}
              transition={transition}
              className={cn(
                "relative flex items-center rounded-none px-3 py-2",
                "text-xs font-medium transition-colors duration-300",
                selected === item.id
                  ? "bg-[#f4f4f5] text-zinc-600 rounded-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon size={16} className={cn(selected === item.id && "text-zinc-600")} />
              <AnimatePresence initial={false}>
                {selected === item.id && (
                  <motion.span
                    variants={spanVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={transition}
                    className="overflow-hidden"
                  >
                    {item.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          ))}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsToggled(!isToggled)}
            className="flex items-center gap-2 px-4 py-2
                            bg-primary text-primary-foreground
                            rounded-md 
                            border border-primary/30
                            shadow-sm 
                            transition-all duration-200
                            hover:shadow-md 
                            hover:bg-primary/90
                            hover:border-primary/40
                            active:border-primary/50"
          >
            {isToggled ? <Edit2 className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
            <span className="text-sm font-medium">{isToggled ? "On" : "Off"}</span>
          </motion.button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="border rounded-md p-2 max-w-md mx-auto w-full bg-background"
          >
            {toolbarItems.find((item) => item.id === selected)?.content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Toolbar

