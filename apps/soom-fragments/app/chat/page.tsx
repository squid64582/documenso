'use client'

import { AuthDialog } from '@/components/auth-dialog'
import { Chat } from '@/components/chat'
import { ChatInput } from '@/components/chat-input'
import { ChatPicker } from '@/components/chat-picker'
import { ChatSettings } from '@/components/chat-settings'
import V0Clone from '@/components/code/v0-clone'
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
import { useChat } from '@/lib/chat'
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
  RiCodeAiLine,
  RiFile3Line,
  RiGovernmentLine,
  RiRadarLine,
  RiFundsLine,
  RiImageLine,
  RiVideoLine,
  RiAiGenerate,
} from '@remixicon/react'
import { DeepPartial } from 'ai'
import { experimental_useObject as useObject } from 'ai/react'
import { usePostHog } from 'posthog-js/react'
import {
  SetStateAction,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react'
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

  const [chatTabInput, setChatTabInput] = useLocalStorage('chat-tab-input', '')
  const [chatTabFiles, setChatTabFiles] = useState<File[]>([])
  const [chatTabMessages, setChatTabMessages] = useState<Message[]>([])
  const [chatTabFragment, setChatTabFragment] =
    useState<DeepPartial<FragmentSchema>>()
  const [chatTabResult, setChatTabResult] = useState<ExecutionResult>()

  const [codeTabInput, setCodeTabInput] = useLocalStorage('code-tab-input', '')
  const [codeTabFiles, setCodeTabFiles] = useState<File[]>([])
  const [codeTabMessages, setCodeTabMessages] = useState<Message[]>([])
  const [codeTabFragment, setCodeTabFragment] =
    useState<DeepPartial<FragmentSchema>>()
  const [codeTabResult, setCodeTabResult] = useState<ExecutionResult>()

  const [marketingTabInput, setMarketingTabInput] = useLocalStorage(
    'marketing-tab-input',
    '',
  )
  const [marketingTabFiles, setMarketingTabFiles] = useState<File[]>([])
  const [marketingTabMessages, setMarketingTabMessages] = useState<Message[]>(
    [],
  )
  const [marketingTabFragment, setMarketingTabFragment] =
    useState<DeepPartial<FragmentSchema>>()
  const [marketingTabResult, setMarketingTabResult] =
    useState<ExecutionResult>()

  const [activeTab, setActiveTab] = useState<string>('chat')

  // Search tab state
  const [searchTabInput, setSearchTabInput] = useLocalStorage(
    'search-tab-input',
    '',
  )
  const [searchTabFiles, setSearchTabFiles] = useState<File[]>([])
  const [searchTabMessages, setSearchTabMessages] = useState<Message[]>([])
  const [searchTabFragment, setSearchTabFragment] =
    useState<DeepPartial<FragmentSchema>>()
  const [searchTabResult, setSearchTabResult] = useState<ExecutionResult>()

  // Documents tab state
  const [documentsTabInput, setDocumentsTabInput] = useLocalStorage(
    'documents-tab-input',
    '',
  )
  const [documentsTabFiles, setDocumentsTabFiles] = useState<File[]>([])
  const [documentsTabMessages, setDocumentsTabMessages] = useState<Message[]>(
    [],
  )
  const [documentsTabFragment, setDocumentsTabFragment] =
    useState<DeepPartial<FragmentSchema>>()
  const [documentsTabResult, setDocumentsTabResult] =
    useState<ExecutionResult>()

  // Legal tab state
  const [legalTabInput, setLegalTabInput] = useLocalStorage(
    'legal-tab-input',
    '',
  )
  const [legalTabFiles, setLegalTabFiles] = useState<File[]>([])
  const [legalTabMessages, setLegalTabMessages] = useState<Message[]>([])
  const [legalTabFragment, setLegalTabFragment] =
    useState<DeepPartial<FragmentSchema>>()
  const [legalTabResult, setLegalTabResult] = useState<ExecutionResult>()

  // Sentinel tab state
  const [sentinelTabInput, setSentinelTabInput] = useLocalStorage(
    'sentinel-tab-input',
    '',
  )
  const [sentinelTabFiles, setSentinelTabFiles] = useState<File[]>([])
  const [sentinelTabMessages, setSentinelTabMessages] = useState<Message[]>([])
  const [sentinelTabFragment, setSentinelTabFragment] =
    useState<DeepPartial<FragmentSchema>>()
  const [sentinelTabResult, setSentinelTabResult] = useState<ExecutionResult>()

  const [showImageGenerationModal, setShowImageGenerationModal] =
    useState(false)
  const [imageGenerationPrompt, setImageGenerationPrompt] = useState('')

  const filteredModels = modelsList.models.filter((model) => {
    if (process.env.NEXT_PUBLIC_HIDE_LOCAL_MODELS) {
      return model.providerId !== 'ollama'
    }
    return true
  })

  const currentModel = filteredModels.find(
    (model) => model.id === languageModel.model,
  )
  const currentTemplate = useMemo(
    () =>
      selectedTemplate === 'auto'
        ? templates
        : { [selectedTemplate]: templates[selectedTemplate] },
    [selectedTemplate],
  )
  const lastMessage = messages[messages.length - 1]

  const codeApi = useObject({
    api: '/api/chat',
    schema,
    onError: (error) => {
      if (error.message.includes('request limit')) {
        setIsRateLimited(true)
      }
    },
    onFinish: async ({ object: fragment, error }) => {
      if (!error) {
        console.log('code fragment', fragment)
        setIsPreviewLoading(true)
        posthog.capture('code_fragment_generated', {
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
        setCodeTabResult(result)
        setCodeTabFragment(fragment)
        setFragment(fragment)
        setCurrentTab('fragment')
        setIsPreviewLoading(false)
      }
    },
  })

  const chatTabApi = useChat({
    api: '/api/chat-tab',
    onError: (error: Error) => {
      if (error.message.includes('request limit')) {
        setIsRateLimited(true)
      }
    },
  })

  const marketingApi = useObject({
    api: '/api/chat',
    schema,
    onError: (error) => {
      if (error.message.includes('request limit')) {
        setIsRateLimited(true)
      }
    },
    onFinish: async ({ object: fragment, error }) => {
      if (!error) {
        console.log('marketing fragment', fragment)
        setIsPreviewLoading(true)
        posthog.capture('marketing_fragment_generated', {
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
        setMarketingTabResult(result)
        setMarketingTabFragment(fragment)
        setCurrentTab('fragment')
        setIsPreviewLoading(false)
      }
    },
  })

  // Documents tab API
  const documentsApi = useObject({
    api: '/api/chat',
    schema,
    onError: (error) => {
      if (error.message.includes('request limit')) {
        setIsRateLimited(true)
      }
    },
    onFinish: async ({ object: fragment, error }) => {
      if (!error) {
        console.log('documents fragment', fragment)
        setIsPreviewLoading(true)

        const response = await fetch('/api/sandbox', {
          method: 'POST',
          body: JSON.stringify({
            fragment,
            userID: session?.user?.id,
            apiKey,
          }),
        })

        const result = await response.json()
        setDocumentsTabResult(result)
        setDocumentsTabFragment(fragment)
        setCurrentTab('fragment')
        setIsPreviewLoading(false)
      }
    },
  })

  // Legal tab API
  const legalApi = useObject({
    api: '/api/chat',
    schema,
    onError: (error) => {
      if (error.message.includes('request limit')) {
        setIsRateLimited(true)
      }
    },
    onFinish: async ({ object: fragment, error }) => {
      if (!error) {
        console.log('legal fragment', fragment)
        setIsPreviewLoading(true)

        const response = await fetch('/api/sandbox', {
          method: 'POST',
          body: JSON.stringify({
            fragment,
            userID: session?.user?.id,
            apiKey,
          }),
        })

        const result = await response.json()
        setLegalTabResult(result)
        setLegalTabFragment(fragment)
        setCurrentTab('fragment')
        setIsPreviewLoading(false)
      }
    },
  })

  // Sentinel tab API
  const sentinelApi = useObject({
    api: '/api/chat',
    schema,
    onError: (error) => {
      if (error.message.includes('request limit')) {
        setIsRateLimited(true)
      }
    },
    onFinish: async ({ object: fragment, error }) => {
      if (!error) {
        console.log('sentinel fragment', fragment)
        setIsPreviewLoading(true)

        const response = await fetch('/api/sandbox', {
          method: 'POST',
          body: JSON.stringify({
            fragment,
            userID: session?.user?.id,
            apiKey,
          }),
        })

        const result = await response.json()
        setSentinelTabResult(result)
        setSentinelTabFragment(fragment)
        setCurrentTab('fragment')
        setIsPreviewLoading(false)
      }
    },
  })

  // Search tab API
  const searchApi = useObject({
    api: '/api/chat',
    schema,
    onError: (error) => {
      if (error.message.includes('request limit')) {
        setIsRateLimited(true)
      }
    },
    onFinish: async ({ object: fragment, error }) => {
      if (!error) {
        console.log('search fragment', fragment)
        setIsPreviewLoading(true)

        const response = await fetch('/api/sandbox', {
          method: 'POST',
          body: JSON.stringify({
            fragment,
            userID: session?.user?.id,
            apiKey,
          }),
        })

        const result = await response.json()
        setSearchTabResult(result)
        setSearchTabFragment(fragment)
        setCurrentTab('fragment')
        setIsPreviewLoading(false)
      }
    },
  })

  // Chat tab helpers
  const addChatTabMessage = useCallback((message: Message) => {
    let updatedMessages: Message[] = []
    setChatTabMessages((prev) => {
      updatedMessages = [...prev, message]
      return updatedMessages
    })
    return updatedMessages
  }, [])

  const setChatTabMessage = useCallback(
    (message: Partial<Message>, index?: number) => {
      setChatTabMessages((prev) => {
        const updatedMessages = [...prev]
        updatedMessages[index ?? prev.length - 1] = {
          ...prev[index ?? prev.length - 1],
          ...message,
        }
        return updatedMessages
      })
    },
    [],
  )

  // Code tab helpers
  const addCodeTabMessage = useCallback((message: Message) => {
    let updatedMessages: Message[] = []
    setCodeTabMessages((previousMessages) => {
      updatedMessages = [...previousMessages, message]
      return updatedMessages
    })
    return updatedMessages
  }, [])

  const setCodeTabMessage = useCallback(
    (message: Partial<Message>, index?: number) => {
      setCodeTabMessages((previousMessages) => {
        const updatedMessages = [...previousMessages]
        updatedMessages[index ?? previousMessages.length - 1] = {
          ...previousMessages[index ?? previousMessages.length - 1],
          ...message,
        }
        return updatedMessages
      })
    },
    [],
  )

  // Search tab helpers
  const addSearchTabMessage = useCallback((message: Message) => {
    let updatedMessages: Message[] = []
    setSearchTabMessages((previousMessages) => {
      updatedMessages = [...previousMessages, message]
      return updatedMessages
    })
    return updatedMessages
  }, [])

  const setSearchTabMessage = useCallback(
    (message: Partial<Message>, index?: number) => {
      setSearchTabMessages((previousMessages) => {
        const updatedMessages = [...previousMessages]
        updatedMessages[index ?? previousMessages.length - 1] = {
          ...previousMessages[index ?? previousMessages.length - 1],
          ...message,
        }
        return updatedMessages
      })
    },
    [],
  )

  useEffect(() => {
    if (codeApi.object) {
      console.log('code fragment', codeApi.object)
      setIsPreviewLoading(true)
      setCodeTabFragment(codeApi.object)
      setFragment(codeApi.object)

      const content: Message['content'] = [
        { type: 'text', text: codeApi.object.commentary || '' },
        { type: 'code', text: codeApi.object.code || '' },
      ]

      // Check if we need to add a new message or update existing
      if (
        !codeTabMessages.length ||
        codeTabMessages[codeTabMessages.length - 1].role !== 'assistant'
      ) {
        // Add new assistant message
        const newMessage = {
          role: 'assistant' as const,
          content,
          object: codeApi.object,
        }

        // Use a function to avoid stale state
        setCodeTabMessages((prev) => {
          // Check if we already have this message
          if (prev.some((msg) => msg.object === codeApi.object)) {
            return prev
          }
          return [...prev, newMessage]
        })
      } else {
        // Update the last message
        setCodeTabMessages((prev) => {
          const lastIndex = prev.length - 1
          // Only update if needed
          if (prev[lastIndex].object === codeApi.object) {
            return prev
          }

          const updatedMessages = [...prev]
          updatedMessages[lastIndex] = {
            ...updatedMessages[lastIndex],
            content,
            object: codeApi.object,
          }
          return updatedMessages
        })
      }
    }
  }, [codeApi.object, codeTabMessages])

  useEffect(() => {
    if (codeApi.error) codeApi.stop()
  }, [codeApi])

  useEffect(() => {
    if (chatTabApi.response) {
      // Add the AI response to the messages
      const content: Message['content'] = [
        { type: 'text', text: chatTabApi.response },
      ]

      setChatTabMessages((prev) => {
        // Check if we need to add a new message or update existing
        if (!prev.length || prev[prev.length - 1].role !== 'assistant') {
          return [
            ...prev,
            {
              role: 'assistant' as const,
              content,
            },
          ]
        } else {
          // Update the last message
          const updatedMessages = [...prev]
          updatedMessages[updatedMessages.length - 1] = {
            ...updatedMessages[updatedMessages.length - 1],
            content,
          }
          return updatedMessages
        }
      })
    }
  }, [chatTabApi.response])

  useEffect(() => {
    if (marketingApi.error) marketingApi.stop()
  }, [marketingApi])

  useEffect(() => {
    if (documentsApi.error) documentsApi.stop()
  }, [documentsApi])

  useEffect(() => {
    if (legalApi.error) legalApi.stop()
  }, [legalApi])

  useEffect(() => {
    if (sentinelApi.error) sentinelApi.stop()
  }, [sentinelApi])

  useEffect(() => {
    if (searchApi.object) {
      setSearchTabFragment(searchApi.object)
      const content: Message['content'] = [
        { type: 'text', text: searchApi.object.commentary || '' },
        { type: 'code', text: searchApi.object.code || '' },
      ]

      if (
        !searchTabMessages.length ||
        searchTabMessages[searchTabMessages.length - 1].role !== 'assistant'
      ) {
        addSearchTabMessage({
          role: 'assistant',
          content,
          object: searchApi.object,
        })
      } else {
        setSearchTabMessage({
          content,
          object: searchApi.object,
        })
      }
    }
  }, [
    searchApi.object,
    addSearchTabMessage,
    searchTabMessages,
    setSearchTabMessage,
  ])

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

    if (activeTab === 'chat' && chatTabApi.isLoading) {
      chatTabApi.stop()
    } else if (activeTab === 'code' && codeApi.isLoading) {
      codeApi.stop()
    } else if (activeTab === 'marketing' && marketingApi.isLoading) {
      marketingApi.stop()
    } else if (activeTab === 'documents' && documentsApi.isLoading) {
      documentsApi.stop()
    } else if (activeTab === 'legal' && legalApi.isLoading) {
      legalApi.stop()
    } else if (activeTab === 'sentinel' && sentinelApi.isLoading) {
      sentinelApi.stop()
    } else if (activeTab === 'search' && searchApi.isLoading) {
      searchApi.stop()
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

    if (activeTab === 'chat') {
      chatTabApi.submit({
        messages: toAISDKMessages(updatedMessages),
        model: currentModel,
        config: languageModel,
      })
    } else if (activeTab === 'code') {
      codeApi.submit({
        userID: session?.user?.id,
        messages: toAISDKMessages(updatedMessages),
        template: currentTemplate,
        model: currentModel,
        config: languageModel,
      })
    } else if (activeTab === 'marketing') {
      marketingApi.submit({
        userID: session?.user?.id,
        messages: toAISDKMessages(updatedMessages),
        template: currentTemplate,
        model: currentModel,
        config: languageModel,
      })
    } else if (activeTab === 'documents') {
      documentsApi.submit({
        userID: session?.user?.id,
        messages: toAISDKMessages(updatedMessages),
        template: currentTemplate,
        model: currentModel,
        config: languageModel,
      })
    } else if (activeTab === 'legal') {
      legalApi.submit({
        userID: session?.user?.id,
        messages: toAISDKMessages(updatedMessages),
        template: currentTemplate,
        model: currentModel,
        config: languageModel,
      })
    } else if (activeTab === 'sentinel') {
      sentinelApi.submit({
        userID: session?.user?.id,
        messages: toAISDKMessages(updatedMessages),
        template: currentTemplate,
        model: currentModel,
        config: languageModel,
      })
    }

    setChatInput('')
    setFiles([])
    setCurrentTab('code')

    posthog.capture('chat_submit', {
      template: selectedTemplate,
      model: languageModel.model,
    })
  }

  function retry() {
    if (activeTab === 'chat') {
      chatTabApi.submit({
        messages: toAISDKMessages(chatTabMessages),
        model: currentModel,
        config: languageModel,
      })
    } else if (activeTab === 'code') {
      codeApi.submit({
        userID: session?.user?.id,
        messages: toAISDKMessages(codeTabMessages),
        template: currentTemplate,
        model: currentModel,
        config: languageModel,
      })
    } else if (activeTab === 'marketing') {
      marketingApi.submit({
        userID: session?.user?.id,
        messages: toAISDKMessages(marketingTabMessages),
        template: currentTemplate,
        model: currentModel,
        config: languageModel,
      })
    } else if (activeTab === 'documents') {
      documentsApi.submit({
        userID: session?.user?.id,
        messages: toAISDKMessages(documentsTabMessages),
        template: currentTemplate,
        model: currentModel,
        config: languageModel,
      })
    } else if (activeTab === 'legal') {
      legalApi.submit({
        userID: session?.user?.id,
        messages: toAISDKMessages(legalTabMessages),
        template: currentTemplate,
        model: currentModel,
        config: languageModel,
      })
    } else if (activeTab === 'sentinel') {
      sentinelApi.submit({
        userID: session?.user?.id,
        messages: toAISDKMessages(sentinelTabMessages),
        template: currentTemplate,
        model: currentModel,
        config: languageModel,
      })
    }
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
    if (activeTab === 'chat' && chatTabApi.isLoading) {
      chatTabApi.stop()
    } else if (activeTab === 'code' && codeApi.isLoading) {
      codeApi.stop()
    } else if (activeTab === 'marketing' && marketingApi.isLoading) {
      marketingApi.stop()
    } else if (activeTab === 'documents' && documentsApi.isLoading) {
      documentsApi.stop()
    } else if (activeTab === 'legal' && legalApi.isLoading) {
      legalApi.stop()
    } else if (activeTab === 'sentinel' && sentinelApi.isLoading) {
      sentinelApi.stop()
    }

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

  async function handleChatTabSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!session) {
      return setAuthDialog(true)
    }

    if (activeTab === 'chat' && chatTabApi.isLoading) {
      chatTabApi.stop()
    } else if (activeTab === 'code' && codeApi.isLoading) {
      codeApi.stop()
    } else if (activeTab === 'marketing' && marketingApi.isLoading) {
      marketingApi.stop()
    } else if (activeTab === 'documents' && documentsApi.isLoading) {
      documentsApi.stop()
    } else if (activeTab === 'legal' && legalApi.isLoading) {
      legalApi.stop()
    } else if (activeTab === 'sentinel' && sentinelApi.isLoading) {
      sentinelApi.stop()
    }

    const content: Message['content'] = [{ type: 'text', text: chatTabInput }]
    const images = await toMessageImage(chatTabFiles)

    if (images.length > 0) {
      images.forEach((image) => {
        content.push({ type: 'image', image })
      })
    }

    // Add the user message to the UI
    const newMessage = {
      role: 'user' as const,
      content,
    }

    setChatTabMessages((prev) => [...prev, newMessage])

    // Submit to the new API
    chatTabApi.submit({
      messages: toAISDKMessages([...chatTabMessages, newMessage]),
      model: currentModel,
      config: languageModel,
    })

    setChatTabInput('')
    setChatTabFiles([])

    posthog.capture('chat_tab_submit', {
      template: selectedTemplate,
      model: languageModel.model,
    })
  }

  const memoizedHandleChatTabSubmit = useCallback(handleChatTabSubmit, [
    session,
    activeTab,

    chatTabApi,
    chatTabMessages,
    codeApi,
    documentsApi,
    legalApi,
    marketingApi,
    sentinelApi,
    chatTabInput,
    chatTabFiles,

    currentModel,

    languageModel,
    posthog,
    selectedTemplate,
    setChatTabInput,
    setChatTabFiles,
  ])

  const handleCodeTabSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!session) {
      return setAuthDialog(true)
    }

    if (codeApi.isLoading) {
      codeApi.stop()
    }

    const content: Message['content'] = [{ type: 'text', text: codeTabInput }]
    const images = await toMessageImage(codeTabFiles)

    if (images.length > 0) {
      images.forEach((image) => {
        content.push({ type: 'image', image })
      })
    }

    // Create the new message
    const newMessage = {
      role: 'user' as const,
      content,
    }

    // Update messages state directly
    const updatedMessages = [...codeTabMessages, newMessage]
    setCodeTabMessages(updatedMessages)

    // Submit to API with the updated messages
    codeApi.submit({
      userID: session?.user?.id,
      messages: toAISDKMessages(updatedMessages),
      template: currentTemplate,
      model: currentModel,
      config: languageModel,
    })

    setCodeTabInput('')
    setCodeTabFiles([])

    posthog.capture('code_tab_submit', {
      template: selectedTemplate,
      model: languageModel.model,
    })
  }

  const memoizedHandleCodeTabSubmit = useCallback(handleCodeTabSubmit, [
    session,
    codeApi,
    codeTabInput,
    codeTabFiles,
    codeTabMessages,
    currentTemplate,
    currentModel,
    languageModel,
    posthog,
    selectedTemplate,
    setCodeTabInput,
    setCodeTabFiles,
  ])

  // Update the search tab submission handler
  const memoizedHandleSearchTabSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!session) {
        return setAuthDialog(true)
      }

      if (searchApi.isLoading) {
        searchApi.stop()
      }

      const content: Message['content'] = [
        { type: 'text', text: searchTabInput },
      ]

      toMessageImage(searchTabFiles).then((images) => {
        if (images.length > 0) {
          images.forEach((image) => {
            content.push({ type: 'image', image })
          })
        }

        const updatedMessages = addSearchTabMessage({
          role: 'user',
          content,
        })

        // Use our dedicated search API endpoint
        fetch('/api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: toAISDKMessages(updatedMessages),
            model: currentModel,
            config: languageModel,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Search request failed')
            }

            const reader = response.body?.getReader()
            if (!reader) throw new Error('No reader available')

            // Create a new assistant message to hold the streaming response
            addSearchTabMessage({
              role: 'assistant',
              content: [{ type: 'text', text: '' }],
            })

            const readStream = async () => {
              if (!reader) return

              const { done, value } = await reader.read()
              if (done) return

              const chunk = new TextDecoder().decode(value, { stream: true })
              // Process chunk and update state as needed

              if (!done) {
                readStream()
              }
            }

            readStream()
          })
          .catch((error) => {
            console.error('Search error:', error)
            // Handle error state
          })

        setSearchTabInput('')
        setSearchTabFiles([])

        posthog.capture('search_tab_submit', {
          template: selectedTemplate,
          model: languageModel.model,
        })
      })
    },
    [
      session,
      searchApi,
      searchTabInput,
      searchTabFiles,
      addSearchTabMessage,
      setSearchTabMessage,
      currentModel,
      languageModel,
      posthog,
      selectedTemplate,
    ],
  )

  // Add this function to handle fragment clicks
  const handleFragmentClick = (
    fragment: DeepPartial<FragmentSchema>,
    result: ExecutionResult | undefined,
  ) => {
    setCurrentTab('fragment')
    setCodeTabFragment(fragment)
    setCodeTabResult(result)
    setFragment(fragment)
    setResult(result)
  }

  const handleSearchAction = (actionType: 'images' | 'videos' | 'generate') => {
    const lastUserMessage = searchTabMessages.findLast((m) => m.role === 'user')
    if (!lastUserMessage) return

    const query = Array.isArray(lastUserMessage.content)
      ? lastUserMessage.content.find((c) => c.type === 'text')?.text || ''
      : lastUserMessage.content

    if (actionType === 'images') {
      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=isch`,
        '_blank',
      )
    } else if (actionType === 'videos') {
      window.open(
        `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
        '_blank',
      )
    } else if (actionType === 'generate') {
      // For now, just open DALL-E or similar
      window.open(`https://labs.openai.com/`, '_blank')
      // In a real implementation, you would trigger your image generation API
    }
  }

  // Add state for search-specific features
  const [searchResults, setSearchResults] = useState<any[]>([])

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
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <div className="flex justify-center w-full">
              <TabsList className="rounded-md cursor-pointer">
                <TabsTrigger value="chat" className="rounded-sm text-xs">
                  <RiChat4Line className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="search" className="rounded-sm text-xs">
                  <RiRadarLine className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="documents" className="rounded-sm text-xs">
                  <RiFile3Line className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="code" className="rounded-sm text-xs">
                  <RiCodeAiLine className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="marketing" className="rounded-sm text-xs">
                  <RiFundsLine className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="legal" className="rounded-sm text-xs">
                  <RiGovernmentLine className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="sentinel" className="rounded-sm text-xs">
                  <RiShieldCheckLine className="w-4 h-4" />
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent
              value="chat"
              className="w-full mt-2 flex flex-col h-full relative mx-auto"
            >
              <div className="flex-1 mt-4 pb-40 h-1/2 items-center justify-center mx-auto">
                <Chat
                  messages={chatTabMessages}
                  isLoading={activeTab === 'chat' && chatTabApi.isLoading}
                  setCurrentPreview={(preview) => {
                    setChatTabFragment(preview.fragment)
                    setChatTabResult(preview.result)
                    setFragment(preview.fragment)
                    setCurrentTab('fragment')
                  }}
                />
              </div>
              <div className="fixed bottom-0 items-center justify-center mx-auto px-8 max-w-[800px] w-full">
                <ChatInput
                  retry={() => {
                    chatTabApi.submit({
                      messages: toAISDKMessages(chatTabMessages),
                      model: currentModel,
                      config: languageModel,
                    })
                  }}
                  isErrored={
                    activeTab === 'chat' && chatTabApi.error !== undefined
                  }
                  isLoading={activeTab === 'chat' && chatTabApi.isLoading}
                  isRateLimited={isRateLimited}
                  stop={() => {
                    if (activeTab === 'chat') chatTabApi.stop()
                  }}
                  input={chatTabInput}
                  handleInputChange={(e) => setChatTabInput(e.target.value)}
                  handleSubmit={memoizedHandleChatTabSubmit}
                  handleFileChange={(files) => setChatTabFiles(files)}
                  files={chatTabFiles}
                  isMultiModal={currentModel?.multiModal || false}
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
            <TabsContent
              value="code"
              className="w-full mt-2 flex flex-col h-full"
            >
              {codeTabMessages.length === 0 ? <V0Clone /> : null}
              <div className="flex-1 overflow-auto mt-4">
                <Chat
                  messages={codeTabMessages}
                  isLoading={activeTab === 'code' && codeApi.isLoading}
                  setCurrentPreview={(preview) => {
                    setCodeTabFragment(preview.fragment)
                    setCodeTabResult(preview.result)
                    setCurrentTab('fragment')
                  }}
                />
              </div>
              <div className="absolute bottom-0 items-center justify-center mx-auto px-8 max-w-[800px] w-full">
                <ChatInput
                  retry={() => {
                    codeApi.submit({
                      userID: session?.user?.id,
                      messages: toAISDKMessages(codeTabMessages),
                      template: currentTemplate,
                      model: currentModel,
                      config: languageModel,
                    })
                  }}
                  isErrored={
                    activeTab === 'code' && codeApi.error !== undefined
                  }
                  isLoading={activeTab === 'code' && codeApi.isLoading}
                  isRateLimited={isRateLimited}
                  stop={() => {
                    if (activeTab === 'code') codeApi.stop()
                  }}
                  input={codeTabInput}
                  handleInputChange={(e) => setCodeTabInput(e.target.value)}
                  handleSubmit={memoizedHandleCodeTabSubmit}
                  isMultiModal={currentModel?.multiModal || false}
                  files={codeTabFiles}
                  handleFileChange={setCodeTabFiles}
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
            <TabsContent
              value="search"
              className="w-full mt-2 flex flex-col h-full"
            >
              <div className="flex-1 overflow-auto mt-4 pb-40">
                <Chat
                  messages={searchTabMessages}
                  isLoading={activeTab === 'search' && searchApi.isLoading}
                  setCurrentPreview={(preview) => {
                    setSearchTabFragment(preview.fragment)
                    setSearchTabResult(preview.result)
                  }}
                />
              </div>

              {/* Search action buttons */}
              {searchTabMessages.length > 0 && (
                <div className="fixed right-4 top-24 bg-background border rounded-lg shadow-md p-4">
                  <h3 className="font-medium mb-3">Search Actions</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleSearchAction('images')}
                      className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-muted"
                    >
                      <span className="flex items-center gap-2">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14 2H2C1.44772 2 1 2.44772 1 3V13C1 13.5523 1.44772 14 2 14H14C14.5523 14 15 13.5523 15 13V3C15 2.44772 14.5523 2 14 2Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M1 11L5 7L9 11"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11 9C12.1046 9 13 8.10457 13 7C13 5.89543 12.1046 5 11 5C9.89543 5 9 5.89543 9 7C9 8.10457 9.89543 9 11 9Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Search Images
                      </span>
                    </button>
                    <button
                      onClick={() => handleSearchAction('videos')}
                      className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-muted"
                    >
                      <span className="flex items-center gap-2">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14 4.5V11.5C14 12.0523 13.5523 12.5 13 12.5H3C2.44772 12.5 2 12.0523 2 11.5V4.5C2 3.94772 2.44772 3.5 3 3.5H13C13.5523 3.5 14 3.94772 14 4.5Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6.5 6.5L10 8.5L6.5 10.5V6.5Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Search Videos
                      </span>
                    </button>
                    <button
                      onClick={() => handleSearchAction('generate')}
                      className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-muted"
                    >
                      <span className="flex items-center gap-2">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 1V3M8 13V15M3 8H1M5.5 5.5L4 4M10.5 5.5L12 4M15 8H13M5.5 10.5L4 12M10.5 10.5L12 12M11.5 8C11.5 9.933 9.933 11.5 8 11.5C6.067 11.5 4.5 9.933 4.5 8C4.5 6.067 6.067 4.5 8 4.5C9.933 4.5 11.5 6.067 11.5 8Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Generate Image
                      </span>
                    </button>
                  </div>
                </div>
              )}

              <div className="absolute bottom-0 items-center justify-center mx-auto px-8 max-w-[800px] w-full">
                <ChatInput
                  retry={() => {
                    searchApi.submit({
                      userID: session?.user?.id,
                      messages: toAISDKMessages(searchTabMessages),
                      model: currentModel,
                      config: languageModel,
                    })
                  }}
                  isErrored={
                    activeTab === 'search' && searchApi.error !== undefined
                  }
                  isLoading={activeTab === 'search' && searchApi.isLoading}
                  isRateLimited={isRateLimited}
                  stop={() => {
                    if (activeTab === 'search') searchApi.stop()
                  }}
                  input={searchTabInput}
                  handleInputChange={(e) => setSearchTabInput(e.target.value)}
                  handleSubmit={memoizedHandleSearchTabSubmit}
                  isMultiModal={currentModel?.multiModal || false}
                  files={searchTabFiles}
                  handleFileChange={setSearchTabFiles}
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
          </Tabs>
        </div>
        {fragment && (
          <Preview
            apiKey={apiKey}
            selectedTab={currentTab}
            onSelectedTabChange={setCurrentTab}
            isChatLoading={activeTab === 'code' && codeApi.isLoading}
            isPreviewLoading={isPreviewLoading}
            fragment={fragment}
            result={
              activeTab === 'code'
                ? (codeTabResult as ExecutionResult)
                : (result as ExecutionResult)
            }
            onClose={() => setFragment(undefined)}
          />
        )}
      </div>
    </div>
  )
}
