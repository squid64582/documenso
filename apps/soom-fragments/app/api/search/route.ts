import { formatSearchResultsForLLM, searchWeb } from '@/lib/search'
import { ChatAnthropic } from '@langchain/anthropic'
import { HumanMessage, AIMessage } from '@langchain/core/messages'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { RunnableSequence } from '@langchain/core/runnables'
import { ChatOpenAI } from '@langchain/openai'
import { StreamingTextResponse } from 'ai'
import { Message } from 'ai'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { messages, model, config } = await req.json()

    // Extract the search query from the last user message
    const lastUserMessage = messages.findLast((m: any) => m.role === 'user')
    const searchQuery = Array.isArray(lastUserMessage.content)
      ? lastUserMessage.content.find((c: any) => c.type === 'text')?.text
      : lastUserMessage.content

    // Perform web search
    const searchResults = await searchWeb(searchQuery)

    // Configure the language model
    let llm
    if (model?.providerId === 'anthropic') {
      llm = new ChatAnthropic({
        anthropicApiKey: config.apiKey || process.env.ANTHROPIC_API_KEY,
        modelName: model.id,
        temperature: 0.3, // Lower temperature for factual responses
      })
    } else if (model?.providerId === 'openai') {
      llm = new ChatOpenAI({
        openAIApiKey: config.apiKey || process.env.OPENAI_API_KEY,
        modelName: model.id,
        temperature: 0.3,
      })
    } else {
      // Default to Anthropic
      llm = new ChatAnthropic({
        anthropicApiKey: config.apiKey || process.env.ANTHROPIC_API_KEY,
        modelName: 'claude-3-5-sonnet-20240620',
        temperature: 0.3,
      })
    }

    // Convert messages to LangChain format
    const langchainMessages = messages.map((message: Message) => {
      if (message.role === 'user') {
        return new HumanMessage({
          content: Array.isArray(message.content)
            ? message.content.map((content: any) => {
                if (content.type === 'text') {
                  return { type: 'text', text: content.text }
                } else if (content.type === 'image') {
                  return {
                    type: 'image_url',
                    image_url: { url: content.image },
                  }
                }
                return content
              })
            : message.content,
        })
      } else {
        return new AIMessage({
          content: Array.isArray(message.content)
            ? message.content
                .filter((content: any) => content.type === 'text')
                .map((content: any) => content.text)
                .join('\n')
            : message.content,
        })
      }
    })

    // Add search results to the context using our formatter
    const searchContext = new HumanMessage({
      content: formatSearchResultsForLLM(searchResults, searchQuery),
    })

    // Create a system message with instructions
    const systemMessage = new HumanMessage({
      content: `You are a helpful search assistant. Answer the user's question based on the search results provided. 
      Include citations in your response using [1], [2], etc. corresponding to the search result numbers.
      If the search results don't contain relevant information, acknowledge that and provide your best response.
      Format your response in markdown. Include a "Sources:" section at the end listing the numbered sources with their URLs.
      Make your response comprehensive but concise.`,
    })

    // Create a runnable sequence
    const chain = RunnableSequence.from([llm, new StringOutputParser()])

    // Stream the response
    const stream = await chain.stream([
      systemMessage,
      ...langchainMessages,
      searchContext,
    ])
    return new StreamingTextResponse(stream)
  } catch (error: any) {
    console.error('Error in search API route:', error)
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 },
    )
  }
}
