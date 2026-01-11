import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function Home() {
  return (
    <div className="w-full flex justify-center mt-16">
      <Card className="w-full max-w-4xl p-4 rounded-2xl shadow-lg">
    
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">

          <div className="flex flex-col space-y-2">
            <Label>Pickup and return location</Label>
            <Input
              placeholder="City, address, point of interest"
              className="h-11"
            />

            <div className="flex items-center gap-2 mt-1">
              <Checkbox id="same-location" />
              <Label
                htmlFor="same-location"
                className="text-sm text-muted-foreground"
              >
                Same return location
              </Label>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <Label>Pickup Date & Time</Label>
            <Input type="datetime-local" className="h-11" />
          </div>

          <div className="flex flex-col space-y-2">
            <Label>Return Date & Time</Label>
            <Input type="datetime-local" className="h-11" />
          </div>

        </div>
        <div className="flex justify-end mt-6">
           <Button className="bg-black text-white h-11 px-6">
              Search
           </Button>
        </div>
      </Card>
    </div>
  )
}