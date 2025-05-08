"use client";
import { useState } from "react";
import { useEffect } from "react";

// ...filepath: i:\Personal-Projects\Startup\ebrikkhoNext\app\dashboard\products\page.js
// Removed invalid useEffect call outside of a component



  // Removed duplicate handleEdit function

  export default function ProductsPage() {
          const [products, setProducts] = useState([]);
        
          useEffect(() => {
            const fetchProducts = async () => {
              try {
                const response = await fetch("/api/products");
                if (!response.ok) {
                  throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                setProducts(data);
              } catch (error) {
                console.error("Error fetching products:", error);
              }
            };
        
            fetchProducts();
          }); // Missing closing brace added here
        
          const handleAddProduct = () => {
            alert("Redirect to add product page");
          };
        
          const handleEdit = async (id) => {
            alert(`Redirect to edit product with ID: ${id}`);
          };
        
          const handleDelete = async (id) => {
            if (confirm("Are you sure you want to delete this product?")) {
              try {
                const response = await fetch(`/api/products/${id}`, {
                  method: "DELETE",
                });
                if (!response.ok) {
                  throw new Error("Failed to delete product");
                }
                setProducts(products.filter((product) => product.id !== id));
              } catch (error) {
                console.error("Error deleting product:", error);
              }
            }
          };
        
          return (
            <main className="p-8">
              <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                onClick={handleAddProduct}
              >
                Add New Product
              </button>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Image</th>
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Price</th>
                    <th className="border border-gray-300 px-4 py-2">Stock</th>
                    <th className="border border-gray-300 px-4 py-2">Status</th>
                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="border border-gray-300 px-4 py-2">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {product.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {product.price}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {product.stock}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {product.status}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <button
                          className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                          onClick={() => handleEdit(product.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </main>
          );
        }
// Removed redundant useEffect block and its contents
