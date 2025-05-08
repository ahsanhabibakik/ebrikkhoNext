"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCategoryPage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setLoading(false);
    router.push("/dashboard/categories");
  }

  return (
    <main className="max-w-lg mx-auto bg-base-100 p-8 rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-6">Add Category</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="input input-bordered"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>
    </main>
  );
}
