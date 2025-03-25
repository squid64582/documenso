'use client'

import { AuthDialog } from '@/components/auth-dialog'
import { Chat } from '@/components/chat'
import { ChatInput } from '@/components/chat-input'
import { ChatPicker } from '@/components/chat-picker'
import { ChatSettings } from '@/components/chat-settings'
import V0Clone from '@/components/code/v0-clone'
import Logo from '@/components/logo'
import { NavBar } from '@/components/navbar'
import {
  NavigationProvider,
  useNavigation,
} from '@/components/navigation/NavigationContext'
import { Preview } from '@/components/preview'
import { RepoBanner } from '@/components/repo-banner'
import { Toolbar } from '@/components/toolbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { IconSidebar } from '@/components/vertical-sidebar'
import { AuthViewType, useAuth } from '@/lib/auth'
import { Message, toAISDKMessages, toMessageImage } from '@/lib/messages'
import { LLMModelConfig } from '@/lib/models'
import modelsList from '@/lib/models.json'
import { FragmentSchema, fragmentSchema as schema } from '@/lib/schema'
import { supabase } from '@/lib/supabase'
import templates, { TemplateId } from '@/lib/templates'
import { ExecutionResult } from '@/lib/types'
import {
  RiShieldCheckLine,
  RiChat4Line,
  RiSearchLine,
  RiCodeAiLine,
  RiFileList3Line,
  RiFileList2Line,
  RiFileEditLine,
  RiFileLine,
  RiStickyNoteLine,
  RiFile3Line,
  RiGovernmentLine,
  RiRadarLine,
  RiFundsBoxLine,
  RiFundsLine,
} from '@remixicon/react'
import { DeepPartial } from 'ai'
import { experimental_useObject as useObject } from 'ai/react'
import { usePostHog } from 'posthog-js/react'
import { SetStateAction, useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'

export default function Home() {
  const [chatInput, setChatInput] = useLocalStorage('chat', '')
  const [files, setFiles] = useState<File[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<'auto' | TemplateId>(
    'auto',
  )
  const [languageModel, setLanguageModel] = useLocalStorage<LLMModelConfig>(
    'languageModel',
    {
      model: 'claude-3-5-sonnet-latest',
    },
  )

  const posthog = usePostHog()

  const [result, setResult] = useState<ExecutionResult>()
  const [messages, setMessages] = useState<Message[]>([])
  const [fragment, setFragment] = useState<DeepPartial<FragmentSchema>>()
  const [currentTab, setCurrentTab] = useState<'code' | 'fragment'>('code')
  const [isPreviewLoading, setIsPreviewLoading] = useState(false)
  const [isAuthDialogOpen, setAuthDialog] = useState(false)
  const [authView, setAuthView] = useState<AuthViewType>('sign_in')
  const [isRateLimited, setIsRateLimited] = useState(false)
  const { session, apiKey } = useAuth(setAuthDialog, setAuthView)

  const filteredModels = modelsList.models.filter((model) => {
    if (process.env.NEXT_PUBLIC_HIDE_LOCAL_MODELS) {
      return model.providerId !== 'ollama'
    }
    return true
  })

  const currentModel = filteredModels.find(
    (model) => model.id === languageModel.model,
  )
  const currentTemplate =
    selectedTemplate === 'auto'
      ? templates
      : { [selectedTemplate]: templates[selectedTemplate] }
  const lastMessage = messages[messages.length - 1]

  const { object, submit, isLoading, stop, error } = useObject({
    api: '/api/chat',
    schema,
    onError: (error) => {
      if (error.message.includes('request limit')) {
        setIsRateLimited(true)
      }
    },
    onFinish: async ({ object: fragment, error }) => {
      if (!error) {
        // send it to /api/sandbox
        console.log('fragment', fragment)
        setIsPreviewLoading(true)
        posthog.capture('fragment_generated', {
          template: fragment?.template,
        })

        const response = await fetch('/api/sandbox', {
          method: 'POST',
          body: JSON.stringify({
            fragment,
            userID: session?.user?.id,
            apiKey,
          }),
        })

        const result = await response.json()
        console.log('result', result)
        posthog.capture('sandbox_created', { url: result.url })

        setResult(result)
        setCurrentPreview({ fragment, result })
        setMessage({ result })
        setCurrentTab('fragment')
        setIsPreviewLoading(false)
      }
    },
  })

  useEffect(() => {
    if (object) {
      setFragment(object)
      const content: Message['content'] = [
        { type: 'text', text: object.commentary || '' },
        { type: 'code', text: object.code || '' },
      ]

      if (!lastMessage || lastMessage.role !== 'assistant') {
        addMessage({
          role: 'assistant',
          content,
          object,
        })
      }

      if (lastMessage && lastMessage.role === 'assistant') {
        setMessage({
          content,
          object,
        })
      }
    }
  }, [object])

  useEffect(() => {
    if (error) stop()
  }, [error])

  useEffect(() => {
    // Check if there's landing page data in the URL or localStorage
    if (typeof window !== 'undefined') {
      console.log('Checking for landing page data')

      // List all localStorage keys for debugging
      const allKeys = Object.keys(localStorage)
      console.log('All localStorage keys:', allKeys)

      // Check URL parameters first
      const urlParams = new URLSearchParams(window.location.search)
      const encodedData = urlParams.get('data')
      const fromLocalStorageParam = urlParams.get('fromLocalStorage')

      console.log(
        'URL params found:',
        !!encodedData || fromLocalStorageParam === 'true',
      )

      let parsedData = null
      let templateCode = null

      // Try to get data from URL params
      if (encodedData) {
        try {
          parsedData = JSON.parse(decodeURIComponent(encodedData))
          console.log('Parsed URL data:', parsedData)

          // Get template code directly from URL params if available
          if (parsedData.t) {
            templateCode = parsedData.t
            console.log('Template code found in URL params:', !!templateCode)
          }

          // If the data indicates we should get template from localStorage
          if (parsedData.fromLocalStorage) {
            // Try both possible localStorage keys
            let landingPageData = localStorage.getItem('soom_landing_page_data')
            if (!landingPageData) {
              landingPageData = localStorage.getItem(
                'documenso_landing_page_data',
              )
            }

            console.log(
              'Found localStorage data:',
              landingPageData ? 'yes' : 'no',
            )

            if (landingPageData) {
              try {
                const localData = JSON.parse(landingPageData)
                console.log('Parsed localStorage data')

                // Get the template code from localStorage
                templateCode = localData.templateCode
                console.log(
                  'Template code found in localStorage:',
                  !!templateCode,
                )

                // Use the prompt from localStorage if available
                if (localData.prompt) {
                  parsedData.p = localData.prompt
                }
              } catch (error) {
                console.error('Error parsing localStorage data:', error)
              }
            }
          }
        } catch (error) {
          console.error('Error parsing URL data:', error)
        }
      }

      // Process the data if we found it
      if (parsedData && parsedData.templateId) {
        try {
          console.log('Fetching template code for ID:', parsedData.templateId)

          // Fetch the template code from our API
          const fetchTemplateCode = async () => {
            const response = await fetch(
              `/api/landing-page-template?id=${parsedData.templateId}`,
            )

            if (response.ok) {
              const data = await response.json()
              templateCode = data.templateCode
              console.log('Template code fetched successfully')

              // Now that we have the template code, set up the chat
              setupChatWithTemplate(parsedData, templateCode)
            } else {
              console.error(
                'Failed to fetch template code:',
                await response.text(),
              )
            }
          }

          fetchTemplateCode()
        } catch (error) {
          console.error('Error fetching template code:', error)
        }
      } else if (parsedData) {
        // If we have parsedData but no templateId, still set up the chat
        setupChatWithTemplate(parsedData, templateCode)
      }
    }
  }, [])

  // Helper function to set up the chat with template
  function setupChatWithTemplate(
    parsedData: { p: string; [key: string]: any },
    templateCode: string | null,
  ) {
    try {
      const { p: prompt } = parsedData

      // Set the template to a valid value
      setSelectedTemplate('auto')

      // Set the chat input - include the template code directly in the prompt if available
      const chatInputText = templateCode
        ? `${prompt}\n\nUse this landing page template code as reference:\n\`\`\`\n${templateCode}\n\`\`\``
        : prompt

      setChatInput(chatInputText)

      console.log('Set chat input with prompt and template code')

      // Auto-submit the form after a short delay
      const timer = setTimeout(() => {
        console.log('Attempting to auto-submit form')
        const form = document.querySelector('form')
        if (form) {
          console.log('Form found, dispatching submit event')

          // Get the submit button and click it
          const submitButton = form.querySelector(
            'button[type="submit"]',
          ) as HTMLButtonElement
          if (submitButton) {
            console.log('Submit button found, clicking it')
            submitButton.click()
          } else {
            console.log('Submit button not found, trying event dispatch')
            const submitEvent = new Event('submit', {
              cancelable: true,
              bubbles: true,
            })
            form.dispatchEvent(submitEvent)
          }
        } else {
          console.log('Form not found')
        }
      }, 1500) // Increased timeout to ensure form is ready

      return () => clearTimeout(timer)
    } catch (error) {
      console.error('Error processing data:', error)
    }
  }

  function setMessage(message: Partial<Message>, index?: number) {
    setMessages((previousMessages) => {
      const updatedMessages = [...previousMessages]
      updatedMessages[index ?? previousMessages.length - 1] = {
        ...previousMessages[index ?? previousMessages.length - 1],
        ...message,
      }

      return updatedMessages
    })
  }

  async function handleSubmitAuth(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!session) {
      return setAuthDialog(true)
    }

    if (isLoading) {
      stop()
    }

    const content: Message['content'] = [{ type: 'text', text: chatInput }]
    const images = await toMessageImage(files)

    if (images.length > 0) {
      images.forEach((image) => {
        content.push({ type: 'image', image })
      })
    }

    const updatedMessages = addMessage({
      role: 'user',
      content,
    })

    submit({
      userID: session?.user?.id,
      messages: toAISDKMessages(updatedMessages),
      template: currentTemplate,
      model: currentModel,
      config: languageModel,
    })

    setChatInput('')
    setFiles([])
    setCurrentTab('code')

    posthog.capture('chat_submit', {
      template: selectedTemplate,
      model: languageModel.model,
    })
  }

  function retry() {
    submit({
      userID: session?.user?.id,
      messages: toAISDKMessages(messages),
      template: currentTemplate,
      model: currentModel,
      config: languageModel,
    })
  }

  function addMessage(message: Message) {
    setMessages((previousMessages) => [...previousMessages, message])
    return [...messages, message]
  }

  function handleSaveInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setChatInput(e.target.value)
  }

  function handleFileChange(change: SetStateAction<File[]>) {
    setFiles(change)
  }

  function logout() {
    supabase
      ? supabase.auth.signOut()
      : console.warn('Supabase is not initialized')
  }

  function handleLanguageModelChange(e: LLMModelConfig) {
    setLanguageModel({ ...languageModel, ...e })
  }

  function handleSocialClick(target: 'github' | 'x' | 'discord') {
    if (target === 'github') {
      window.open('https://github.com/e2b-dev/fragments', '_blank')
    } else if (target === 'x') {
      window.open('https://x.com/e2b_dev', '_blank')
    } else if (target === 'discord') {
      window.open('https://discord.gg/U7KEcGErtQ', '_blank')
    }

    posthog.capture(`${target}_click`)
  }

  function handleClearChat() {
    stop()
    setChatInput('')
    setFiles([])
    setMessages([])
    setFragment(undefined)
    setResult(undefined)
    setCurrentTab('code')
    setIsPreviewLoading(false)
  }

  function setCurrentPreview(preview: {
    fragment: DeepPartial<FragmentSchema> | undefined
    result: ExecutionResult | undefined
  }) {
    setFragment(preview.fragment)
    setResult(preview.result)
  }

  function handleUndo() {
    setMessages((previousMessages) => [...previousMessages.slice(0, -2)])
    setCurrentPreview({ fragment: undefined, result: undefined })
  }

  return (
    <div className="flex flex-col h-full w-full">
      {supabase && (
        <AuthDialog
          open={isAuthDialogOpen}
          setOpen={setAuthDialog}
          view={authView}
          supabase={supabase}
        />
      )}
      <div className="grid w-full h-full md:grid-cols-2">
        <div
          className={`flex flex-col w-full h-full max-w-[800px] mx-auto px-4 overflow-auto ${fragment ? 'col-span-1' : 'col-span-2'}`}
        >
          <Tabs
            defaultValue="code"
            className="w-full mt-4 mb-8 flex flex-col h-full"
          >
            <div className="flex justify-center w-full">
              <TabsList className="rounded-md cursor-pointer">
                <TabsTrigger value="chat" className="rounded-sm text-xs">
                  <RiChat4Line className="w-3 h-3 mr-1" />
                  Chat
                </TabsTrigger>
                <TabsTrigger value="search" className="rounded-sm text-xs">
                  <RiRadarLine className="w-3 h-3 mr-1" />
                  Search
                </TabsTrigger>
                <TabsTrigger value="documents" className="rounded-sm text-xs">
                  <RiFile3Line className="w-3 h-3 mr-1" />
                  Documents
                </TabsTrigger>
                <TabsTrigger value="code" className="rounded-sm text-xs">
                  <RiCodeAiLine className="w-3 h-3 mr-1" />
                  Code
                </TabsTrigger>
                <TabsTrigger value="marketing" className="rounded-sm text-xs">
                  <RiFundsLine className="w-3 h-3 mr-1" />
                  Marketing
                </TabsTrigger>
                <TabsTrigger value="legal" className="rounded-sm text-xs">
                  <RiGovernmentLine className="w-3 h-3 mr-1" />
                  Legal
                </TabsTrigger>
                <TabsTrigger value="sentinel" className="rounded-sm text-xs">
                  <RiShieldCheckLine className="w-3 h-3 mr-1" />
                  Sentinel
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="chat" className="w-full mt-2"></TabsContent>
            <TabsContent value="search"></TabsContent>
            <TabsContent value="documents"></TabsContent>
            <TabsContent
              value="code"
              className="w-full mt-2 flex flex-col h-full"
            >
              {messages.length === 0 ? <V0Clone /> : null}
              <div className="flex-1 overflow-auto mt-4">
                <Chat
                  messages={messages}
                  isLoading={isLoading}
                  setCurrentPreview={setCurrentPreview}
                />
              </div>
              <div className="absolute bottom-0 items-center justify-center mx-auto px-8 max-w-[800px] w-full">
                <ChatInput
                  retry={retry}
                  isErrored={error !== undefined}
                  isLoading={isLoading}
                  isRateLimited={isRateLimited}
                  stop={stop}
                  input={chatInput}
                  handleInputChange={handleSaveInputChange}
                  handleSubmit={handleSubmitAuth}
                  isMultiModal={currentModel?.multiModal || false}
                  files={files}
                  handleFileChange={handleFileChange}
                >
                  <ChatPicker
                    templates={templates}
                    selectedTemplate={selectedTemplate}
                    onSelectedTemplateChange={setSelectedTemplate}
                    models={filteredModels}
                    languageModel={languageModel}
                    onLanguageModelChange={handleLanguageModelChange}
                  />
                  <ChatSettings
                    languageModel={languageModel}
                    onLanguageModelChange={handleLanguageModelChange}
                    apiKeyConfigurable={
                      !process.env.NEXT_PUBLIC_NO_API_KEY_INPUT
                    }
                    baseURLConfigurable={
                      !process.env.NEXT_PUBLIC_NO_BASE_URL_INPUT
                    }
                  />
                </ChatInput>
              </div>
            </TabsContent>
            <TabsContent value="marketing"></TabsContent>
            <TabsContent value="legal"></TabsContent>
            <TabsContent value="sentinel"></TabsContent>
          </Tabs>
        </div>
        {fragment && (
          <Preview
            apiKey={apiKey}
            selectedTab={currentTab}
            onSelectedTabChange={setCurrentTab}
            isChatLoading={isLoading}
            isPreviewLoading={isPreviewLoading}
            fragment={fragment}
            result={result as ExecutionResult}
            onClose={() => setFragment(undefined)}
          />
        )}
      </div>
    </div>
  )
}
