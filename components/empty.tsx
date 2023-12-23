import Image from "next/image";

interface EmptyProps {
  label: string;
}

const Empty = ({
  label
}: EmptyProps) => {
  return (
    <div className="h-full p-20 flex flex-col justify-center items-center">
      <div className="relative h-72 w-72">
        <Image alt="Empty" fill src='/empty.png'></Image>
      </div>
      <p className="to-muted-foreground text-sm text-center">
        {label}
      </p>
    </div>
  )
}
export default Empty