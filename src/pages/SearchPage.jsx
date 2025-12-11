// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"

// export default function SearchPage() {
//   return (
//     <div>
//     <h1></h1>
//     <h2></h2>
//     <div className="flex w-full max-w-sm items-center gap-2 justify-center">
//       <Input type="email" placeholder="Vehicle" />
//       <Button type="submit" variant="outline" className="bg-black text-white">
//         Search
//       </Button>
//     </div>
//     </div>
//   )
// }

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchPage() {
  return (
    <div className="flex flex-col items-center mt-10 space-y-4">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900">Search Vehicles</h1>
      <h2 className="text-gray-600 text-lg">Find the vehicle you want quickly</h2>

      {/* Search Bar */}
      <div className="flex w-full max-w-sm items-center gap-2 justify-center mt-4">
        <Input type="text" placeholder="Vehicle name" className="flex-1" />
        <Button type="submit" variant="default" className="bg-black text-white">
          Search
        </Button>
      </div>
    </div>
  );
}