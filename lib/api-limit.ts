import { auth } from '@clerk/nextjs'

import prismadb from '@/lib/prismadb'
import { MAX_FREE_COUNTS } from '@/constants'

// 增加接口调用次数
export const increaseApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const userApiLimit = await prismadb.UserApiLimit.findUnique({
    where: {
      userId
    }
  });

  if (userApiLimit) {
    await prismadb.userApiLimit.update({
      where: { userId: userId },
      data: { count: userApiLimit.count + 1 },
    });
  } else {
    await prismadb.userApiLimit.create({
      data: { userId: userId, count: 1 }
    })
  }
};

// 检查接口剩余调用次数是否足够
export const checkApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId: userId
    }
  });

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
}

// 获取接口剩余调用次数
export const getApiLimitCount = async () => {
  const { userId } = auth();

  if (!userId) {
    return 0;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId
    }
  });

  if (!userApiLimit) {
    return 0;
  }

  return userApiLimit.count;
}