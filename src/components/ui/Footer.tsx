import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* Columna 1: Marca */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold">{siteConfig.name}</h3>
            <p className="text-sm text-gray-500 max-w-xs">
              {siteConfig.description}
            </p>
          </div>

          {/* Columna 2: Links Rápidos */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Navegación</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {siteConfig.mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-black transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Contacto</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>{siteConfig.contact.address}</li>
              <li>{siteConfig.contact.phone}</li>
              <li>{siteConfig.contact.email}</li>
            </ul>
          </div>

          {/* Columna 4: Redes */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Síguenos</h4>
            <div className="flex space-x-4">
              <Link href={siteConfig.links.instagram} className="text-gray-400 hover:text-pink-600 transition">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href={siteConfig.links.twitter} className="text-gray-400 hover:text-blue-400 transition">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href={siteConfig.links.github} className="text-gray-400 hover:text-black transition">
                {/* Usamos un icono genérico de facebook prestado o lucide si tuviera github */}
                <Facebook className="h-6 w-6" /> 
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};