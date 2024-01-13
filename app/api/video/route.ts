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

    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt
        }
      }
    );

    // 使用次数加一
    // await increaseApiLimit();
    localStorage.setItem('count', JSON.parse(localStorage.getItem('count') || '0') + 1)

    return NextResponse.json(response)
  } catch (err) {
    console.log('[VIDEO_ERROR]', err);
    return new NextResponse('Internal error', { status: 500 })
  }
}