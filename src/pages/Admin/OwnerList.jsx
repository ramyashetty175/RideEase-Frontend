"use client"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";
import { useSelector, useDispatch } from "react-redux";
import { OwnerApprove, OwnerReject, removeOwner } from "../../slices/ownerSlice";

export default function OwnerList({ status }) {
    const dispatch = useDispatch()
    const { data } = useSelector(state => state.owner)

    const filteredData = status ? data.filter(owner => owner.status === status) : data;

    const columns = [
        { accessorKey: "_id", header: "ID" },
        { accessorKey: "username", header: "Name" },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "role", header: "Role" },
        {
          accessorKey: "licenceVerified",
          header: "License",
          cell: ({ row }) => {
            const owner = row.original
                return (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => owner.licenceDoc && window.open(owner.licenceDoc, "_blank")}
                  >
                    View
                  </Button>
                )
          }
        },
        {
          accessorKey: "insuranceVerified",
          header: "Insurance",
          cell: ({ row }) => {
          const owner = row.original
            return (
              <Button
                variant="outline"
                size="sm"
                onClick={() => owner.insuranceDoc && window.open(owner.insuranceDoc, "_blank")}
              >
                View
              </Button>
            )
          }
        }
    ]

    if (status === "pending") {
      columns.push({
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
          const owner = row.original
          return (
            <NativeSelect
              defaultValue="pending"
              className="h-9 w-32 text-sm"
              onChange={(e) => {
                const value = e.target.value;
                if (value === "approved") {
                  dispatch(OwnerApprove({ editId: owner._id }));
                }
                if (value === "rejected") {
                  dispatch(OwnerReject(owner._id));
                }
              }}
            >
              <NativeSelectOption value="pending">Pending</NativeSelectOption>
              <NativeSelectOption value="approved">Approve</NativeSelectOption>
              <NativeSelectOption value="rejected">Reject</NativeSelectOption>
            </NativeSelect>
          )
        }
      })
    }

    if (status !== "pending") {
      columns.push({
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
        const owner = row.original
          return (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => dispatch(removeOwner(owner._id))}
            >
              Remove
            </Button>
          )
        }
      })
    }

    return (
    <SidebarProvider>
      <AppSidebar />
        <main className="p-4">
          <DataTable columns={columns} data={filteredData} />
        </main>
      </SidebarProvider>
    )
}