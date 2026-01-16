import { prisma } from '@/lib/prisma';
import { Hero } from '@/sections/Hero'; // <--- Importamos la sección
import Link from 'next/link';

export default async function Home() {
  // Traemos productos de la DB
  const products = await prisma.product.findMany({
    include: { category: true },
    take: 6, // Solo mostramos los primeros 6 en la home
  });

  return (
    // Ya no necesitamos <main> aquí porque está en el layout, 
    // pero podemos usar un div wrapper si queremos
    <div className="flex flex-col gap-10 pb-10">
      
      {/* 1. Sección Hero */}
      <Hero 
        title="Nueva Colección 2026"
        image="https://placehold.co/800x800/2563eb/FFFFFF/png?text=New+Collection"
      />

      {/* 2. Sección Productos Destacados */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6 border-b pb-2">
          Productos Destacados
        </h2>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              href={`/product/${product.slug}`} 
              key={product.id} 
              className="group overflow-hidden rounded-lg bg-white border hover:shadow-lg transition-all"
            >
              <div className="relative h-64 w-full bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      {product.category.name}
                    </p>
                    <h3 className="text-lg font-bold text-gray-900">
                      {product.name}
                    </h3>
                  </div>
                  <span className="font-bold text-blue-600">
                    ${Number(product.price).toFixed(2)}
                  </span>
                </div>
                <button className="mt-4 w-full rounded bg-gray-900 py-2 text-sm text-white hover:bg-gray-800 transition">
                  Ver Detalles
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}