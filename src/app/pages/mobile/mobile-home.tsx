import { Link } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import {
  Search,
  Sparkles,
  Scan,
  TrendingUp,
  Heart,
  Leaf,
  ShoppingCart,
} from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

export function MobileHome() {
  const categories = [
    { name: "Interior", icon: Leaf, color: "from-[#2E5E4E] to-[#7BAE7F]" },
    { name: "Exterior", icon: TrendingUp, color: "from-[#7BAE7F] to-[#2E5E4E]" },
    { name: "Macetas", icon: Heart, color: "from-[#1E2B24] to-[#2E5E4E]" },
  ];

  const featured = [
    {
      id: 1,
      name: "Monstera Deliciosa",
      price: 890,
      image:
        "https://images.unsplash.com/photo-1525498128493-380d1990a112?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbmRvb3IlMjBtb25zdGVyYSUyMHBsYW50fGVufDF8fHx8MTc3OTk3NzU4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 2,
      name: "Ficus Lyrata",
      price: 1290,
      image:
        "https://images.unsplash.com/photo-1531875985735-f135dac5f230?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZWQlMjBmaWRkbGUlMjBsZWFmJTIwZmlnJTIwdHJlZXxlbnwxfHx8fDE3Nzk5Nzc1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F1EA]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2E5E4E] to-[#7BAE7F] flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-[#1E2B24]">
              Trebol Paisajismo
            </h1>
            <p className="text-xs text-gray-600">Tu jardín inteligente</p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Buscar plantas..."
            className="pl-10 rounded-full"
          />
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative h-48 overflow-hidden mx-4 mt-4 rounded-3xl">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1633330948542-0b3bdeefcdb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsYW5kc2NhcGUlMjBnYXJkZW4lMjBkZXNpZ258ZW58MXx8fHwxNzc5OTc3NTgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E2B24]/80 to-[#2E5E4E]/60 flex items-center justify-center text-center p-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Naturaleza en tu hogar
            </h2>
            <p className="text-white/90 text-sm mb-4">
              Plantas premium con IA
            </p>
          </div>
        </div>
      </div>

      {/* AI Features */}
      <div className="px-4 py-6">
        <h3 className="text-lg font-semibold text-[#1E2B24] mb-4">
          Funciones inteligentes
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/asistente-ia">
            <Card className="p-4 bg-gradient-to-br from-[#2E5E4E] to-[#1E2B24] border-0 text-white">
              <Sparkles className="w-8 h-8 mb-3" />
              <h4 className="font-semibold mb-1">Asistente IA</h4>
              <p className="text-xs text-white/80">Consejos expertos</p>
            </Card>
          </Link>
          <Link to="/mobile/escaner">
            <Card className="p-4 bg-gradient-to-br from-[#7BAE7F] to-[#2E5E4E] border-0 text-white">
              <Scan className="w-8 h-8 mb-3" />
              <h4 className="font-semibold mb-1">Escáner</h4>
              <p className="text-xs text-white/80">Identifica plantas</p>
            </Card>
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 pb-6">
        <h3 className="text-lg font-semibold text-[#1E2B24] mb-4">
          Categorías
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((cat, index) => (
            <Card
              key={index}
              className={`flex-shrink-0 w-32 p-4 bg-gradient-to-br ${cat.color} border-0 text-white`}
            >
              <cat.icon className="w-6 h-6 mb-2" />
              <p className="font-semibold text-sm">{cat.name}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="px-4 pb-24">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#1E2B24]">Destacadas</h3>
          <Link to="/catalogo">
            <Button variant="ghost" size="sm" className="text-[#2E5E4E]">
              Ver todas
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {featured.map((product) => (
            <Link key={product.id} to={`/mobile/producto/${product.id}`}>
              <Card className="overflow-hidden">
                <div className="w-full h-[260px] overflow-hidden relative bg-gray-100">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-sm text-[#1E2B24] mb-1">
                    {product.name}
                  </h4>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-[#2E5E4E]">
                      ${product.price}
                    </p>
                    <Button
                      size="sm"
                      className="h-7 px-2 bg-[#2E5E4E] text-white rounded-full"
                    >
                      <ShoppingCart className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
