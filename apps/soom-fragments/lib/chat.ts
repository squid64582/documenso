import { Message } from './messages'
import { useState, useCallback, useEffect } from 'react'

interface ChatOptions {
  api: string
  onError?: (error: Error) => void
}

export function useChat({ api, onError }: ChatOptions) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | undefined>()
  const [response, setResponse] = useState<string>('')
  const [controller, setController] = useState<AbortController | null>(null)

  const submit = useCallback(
    async (data: any) => {
      setIsLoading(true)
      setError(undefined)
      setResponse('')

      const abortController = new AbortController()
      setController(abortController)

      try {
        const res = await fetch(api, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          signal: abortController.signal,
        })

        if (!res.ok) {
          const error = new Error(
            `Failed to fetch: ${res.status} ${res.statusText}`,
          )
          setError(error)
          onError?.(error)
          setIsLoading(false)
          return
        }

        const reader = res.body?.getReader()
        if (!reader) {
          const error = new Error('No reader available')
          setError(error)
          onError?.(error)
          setIsLoading(false)
          return
        }

        const decoder = new TextDecoder()
        let done = false
        let text = ''

        while (!done) {
          const { value, done: doneReading } = await reader.read()
          done = doneReading
          if (value) {
            const chunk = decoder.decode(value, { stream: true })
            text += chunk
            setResponse(text)
          }
        }

        setIsLoading(false)
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err)
          onError?.(err)
        } else if (
          err &&
          typeof err === 'object' &&
          'name' in err &&
          err.name !== 'AbortError'
        ) {
          const error = new Error(String(err))
          setError(error)
          onError?.(error)
        }
        setIsLoading(false)
      }
    },
    [api, onError],
  )

  const stop = useCallback(() => {
    if (controller) {
      controller.abort()
      setController(null)
      setIsLoading(false)
    }
  }, [controller])

  return {
    submit,
    isLoading,
    error,
    stop,
    response,
  }
}
