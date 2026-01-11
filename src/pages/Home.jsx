import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function Home() {
  return (
    <div className="w-full flex justify-center mt-16">
      <Card className="w-full max-w-6xl p-6 rounded-2xl shadow-lg">
    
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
        
          <div className="md:col-span-2 space-y-2">
            <Label>Pickup and return location</Label>
            <Input
              placeholder="City, address, point of interest"
              className="h-11"
            />
            <div className="flex items-center gap-2">
              <Checkbox id="same-location" />
              <Label
                htmlFor="same-location"
                className="text-sm text-muted-foreground"
              >
                Same return location
              </Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Pickup date</Label>
            <Input type="date" className="h-11" />
          </div>

          <div className="space-y-2">
            <Label>Time</Label>
            <Input type="time" className="h-11" />
          </div>

          <div className="space-y-2">
            <Label>Return date</Label>
            <Input type="date" className="h-11" />
          </div>

          <div className="space-y-2">
            <Label>Time</Label>
            <Input type="time" className="h-11" />
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
           <Button className="bg-black text-white h-11">
              Search
           </Button>
        </div>
      </Card>
    </div>
  )
}
