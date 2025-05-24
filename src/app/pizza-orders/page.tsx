"use client";

import { Badge } from "../../components/ui/badge";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

type PizzaOrder = {
  orderId: string;
  customerName: string;
  pizzaType: string;
  quantity: number;
  orderDate: string;
  status: "Pending" | "Preparing" | "Out for Delivery" | "Delivered" | "Cancelled";
};

const mockOrders: PizzaOrder[] = [
  // mock data 
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
  {
    orderId: "PZA006",
    customerName: "David Green",
    pizzaType: "BBQ Chicken",
    quantity: 2,
    orderDate: "2024-06-01 14:30",
    status: "Preparing",
  },
  {
    orderId: "PZA007",
    customerName: "Emily Black",
    pizzaType: "Hawaiian",
    quantity: 1,
    orderDate: "2024-06-01 15:00",
    status: "Pending",
  },
  {
    orderId: "PZA008",
    customerName: "Frank Blue",
    pizzaType: "Four Cheese",
    quantity: 2,
    orderDate: "2024-06-01 15:30",
    status: "Delivered",
  },
  {
    orderId: "PZA009",
    customerName: "Grace Red",
    pizzaType: "Veggie Supreme",
    quantity: 1,
    orderDate: "2024-06-01 16:00",
    status: "Out for Delivery",
  },
  {
    orderId: "PZA010",
    customerName: "Henry Yellow",
    pizzaType: "Pepperoni",
    quantity: 3,
    orderDate: "2024-06-01 16:30",
    status: "Cancelled",
  },
];

function statusColor(status: PizzaOrder["status"]) {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-800 border border-yellow-300";
    case "Preparing":
      return "bg-blue-100 text-blue-800 border border-blue-300";
    case "Out for Delivery":
      return "bg-indigo-100 text-indigo-800 border border-indigo-300";
    case "Delivered":
      return "bg-green-100 text-green-800 border border-green-300";
    case "Cancelled":
      return "bg-red-100 text-red-800 border border-red-300";
    default:
      return "";
  }
}

const PAGE_SIZE = 4;

export default function PizzaOrdersPage() {
  const [orders] = useState(mockOrders);
  const { data: session, status } = useSession();
  const router = useRouter();
  const hasRedirected = useRef(false);

  // Pagination state
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(orders.length / PAGE_SIZE);

  useEffect(() => {
    if (status === "unauthenticated" && !hasRedirected.current) {
      hasRedirected.current = true;
      toast.error("You must be logged in to view this page.");
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <div className="text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null; // Prevents rendering protected content
  }

  // Get current page orders
  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const currentOrders = orders.slice(startIdx, endIdx);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="w-full max-w-5xl mx-auto bg-white/80 backdrop-blur rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-6 text-center">
          🍕 Pizza Orders
        </h1>
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-purple-100">
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
              {currentOrders.map((order, idx) => (
                <tr
                  key={order.orderId}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="p-3 border-b border-gray-200 font-mono">{order.orderId}</td>
                  <td className="p-3 border-b border-gray-200">{order.customerName}</td>
                  <td className="p-3 border-b border-gray-200">{order.pizzaType}</td>
                  <td className="p-3 border-b border-gray-200">{order.quantity}</td>
                  <td className="p-3 border-b border-gray-200">{order.orderDate}</td>
                  <td className="p-3 border-b border-gray-200">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        <div className="flex items-center justify-between mt-6">
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="text-gray-700 font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}