import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai'

// import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { messages } = body

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!configuration.apiKey) {
      return new NextResponse('OpenAI API Key not configured', { status: 500 })
    }

    if (!messages) {
      return new NextResponse('Messages are required', { status: 400 })
    }

    // 超出免费次数限制
    // const freeTrial = await checkApiLimit();
    // if (!freeTrial) {
    //   return new NextResponse('Free trial has expired', { status: 403 })
    // }
    if (JSON.parse(localStorage.getItem('count') || '0') >= 5) {
      return new NextResponse('Free trial has expired', { status: 403 })
    }

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages
    })

    // 使用次数加一
    // await increaseApiLimit();
    localStorage.setItem('count', JSON.parse(localStorage.getItem('count') || '0') + 1)

    return NextResponse.json(response.data.choices[0].message)
  } catch (err) {
    console.log('[CONVERSATION_ERROR]', err);
    return new NextResponse('Internal error', { status: 500 })
  }
}