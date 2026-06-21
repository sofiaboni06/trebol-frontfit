import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  ArrowRight,
  Sparkles,
  Scan,
  Leaf,
  TrendingUp,
  ShieldCheck,
  Star,
  Calendar,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function HomePage() {
  const categories = [
    { name: "Plantas de Interior", icon: Leaf, count: "150+" },
    { name: "Plantas de Exterior", icon: TrendingUp, count: "200+" },
    { name: "Macetas y Decoración", icon: Star, count: "80+" },
    { name: "Herramientas", icon: ShieldCheck, count: "50+" },
  ];

  const products = [
    {
      id: 1,
      name: "Monstera Deliciosa",
      price: 890,
      image:
        "https://images.unsplash.com/photo-1525498128493-380d1990a112?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbmRvb3IlMjBtb25zdGVyYSUyMHBsYW50fGVufDF8fHx8MTc3OTk3NzU4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tag: "Popular",
    },
    {
      id: 2,
      name: "Ficus Lyrata",
      price: 1290,
      image:
        "https://images.unsplash.com/photo-1531875985735-f135dac5f230?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZWQlMjBmaWRkbGUlMjBsZWFmJTIwZmlnJTIwdHJlZXxlbnwxfHx8fDE3Nzk5Nzc1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tag: "Nuevo",
    },
    {
      id: 3,
      name: "Sansevieria",
      price: 490,
      image:
        "https://images.unsplash.com/photo-1687552212914-03a30c82053c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmFrZSUyMHBsYW50JTIwc2Fuc2V2aWVyaWElMjBtb2Rlcm58ZW58MXx8fHwxNzc5OTc3NTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tag: "Bajo mantenimiento",
    },
    {
      id: 4,
      name: "Pothos",
      price: 390,
      image:
        "https://images.unsplash.com/photo-1598880940080-ff9a29891b85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Rob3MlMjBoYW5naW5nJTIwcGxhbnQlMjBpbmRvb3J8ZW58MXx8fHwxNzc5OTc3NTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tag: "Resistente",
    },
  ];

  const testimonials = [
    {
      name: "María González",
      role: "Diseñadora de Interiores",
      content:
        "Trebol transformó mi espacio con plantas increíbles. El servicio de asesoría IA fue fundamental.",
      rating: 5,
    },
    {
      name: "Carlos Mendoza",
      role: "Propietario de Restaurante",
      content:
        "El servicio de paisajismo corporativo elevó la experiencia de nuestros clientes. Altamente recomendado.",
      rating: 5,
    },
    {
      name: "Ana Rodríguez",
      role: "Entusiasta de plantas",
      content:
        "La calidad de las plantas es excepcional y el escáner de enfermedades salvó mi jardín.",
      rating: 5,
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1633330948542-0b3bdeefcdb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsYW5kc2NhcGUlMjBnYXJkZW4lMjBkZXNpZ258ZW58MXx8fHwxNzc5OTc3NTgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Modern landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E2B24]/80 to-[#2E5E4E]/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-12 border border-white/20 shadow-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Transformamos espacios
              <br />
              con naturaleza
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Paisajismo, plantas y asesoría inteligente para hogares y
              empresas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/catalogo">
                <Button
                  size="lg"
                  className="bg-white text-[#1E2B24] hover:bg-white/90 px-8 py-6 text-lg rounded-full shadow-lg"
                >
                  Ver catálogo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/servicios">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full backdrop-blur-sm"
                >
                  Solicitar asesoría
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[#1E2B24] mb-12 text-center">
            Explora nuestras categorías
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden backdrop-blur-sm bg-white/80 border-white/40 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
              >
                <div className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2E5E4E] to-[#7BAE7F] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1E2B24] mb-2">
                    {category.name}
                  </h3>
                  <p className="text-[#2E5E4E]">{category.count} productos</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#2E5E4E]/5 to-[#7BAE7F]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-[#1E2B24]">
              Plantas destacadas
            </h2>
            <Link to="/catalogo">
              <Button variant="ghost" className="text-[#2E5E4E]">
                Ver todas
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link key={product.id} to={`/producto/${product.id}`}>
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1">
                  <div className="relative w-full h-[260px] overflow-hidden bg-gray-100">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-[#2E5E4E] text-white px-3 py-1 rounded-full text-sm">
                      {product.tag}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-[#1E2B24] mb-2">
                      {product.name}
                    </h3>
                    <p className="text-2xl font-bold text-[#2E5E4E]">
                      ${product.price}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1E2B24] mb-4">
              Tecnología inteligente
            </h2>
            <p className="text-xl text-gray-600">
              Aprovecha el poder de la IA para el cuidado de tus plantas
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link to="/asistente-ia">
              <Card className="group relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-[#2E5E4E] to-[#1E2B24] border-0 hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1 min-h-[300px]">
                <div className="p-10 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Asistente IA
                  </h3>
                  <p className="text-white/80 text-lg mb-6">
                    Obtén recomendaciones personalizadas, consejos de cuidado y
                    diagnósticos inteligentes para tus plantas.
                  </p>
                  <div className="flex items-center text-white">
                    <span>Explorar ahora</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#7BAE7F]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Card>
            </Link>

            <Link to="/escaner">
              <Card className="group relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-[#7BAE7F] to-[#2E5E4E] border-0 hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1 min-h-[300px]">
                <div className="p-10 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Scan className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Escáner de Plantas
                  </h3>
                  <p className="text-white/80 text-lg mb-6">
                    Identifica plantas, detecta enfermedades y recibe
                    tratamientos recomendados con tecnología de reconocimiento
                    visual.
                  </p>
                  <div className="flex items-center text-white">
                    <span>Escanear ahora</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Landscaping Services */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#1E2B24] mb-6">
                Servicios de paisajismo profesional
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Creamos espacios verdes únicos que combinan estética, funcionalidad
                y sostenibilidad para tu hogar o negocio.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#7BAE7F] flex items-center justify-center flex-shrink-0 mt-1">
                    <ShieldCheck className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1E2B24]">
                      Diseño personalizado
                    </h4>
                    <p className="text-gray-600">
                      Espacios únicos adaptados a tus necesidades
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#7BAE7F] flex items-center justify-center flex-shrink-0 mt-1">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1E2B24]">
                      Mantenimiento programado
                    </h4>
                    <p className="text-gray-600">
                      Cuidado continuo para espacios siempre perfectos
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#7BAE7F] flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1E2B24]">
                      Asesoría especializada
                    </h4>
                    <p className="text-gray-600">
                      Expertos y tecnología IA a tu servicio
                    </p>
                  </div>
                </li>
              </ul>
              <Link to="/servicios">
                <Button
                  size="lg"
                  className="bg-[#2E5E4E] hover:bg-[#1E2B24] text-white rounded-full px-8"
                >
                  Conocer servicios
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1714576578629-6cf5459bcaf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwb3V0ZG9vciUyMGdhcmRlbiUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3Nzk5Nzc1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Elegant landscape"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[#1E2B24] mb-12 text-center">
            Lo que dicen nuestros clientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="backdrop-blur-sm bg-white/80 border-white/40 hover:shadow-xl transition-all duration-300"
              >
                <div className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-[#7BAE7F] text-[#7BAE7F]"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-[#1E2B24]">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#2E5E4E] to-[#1E2B24]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Únete a nuestra comunidad verde
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Recibe consejos, ofertas exclusivas y novedades sobre plantas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
            />
            <Button
              size="lg"
              className="bg-white text-[#1E2B24] hover:bg-white/90 rounded-full px-8"
            >
              Suscribirme
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
