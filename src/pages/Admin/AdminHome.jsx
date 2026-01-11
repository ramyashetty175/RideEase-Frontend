import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Footer } from "../../components/Footer";

const owners = [
  { name: "Rahul Sharma", email: "rahul@example.com", verified: true },
  { name: "Priya Singh", email: "priya@example.com", verified: false },
  { name: "Amit Kumar", email: "amit@example.com", verified: true },
  { name: "Sneha Rao", email: "sneha@example.com", verified: false },
];

const users = [
  { name: "Anita Patel", verified: true },
  { name: "Vikram Singh", verified: false },
  { name: "Rohit Das", verified: true },
  { name: "Sneha Rao", verified: false },
];

const vehicles = [
  { name: "Toyota Corolla", type: "Sedan", status: "Available" },
  { name: "Honda City", type: "Sedan", status: "In Use" },
  { name: "Mahindra Thar", type: "SUV", status: "Available" },
  { name: "Suzuki Swift", type: "Hatchback", status: "Maintenance" },
];

export default function AdminHome() {
  return (
    <div className="w-full flex flex-col items-center mt-10 space-y-8">
      <Card className="w-full max-w-5xl bg-white/70 shadow-sm border">
        <div className="flex flex-col md:flex-row items-center justify-between p-8">
          <div className="flex-1">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-4xl font-bold">
                Welcome back!
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                Manage your fleet, bookings, and owners easily.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-gray-500 mb-5">
                You have <strong>2 pending approvals</strong> today.
              </p>

              <Button className="bg-gray-800 text-white hover:bg-gray-700">
                Explore Now
              </Button>
            </CardContent>
          </div>
          <div className="w-full md:w-1/3 mt-8 md:mt-0 flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/993/993769.png"
              alt="dashboard illustration"
              className="w-48 h-48 object-contain"
            />
          </div>
        </div>
      </Card>
      <Separator className="w-full max-w-5xl" />
      <h1 className="text-3xl font-bold text-gray-900">
        Quick overview of your platform activity
      </h1>
      <div className="w-full max-w-5xl flex gap-4">
        <Card className="min-w-[200px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Vehicles</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">6</p>
          </CardContent>
        </Card>

        <Card className="min-w-[200px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">4</p>
          </CardContent>
        </Card>

        <Card className="min-w-[200px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">2</p>
          </CardContent>
        </Card>

        <Card className="min-w-[200px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">0</p>
          </CardContent>
        </Card>

        <Card className="min-w-[200px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">28</p>
          </CardContent>
        </Card>
      </div>
      <Separator className="w-full max-w-5xl" />

      <h1 className="text-3xl font-bold text-gray-900 w-full max-w-5xl">
        All Owners
      </h1>
      <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4">
        {owners.map((owner, index) => (
          <Card
            key={index}
            className="flex flex-col items-center justify-center p-4 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center text-lg font-bold mb-2">
              {owner.name.charAt(0)}
            </div>

            <CardHeader className="p-0 mb-1">
              <CardTitle className="text-lg font-semibold">{owner.name}</CardTitle>
            </CardHeader>

            {owner.verified && (
              <p className="text-green-600 text-sm mb-2">Verified</p>
            )}

            <Button size="sm">View Profile</Button>
          </Card>
        ))}
        </div>
        <div className="w-full max-w-5xl flex justify-center mt-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <Separator className="w-full max-w-5xl" />

      <h1 className="text-3xl font-bold text-gray-900 w-full max-w-5xl">
        All Users
      </h1>

      <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4">
        {users.map((user, index) => (
          <Card
            key={index}
            className="flex flex-col items-center justify-center p-4 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center text-lg font-bold mb-2">
              {user.name.charAt(0)}
            </div>

            <CardHeader className="p-0 mb-1">
              <CardTitle className="text-lg font-semibold">{user.name}</CardTitle>
            </CardHeader>

            {user.verified && (
              <p className="text-green-600 text-sm mb-2">Verified</p>
            )}

            <Button size="sm">View Profile</Button>
          </Card>
        ))}
      </div>
      <div className="w-full max-w-5xl flex justify-center mt-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
       <Separator className="w-full max-w-5xl" />
      <h1 className="text-3xl font-bold text-gray-900 w-full max-w-5xl">
        All Vehicles
      </h1>

      <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4">
        {vehicles.map((vehicle, index) => (
          <Card
            key={index}
            className="flex flex-col items-center justify-center p-4 text-center"
          >
    
            <div className="w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center text-lg font-bold mb-2">
              {vehicle.name.charAt(0)}
            </div>

            <CardHeader className="p-0 mb-1">
              <CardTitle className="text-lg font-semibold">{vehicle.name}</CardTitle>
            </CardHeader>

            <CardContent className="p-0 mb-2">
              <p className="text-gray-500 text-sm">{vehicle.type}</p>
              <p className="text-gray-500 text-sm">{vehicle.status}</p>
            </CardContent>

            <Button size="sm">View</Button>
          </Card>
        ))}
      </div>
      <div className="w-full max-w-5xl flex justify-center mt-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <Footer />
    </div>
  )
}
