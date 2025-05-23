"use client";

import { Badge } from "../../components/ui/badge";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast"; // Optional

type PizzaOrder = {
  orderId: string;
  customerName: string;
  pizzaType: string;
  quantity: number;
  orderDate: string;
  status: "Pending" | "Preparing" | "Out for Delivery" | "Delivered" | "Cancelled";
};

const mockOrders: PizzaOrder[] = [
  {
    orderId: "PZA001",
    customerName: "John Doe",
    pizzaType: "Margherita",
    quantity: 1,
    orderDate: "2024-06-01 12:30",
    status: "Pending",
  },
  {
    orderId: "PZA002",
    customerName: "Jane Smith",
    pizzaType: "Pepperoni",
    quantity: 2,
    orderDate: "2024-06-01 13:00",
    status: "Preparing",
  },
  {
    orderId: "PZA003",
    customerName: "Alice Johnson",
    pizzaType: "Veggie Supreme",
    quantity: 1,
    orderDate: "2024-06-01 13:15",
    status: "Out for Delivery",
  },
  {
    orderId: "PZA004",
    customerName: "Bob Brown",
    pizzaType: "Margherita",
    quantity: 3,
    orderDate: "2024-06-01 13:30",
    status: "Delivered",
  },
  {
    orderId: "PZA005",
    customerName: "Carol White",
    pizzaType: "Pepperoni",
    quantity: 1,
    orderDate: "2024-06-01 14:00",
    status: "Cancelled",
  },
];

function statusColor(status: PizzaOrder["status"]) {
  switch (status) {
    case "Pending":
      return "bg-yellow-200 text-yellow-800";
    case "Preparing":
      return "bg-blue-200 text-blue-800";
    case "Out for Delivery":
      return "bg-indigo-200 text-indigo-800";
    case "Delivered":
      return "bg-green-200 text-green-800";
    case "Cancelled":
      return "bg-red-200 text-red-800";
    default:
      return "";
  }
}

export default function PizzaOrdersPage() {
  const [orders] = useState(mockOrders);
  const { data: session, status } = useSession();
  const router = useRouter();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (status === "unauthenticated" && !hasRedirected.current) {
      hasRedirected.current = true;
      toast.error("You must be logged in to view this page.");
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="p-4">Loading...</div>;
  }

  if (!session) {
    return null; // Prevents rendering protected content
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Pizza Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3 border-b border-gray-300">Order ID</th>
              <th className="text-left p-3 border-b border-gray-300">Customer Name</th>
              <th className="text-left p-3 border-b border-gray-300">Pizza Type</th>
              <th className="text-left p-3 border-b border-gray-300">Quantity</th>
              <th className="text-left p-3 border-b border-gray-300">Order Date</th>
              <th className="text-left p-3 border-b border-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId} className="hover:bg-gray-50">
                <td className="p-3 border-b border-gray-300">{order.orderId}</td>
                <td className="p-3 border-b border-gray-300">{order.customerName}</td>
                <td className="p-3 border-b border-gray-300">{order.pizzaType}</td>
                <td className="p-3 border-b border-gray-300">{order.quantity}</td>
                <td className="p-3 border-b border-gray-300">{order.orderDate}</td>
                <td className="p-3 border-b border-gray-300">
                  <span className={`inline-block px-2 py-1 rounded ${statusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
