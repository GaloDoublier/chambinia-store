import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  image?: string;
}

export const Hero = ({
  title = "Estilo y Calidad en un solo lugar", // Valor por defecto
  subtitle = siteConfig.description,           // Usa la config
  ctaText = "Ver Productos",
  ctaLink = "/productos",
  image = "https://placehold.co/800x600/EEE/31343C/png?text=Hero+Image",
}: HeroProps) => {
  return (
    <section className="w-full bg-white pb-12 md:pb-24 lg:pb-32 pt-2 md:pt-4 lg:pt-6 border-b">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          
          {/* Columna Texto */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-900">
                {title}
              </h1>
              <p className="max-w-150 text-gray-500 md:text-xl dark:text-gray-400">
                {subtitle}
              </p>
            </div>
            
            {/* Botones de Acción */}
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href={ctaLink}
                className="inline-flex h-10 items-center justify-center rounded-md bg-black px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
              >
                {ctaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Columna Imagen */}
          <div className="mx-auto lg:order-last">
            {/* Usamos img normal por simplicidad, luego podemos usar Image de Next optimizado */}
            <img
              src={image}
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:aspect-square shadow-xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
};