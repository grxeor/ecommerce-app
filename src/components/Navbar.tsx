"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="font-extrabold text-lg text-slate-800">
          Mi E-commerce
        </Link>
        
        <div className="flex items-center gap-4 text-sm font-semibold">
          <Link href="/" className="text-slate-600 hover:text-slate-900">
            Tienda
          </Link>
          <Link href="/cart" className="text-slate-600 hover:text-slate-900 relative">
            Carrito
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                {totalItems}
              </span>
            )}
          </Link>
          <Link href="/login" className="text-slate-600 hover:text-slate-900">
            Login
          </Link>
          <Link href="/register" className="bg-slate-900 text-white px-3 py-1.5 rounded-md hover:bg-slate-800 transition-colors">
            Registro
          </Link>
        </div>
      </div>
    </nav>
  );
}