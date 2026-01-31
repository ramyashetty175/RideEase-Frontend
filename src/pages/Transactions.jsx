"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('http://localhost:3020/api/payments', { headers: { Authorization: localStorage.getItem('token')}});
                setTransactions(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchPayments();
    }, [])

    const totalAmount = transactions.reduce((acc, cv) => acc + cv.amount, 0);

    return (
        <SidebarProvider>
          <AppSidebar />
            <main className="p-4">
            <Table>
              <TableCaption>A list of all payments.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Transaction ID</TableHead>
                    {/* <TableHead>User</TableHead> */}
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount (₹)</TableHead>
                  </TableRow>
                </TableHeader>
              <TableBody>
                {transactions.map((t) => (
                    <TableRow key={t._id}>
                      <TableCell className="font-medium">{ t.transactionId }</TableCell>
                      {/* <TableCell>{ t.user?.username }</TableCell> */}
                      <TableCell>{t.status}</TableCell>
                      <TableCell>Razorpay</TableCell>
                      <TableCell className="text-right">{t.amount / 100}</TableCell>
                    </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4}>Total</TableCell>
                  <TableCell className="text-right">{totalAmount / 100}</TableCell>
                </TableRow>
              </TableFooter>
        </Table>
      </main>
    </SidebarProvider>
  )
}