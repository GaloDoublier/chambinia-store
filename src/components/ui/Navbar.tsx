import Link from 'next/link';
import { ShoppingCart, Menu, User } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block text-xl font-bold text-gray-900">
              {siteConfig.name}
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex gap-6">
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center text-sm font-medium text-gray-600 hover:text-black transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* 3. Iconos de Acción */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-full transition cursor-pointer">
            <User className="h-5 w-5" />
          </button>
          
          <button className="relative p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-full transition cursor-pointer">
            <ShoppingCart className="h-5 w-5" />
            {/* Badge de carrito (Hardcodeado por ahora) */}
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-600 text-[10px] font-bold text-white flex items-center justify-center">
              2
            </span>
          </button>

          {/* Menú Hamburgesa (Solo móvil) */}
          <button className="md:hidden p-2 text-gray-500">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};