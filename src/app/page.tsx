"use client";

import { useState } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");

  const categories = ["Todas", ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = selectedCategory === "Todas"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <main className="min-h-screen p-4 sm:p-8 max-w-3xl mx-auto bg-slate-50">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-center mb-6 text-slate-800">
        Nuestros Productos
      </h1>

      <div className="flex justify-end mb-4">
  <Link href="/cart" className="bg-indigo-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-indigo-700 transition-colors shadow-sm">
    Ver Carrito
  </Link>
</div>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              selectedCategory === category
                ? "bg-slate-800 text-white shadow-md"
                : "bg-white text-slate-600 border hover:bg-slate-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        
        {filteredProducts.length === 0 && (
          <p className="text-center text-slate-500 mt-10">No se encontraron productos.</p>
        )}
      </div>
    </main>
  );
} 