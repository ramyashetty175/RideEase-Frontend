import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SearchPage() {
  return (
    <div>
    <h1>jjj</h1>
    <h2></h2>
    <div className="flex w-full max-w-sm items-center gap-2 justify-center">
      <Input type="email" placeholder="Vehicle" />
      <Button type="submit" variant="outline" className="bg-black text-white">
        Search
      </Button>
    </div>
    </div>
  )
}