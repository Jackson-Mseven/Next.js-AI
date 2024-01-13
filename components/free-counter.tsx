'use client'

import { useEffect, useState } from "react"
import { Zap } from 'lucide-react'

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface FreeCounterProps {
  apiLimitCount: number
}

export const FreeCounter = (/* {
  apiLimitCount = 0
}: FreeCounterProps */) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {JSON.parse(localStorage.getItem('count') || '0')} / {5} Free Generations
            </p>
            <Progress className="h-3" value={JSON.parse(localStorage.getItem('count') || '0') / 5 * 100} ></Progress>
          </div>
          <Button className="w-full" variant="premium">
            Upgrape
            <Zap className="w-4 h-4 ml-2 fill-white"></Zap>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}