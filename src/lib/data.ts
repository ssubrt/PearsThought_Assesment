// Mock data for pizza orders
export type PizzaOrder = {
  id: string;
  customerName: string;
  pizzaType: string;
  quantity: number;
  orderDate: string;
  status: 'Pending' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
};

export const pizzaOrders: PizzaOrder[] = [
  {
    id: 'PZA001',
    customerName: 'John Doe',
    pizzaType: 'Margherita',
    quantity: 2,
    orderDate: '2025-06-01 14:30',
    status: 'Delivered',
  },
  {
    id: 'PZA002',
    customerName: 'Jane Smith',
    pizzaType: 'Pepperoni',
    quantity: 1,
    orderDate: '2025-06-01 15:45',
    status: 'Preparing',
  },
  {
    id: 'PZA003',
    customerName: 'Robert Johnson',
    pizzaType: 'Veggie Supreme',
    quantity: 3,
    orderDate: '2025-06-01 16:20',
    status: 'Out for Delivery',
  },
  {
    id: 'PZA004',
    customerName: 'Emily Davis',
    pizzaType: 'Hawaiian',
    quantity: 2,
    orderDate: '2025-06-01 17:10',
    status: 'Pending',
  },
  {
    id: 'PZA005',
    customerName: 'Michael Brown',
    pizzaType: 'BBQ Chicken',
    quantity: 1,
    orderDate: '2025-06-01 18:05',
    status: 'Cancelled',
  },
  {
    id: 'PZA006',
    customerName: 'Sarah Wilson',
    pizzaType: 'Mushroom',
    quantity: 2,
    orderDate: '2025-06-02 10:15',
    status: 'Delivered',
  },
  {
    id: 'PZA007',
    customerName: 'David Martinez',
    pizzaType: 'Meat Lovers',
    quantity: 4,
    orderDate: '2025-06-02 11:30',
    status: 'Preparing',
  },
  {
    id: 'PZA008',
    customerName: 'Jessica Taylor',
    pizzaType: 'Buffalo Chicken',
    quantity: 1,
    orderDate: '2025-06-02 12:45',
    status: 'Pending',
  },
  {
    id: 'PZA009',
    customerName: 'Kevin Anderson',
    pizzaType: 'Four Cheese',
    quantity: 2,
    orderDate: '2025-06-02 13:20',
    status: 'Out for Delivery',
  },
  {
    id: 'PZA010',
    customerName: 'Amanda Thomas',
    pizzaType: 'Supreme',
    quantity: 3,
    orderDate: '2025-06-02 14:50',
    status: 'Delivered',
  },
];