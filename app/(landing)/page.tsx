import { Button } from '@/components/ui/button'
import Link from 'next/link'

const LandingPage = () => {
  return (
    <div className="flex justify-center items-center  w-screen h-screen bg-[url('../public/bg.jpg')]">
      <div className='flex items-center flex-col bg-white/20 w-1/3 h-2/3 rounded-3xl'>
        <div className='text-pink-950 h-24 flex items-center'>
          Choose Your Way To Landing My Dashboard.
        </div>
        <Link href="/sign-in" className='w-2/3 h-1/3'>
          <Button className='w-full h-full bg-transparent hover:bg-transparent'>
            Login
          </Button>
        </Link>
        <Link href="/sign-up" className='w-2/3 h-1/3'>
          <Button className='w-full h-full bg-transparent hover:bg-transparent'>
            Register
          </Button>
        </Link>
      </div>
    </div>
  )
}
export default LandingPage