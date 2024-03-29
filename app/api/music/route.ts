import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import Replicate from 'replicate';

// import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!
})

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { prompt } = body

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!prompt) {
      return new NextResponse('Prompt is required', { status: 400 })
    }

    // 超出免费次数限制
    // const freeTrial = await checkApiLimit();
    // if (!freeTrial) {
    //   return new NextResponse('Free trial has expired', { status: 403 })
    // }
    if (JSON.parse(localStorage.getItem('count') || '0') >= 5) {
      return new NextResponse('Free trial has expired', { status: 403 })
    }

    console.log('请求前');

    const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt
        }
      }
    );

    console.log('请求后');


    // 使用次数加一
    // await increaseApiLimit();
    localStorage.setItem('count', JSON.parse(localStorage.getItem('count') || '0') + 1)

    return NextResponse.json(response)
  } catch (err) {
    console.log('[MUSIC_ERROR]', err);
    return new NextResponse('Internal error', { status: 500 })
  }
}