"use client";
import { useState, useEffect } from "react";


function fetchCategories() {
  // Mock API call
  return Promise.resolve([
    { id: 1, name: "Electronics", slug: "electronics", status: "Active" },
    { id: 2, name: "Books", slug: "books", status: "Inactive" },
  ]);
}

function addCategory(newCategory) {
  // Mock API call
  return Promise.resolve({ ...newCategory, id: Date.now() });
}

function deleteCategory(id) {
  // Mock API call
  return Promise.resolve(id);
}

export default function CategoriesDashboard() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", slug: "", status: "Active" });

  useEffect(() => {
    async function fetchCategoriesFromAPI() {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    }
    fetchCategoriesFromAPI();
  }, []);

  const handleAddCategory = async () => {
    const response = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCategory),
    });
    const addedCategory = await response.json();
    setCategories([...categories, addedCategory]);
    setNewCategory({ name: "", slug: "", status: "Active" });
  };

  const handleDeleteCategory = async (id) => {
    await fetch(`/api/categories/${id}`, { method: "DELETE" });
    setCategories(categories.filter((category) => category.id !== id));
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add New Category</h2>
        <input
          type="text"
          placeholder="Name"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Slug"
          value={newCategory.slug}
          onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
          className="border p-2 mr-2"
        />
        <select
          value={newCategory.status}
          onChange={(e) => setNewCategory({ ...newCategory, status: e.target.value })}
          className="border p-2 mr-2"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button onClick={handleAddCategory} className="bg-blue-500 text-white px-4 py-2">
          Add Category
        </button>
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Slug</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="border border-gray-300 px-4 py-2">{category.name}</td>
              <td className="border border-gray-300 px-4 py-2">{category.slug}</td>
              <td className="border border-gray-300 px-4 py-2">{category.status}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="bg-red-500 text-white px-4 py-2"
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