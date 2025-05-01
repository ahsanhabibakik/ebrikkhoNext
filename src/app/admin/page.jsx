"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Shield,
  Package,
  Users,
  ShoppingBag,
  DollarSign,
  Menu,
  X,
  Plus,
  Edit,
  Trash,
} from "lucide-react";
import Image from "next/image";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
    stock: "",
  });

  // Check permissions based on role and isAdmin
  const canViewUsers = session?.user?.isAdmin === true;
  const canViewOrders = session?.user?.isAdmin === true;
  const canAddProducts = session?.user?.isAdmin === true;

  // Auth & Data Fetching
  useEffect(() => {
    if (status === "loading") return;
    if (!session || !session.user?.isAdmin) {
      router.replace("/");
      return;
    }

    const fetchData = async () => {
      try {
        const responses = await Promise.allSettled([
          fetch("/api/admin/products"),
          canViewUsers
            ? fetch("/api/admin/users")
            : Promise.resolve({ status: 403 }),
          canViewOrders
            ? fetch("/api/admin/orders")
            : Promise.resolve({ status: 403 }),
        ]);

        // Handle responses based on permissions
        const [productsRes, usersRes, ordersRes] = responses;

        if (productsRes.status === "fulfilled" && productsRes.value.ok) {
          const data = await productsRes.value.json();
          setProducts(data.data);
        }

        if (
          canViewUsers &&
          usersRes.status === "fulfilled" &&
          usersRes.value.ok
        ) {
          const data = await usersRes.value.json();
          setUsers(data.data);
        }

        if (
          canViewOrders &&
          ordersRes.status === "fulfilled" &&
          ordersRes.value.ok
        ) {
          const data = await ordersRes.value.json();
          setOrders(data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [session, status, router, canViewUsers, canViewOrders]);

  // CRUD Operations
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowAddProduct(false);
        fetchDashboardData();
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-lg transition-all duration-300 fixed h-full`}
      >
        <div className="p-4 flex items-center justify-between">
          <h2
            className={`font-bold text-orange-600 ${
              !isSidebarOpen && "hidden"
            }`}
          >
            Admin Panel
          </h2>
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {/* Sidebar Navigation */}
        <nav className="mt-8">{/* Add sidebar navigation items */}</nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        } transition-all duration-300`}
      >
        <header className="bg-white shadow-sm p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <button
              onClick={() => setShowAddProduct(true)}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus size={20} /> Add Product
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Add stat cards */}
          </div>

          {/* Content Tabs */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Add tabs and content */}
          </div>
        </main>
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          {/* Add product form */}
        </div>
      )}
    </div>
  );
}
