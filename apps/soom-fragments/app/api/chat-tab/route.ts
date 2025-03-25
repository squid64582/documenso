import { ChatAnthropic } from '@langchain/anthropic'
import { AIMessage, HumanMessage } from '@langchain/core/messages'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { PromptTemplate } from '@langchain/core/prompts'
import { RunnableSequence } from '@langchain/core/runnables'
import { ChatOpenAI } from '@langchain/openai'
import { StreamingTextResponse, Message as VercelMessage } from 'ai'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  try {
    const { messages, model, config } = await req.json()

    // Configure the language model based on the provider
    let llm
    if (model?.providerId === 'anthropic') {
      llm = new ChatAnthropic({
        anthropicApiKey: config.apiKey || process.env.ANTHROPIC_API_KEY,
        modelName: model.id,
        temperature: config.temperature || 0.7,
      })
    } else if (model?.providerId === 'openai') {
      llm = new ChatOpenAI({
        openAIApiKey: config.apiKey || process.env.OPENAI_API_KEY,
        modelName: model.id,
        temperature: config.temperature || 0.7,
      })
    } else {
      // Default to Anthropic
      llm = new ChatAnthropic({
        anthropicApiKey: config.apiKey || process.env.ANTHROPIC_API_KEY,
        modelName: 'claude-3-5-sonnet-20240620',
        temperature: config.temperature || 0.7,
      })
    }

    // Convert messages to LangChain format
    const langchainMessages = messages.map((message: VercelMessage) => {
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

    // Create a simple prompt template
    const promptTemplate = PromptTemplate.fromTemplate(`
      You are a helpful AI assistant. Respond to the user's questions or requests.
      
      {input}
    `)

    // Create a runnable sequence
    const chain = RunnableSequence.from([llm, new StringOutputParser()])

    // Stream the response
    const stream = await chain.stream(langchainMessages)
    return new StreamingTextResponse(stream)
  } catch (error: any) {
    console.error('Error in chat-tab API route:', error)
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 },
    )
  }
}
