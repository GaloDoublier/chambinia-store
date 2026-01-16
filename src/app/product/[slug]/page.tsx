import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ArrowLeft, Check, ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// METADATA DINAMICA
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  const product = await prisma.product.findUnique({
    where: { slug },
    select: { name: true, description: true },
  });

  if (!product) {
    return { title: 'Producto no encontrado' };
  }

  return {
    title: `${product.name} | Chambinia Store`,
    description: product.description,
  };
}




// 2. El Componente de Página
                                        //agarro los params
export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  // Buscamos el producto por su SLUG (URL amigable)
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  // Si no existe, lanzamos la pantalla de 404 de Next.js automáticamente
  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto min-h-screen px-4 py-10">
      {/* Botón Volver */}
      <Link 
        href="/" 
        className="mb-6 inline-flex items-center text-sm text-gray-500 hover:text-black transition"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a la tienda
      </Link>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        
        {/* Columna Izquierda: Imagen */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100 border">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Columna Derecha: Información */}
        <div className="flex flex-col justify-center">
          
          {/* Breadcrumb / Categoría */}
          <span className="mb-2 text-sm font-bold uppercase tracking-wide text-blue-600">
            {product.category.name}
          </span>

          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            {product.name}
          </h1>

          {/* Precio y Reviews Falsas (Para dar sensación de ecommerce real) */}
          <div className="mb-6 flex items-end gap-4">
            <p className="text-3xl font-bold text-gray-900">
              ${Number(product.price).toFixed(2)}
            </p>
            <div className="mb-1 flex items-center text-yellow-500">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4" /> {/* 4 estrellas */}
              <span className="ml-2 text-sm text-gray-400">(24 reviews)</span>
            </div>
          </div>

          <p className="mb-8 text-base leading-relaxed text-gray-600">
            {product.description}
          </p>

          {/* Stock Check */}
          <div className="mb-6 flex items-center text-sm text-green-600">
            <Check className="mr-2 h-4 w-4" />
            Stock disponible ({product.stock} unidades)
          </div>

          {/* Acciones de Compra */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <button className="flex flex-1 items-center justify-center rounded-lg bg-black px-8 py-4 text-base font-bold text-white transition hover:bg-gray-800">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Añadir al Carrito
            </button>
            <button className="flex items-center justify-center rounded-lg border border-gray-300 bg-white px-8 py-4 text-base font-bold text-gray-900 transition hover:bg-gray-50">
              Comprar Ahora
            </button>
          </div>
          
          <p className="mt-8 text-xs text-gray-400">
            Envío gratis en compras superiores a $100. Garantía de devolución de 30 días.
          </p>
        </div>
      </div>
    </div>
  );
}