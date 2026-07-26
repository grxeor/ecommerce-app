"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const generarPDF = () => {
    if (cart.length === 0) {
      toast.error("El carrito está vacío");
      return;
    }

    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text("Factura de Compra - Mi E-commerce", 14, 20);
    
    doc.setFontSize(12);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 30);

    const datosTabla = cart.map(item => [
      item.title,
      item.quantity.toString(),
      `$${item.price.toFixed(2)}`,
      `$${(item.price * item.quantity).toFixed(2)}`
    ]);

    autoTable(doc, {
      startY: 40,
      head: [['Producto', 'Cantidad', 'Precio Unit.', 'Subtotal']],
      body: datosTabla,
      theme: 'striped',
    });

    const yFinal = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text(`Total a pagar: $${total.toFixed(2)}`, 14, yFinal);

    doc.save("factura-ecommerce.pdf");
    toast.success("¡Factura generada y descargada!");
  };

  const enviarPorCorreo = () => {
    if (cart.length === 0) {
      toast.error("El carrito está vacío");
      return;
    }

    const promesaEnvio = new Promise((resolve) => setTimeout(resolve, 2000));

    toast.promise(promesaEnvio, {
      loading: 'Enviando factura por correo electrónico...',
      success: '¡Factura enviada exitosamente a tu correo!',
      error: 'Error al enviar el correo',
    });
  };

  if (cart.length === 0) {
    return (
      <main className="min-h-screen p-8 flex flex-col items-center justify-center bg-slate-50">
        <h1 className="text-3xl font-bold mb-4 text-slate-800">Tu Carrito de Compras</h1>
        <p className="text-slate-500 mb-6">Aún no has agregado ningún producto.</p>
        <Link href="/" className="bg-slate-900 text-white px-6 py-3 rounded-md hover:bg-slate-800 font-semibold transition-colors">
          Volver a la tienda
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 sm:p-8 max-w-4xl mx-auto bg-slate-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">Tu Carrito</h1>
        <Link href="/" className="text-slate-600 hover:text-slate-900 underline font-medium">
          Seguir comprando
        </Link>
      </div>

      

      <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-4 sm:p-6 mb-6">
        {cart.map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-100 pb-4 mb-4 gap-4 last:border-0 last:pb-0 last:mb-0">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image src={item.urlImage} alt={item.title} fill className="object-contain rounded" sizes="80px" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{item.title}</h3>
                <p className="text-slate-500">${item.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center border border-slate-200 rounded-md">
                <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold transition-colors">-</button>
                <span className="px-4 font-semibold text-slate-800 border-l border-r border-slate-200">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold transition-colors">+</button>
              </div>
              <p className="font-bold w-16 text-right text-slate-800">${item.price * item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 font-bold px-2 py-1 bg-red-50 rounded-md transition-colors">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-extrabold text-slate-800">Total a pagar: ${total.toFixed(2)}</h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button 
            onClick={generarPDF}
            className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-md font-bold hover:bg-green-700 transition-colors"
          >
            Descargar PDF
          </button>
          <button 
            onClick={enviarPorCorreo}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-md font-bold hover:bg-blue-700 transition-colors"
          >
            Enviar al Correo
          </button>
        </div>
      </div>
    </main>
  );
}