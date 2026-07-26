"use client";

import Image from "next/image";
import { Product } from "../types";
import { useCart } from "@/context/CartContext"; 
interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart(); 

  return (
    <div className="flex flex-row items-center p-4 border rounded-xl shadow-sm gap-4 bg-white hover:shadow-md transition-shadow w-full">
      
      <div className="flex-shrink-0">
        <Image
          src={product.urlImage}
          alt={product.title}
          width={100}
          height={100}
          className="rounded-md object-cover w-20 h-20 sm:w-28 sm:h-28" 
          priority={product.id <= 4}
        />
      </div>

      <div className="flex flex-col flex-grow">
        <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider">
          {product.category}
        </span>
        <h2 className="text-base sm:text-lg font-bold text-gray-800 leading-tight mt-1">
          {product.title}
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mt-1">
          {product.description}
        </p>
        
        <div className="mt-3 flex justify-between items-center">
          <span className="text-lg sm:text-xl font-extrabold text-blue-600">
            ${product.price}
          </span>
          
          <button 
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors active:scale-95"
          >
            Agregar
          </button>
        </div>
      </div>

    </div>
  );
}