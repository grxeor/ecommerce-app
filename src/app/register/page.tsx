"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Por favor, llena todos los campos requeridos");
      return;
    }

    const newUser = { name, email, password };
    localStorage.setItem("ecommerce-registered-user", JSON.stringify(newUser));
    
    toast.success("¡Cuenta creada con éxito!");
    
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-slate-100">
        <h1 className="text-2xl font-extrabold text-center text-slate-800 mb-6">Crear Cuenta</h1>
        
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nombre Completo</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-slate-300 rounded-md p-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              placeholder="Tu nombre y apellido"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-300 rounded-md p-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              placeholder="tu@correo.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-300 rounded-md p-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              placeholder="********"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors mt-2"
          >
            Registrarme
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-4">
          ¿Ya tienes cuenta? <Link href="/login" className="text-indigo-600 font-semibold hover:underline">Inicia sesión</Link>
        </p>
      </div>
    </main>
  );
}