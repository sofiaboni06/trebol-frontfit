import { useState } from "react";
import { useParams, Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import {
  ShoppingCart,
  Heart,
  Share2,
  Sun,
  Droplets,
  ThermometerSun,
  Sparkles,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function ProductDetailPage() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = {
    id: 1,
    name: "Monstera Deliciosa",
    price: 890,
    originalPrice: 1200,
    rating: 4.8,
    reviews: 124,
    description:
      "La Monstera Deliciosa, también conocida como Costilla de Adán, es una planta tropical perfecta para interiores. Sus grandes hojas perforadas crean un impacto visual único.",
    images: [
      "https://images.unsplash.com/photo-1525498128493-380d1990a112?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbmRvb3IlMjBtb25zdGVyYSUyMHBsYW50fGVufDF8fHx8MTc3OTk3NzU4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1531875985735-f135dac5f230?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZWQlMjBmaWRkbGUlMjBsZWFmJTIwZmlnJTIwdHJlZXxlbnwxfHx8fDE3Nzk5Nzc1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1598880940080-ff9a29891b85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Rob3MlMjBoYW5naW5nJTIwcGxhbnQlMjBpbmRvb3J8ZW58MXx8fHwxNzc5OTc3NTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    care: {
      light: "Luz indirecta brillante",
      water: "Cada 7-10 días",
      temperature: "18-24°C",
      humidity: "Media-Alta",
    },
    features: [
      "Purifica el aire",
      "Fácil cuidado",
      "Crece rápidamente",
      "Pet-friendly",
    ],
    stock: 15,
    category: "Plantas de Interior",
  };

  const relatedProducts = [
    {
      id: 2,
      name: "Ficus Lyrata",
      price: 1290,
      image:
        "https://images.unsplash.com/photo-1531875985735-f135dac5f230?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZWQlMjBmaWRkbGUlMjBsZWFmJTIwZmlnJTIwdHJlZXxlbnwxfHx8fDE3Nzk5Nzc1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 3,
      name: "Sansevieria",
      price: 490,
      image:
        "https://images.unsplash.com/photo-1687552212914-03a30c82053c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmFrZSUyMHBsYW50JTIwc2Fuc2V2aWVyaWElMjBtb2Rlcm58ZW58MXx8fHwxNzc5OTc3NTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 4,
      name: "Pothos",
      price: 390,
      image:
        "https://images.unsplash.com/photo-1598880940080-ff9a29891b85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Rob3MlMjBoYW5naW5nJTIwcGxhbnQlMjBpbmRvb3J8ZW58MXx8fHwxNzc5OTc3NTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F1EA] py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <Link to="/catalogo">
          <Button variant="ghost" className="mb-6 text-[#1E2B24]">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al catálogo
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            <Card className="overflow-hidden mb-4 bg-white">
              <div className="w-full h-[400px]">
                <ImageWithFallback
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <Card
                  key={index}
                  className={`overflow-hidden cursor-pointer transition-all ${
                    selectedImage === index
                      ? "ring-2 ring-[#2E5E4E]"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <div className="w-full h-[120px]">
                    <ImageWithFallback
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <Badge className="mb-3 bg-[#7BAE7F] text-white">
              {product.category}
            </Badge>
            <h1 className="text-4xl font-bold text-[#1E2B24] mb-3">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <span className="text-2xl">⭐</span>
                <span className="font-semibold">{product.rating}</span>
                <span className="text-gray-600">({product.reviews} reseñas)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-[#2E5E4E]">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
              <Badge variant="secondary" className="bg-red-100 text-red-700">
                -26%
              </Badge>
            </div>

            <p className="text-gray-700 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Care Requirements */}
            <Card className="p-6 mb-8 backdrop-blur-sm bg-white/80">
              <h3 className="font-semibold text-[#1E2B24] mb-4">
                Requisitos de cuidado
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#7BAE7F]/20 flex items-center justify-center">
                    <Sun className="w-5 h-5 text-[#2E5E4E]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Luz</p>
                    <p className="font-semibold text-[#1E2B24]">
                      {product.care.light}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#7BAE7F]/20 flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-[#2E5E4E]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Riego</p>
                    <p className="font-semibold text-[#1E2B24]">
                      {product.care.water}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#7BAE7F]/20 flex items-center justify-center">
                    <ThermometerSun className="w-5 h-5 text-[#2E5E4E]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Temperatura</p>
                    <p className="font-semibold text-[#1E2B24]">
                      {product.care.temperature}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#7BAE7F]/20 flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-[#2E5E4E]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Humedad</p>
                    <p className="font-semibold text-[#1E2B24]">
                      {product.care.humidity}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-semibold text-[#1E2B24]">Cantidad:</span>
              <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 p-0 rounded-full"
                >
                  -
                </Button>
                <span className="font-semibold w-8 text-center">{quantity}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 p-0 rounded-full"
                >
                  +
                </Button>
              </div>
              <span className="text-sm text-gray-600">
                {product.stock} disponibles
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <Button
                size="lg"
                className="flex-1 bg-[#2E5E4E] hover:bg-[#1E2B24] text-white rounded-full py-6"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Agregar al carrito
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-6"
              >
                <Heart className="w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-6"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* AI Recommendations */}
            <Card className="p-6 bg-gradient-to-br from-[#2E5E4E] to-[#1E2B24] text-white">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-6 h-6" />
                <h3 className="font-semibold text-lg">
                  Recomendación IA
                </h3>
              </div>
              <p className="text-white/90 mb-4">
                Esta planta es ideal para tu espacio. Basado en tus preferencias,
                también recomendamos fertilizante orgánico y maceta de cerámica.
              </p>
              <Link to="/asistente-ia">
                <Button
                  variant="secondary"
                  className="w-full bg-white/20 hover:bg-white/30 text-white rounded-full"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Consultar asistente IA
                </Button>
              </Link>
            </Card>
          </div>
        </div>

        {/* Tabs Section */}
        <Card className="p-8 mb-16 bg-white">
          <Tabs defaultValue="details">
            <TabsList className="mb-8">
              <TabsTrigger value="details">Detalles</TabsTrigger>
              <TabsTrigger value="care">Guía de cuidado</TabsTrigger>
              <TabsTrigger value="reviews">Reseñas</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold text-[#1E2B24] mb-4">
                  Características principales
                </h3>
                <ul className="grid grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#7BAE7F]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="care">
              <div>
                <h3 className="text-xl font-semibold text-[#1E2B24] mb-4">
                  Guía completa de cuidado
                </h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    La Monstera Deliciosa es una planta de cuidado moderado que
                    prospera en condiciones de luz indirecta brillante.
                  </p>
                  <p>
                    <strong>Riego:</strong> Mantén el suelo ligeramente húmedo
                    pero no encharcado. Riega cuando los primeros 2-3 cm de tierra
                    estén secos.
                  </p>
                  <p>
                    <strong>Fertilización:</strong> Aplica fertilizante líquido
                    balanceado cada 2-3 semanas durante la primavera y el verano.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews">
              <div className="space-y-6">
                <div className="flex items-center gap-8 mb-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-[#2E5E4E]">
                      {product.rating}
                    </div>
                    <div className="text-gray-600">{product.reviews} reseñas</div>
                  </div>
                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-gray-600 w-12">
                          {stars} ⭐
                        </span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#7BAE7F]"
                            style={{
                              width: `${stars === 5 ? 80 : stars === 4 ? 15 : 5}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Related Products */}
        <div>
          <h2 className="text-3xl font-bold text-[#1E2B24] mb-8">
            Productos relacionados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((related) => (
              <Link key={related.id} to={`/producto/${related.id}`}>
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 bg-white">
                  <div className="w-full h-[260px] overflow-hidden bg-gray-100">
                    <ImageWithFallback
                      src={related.image}
                      alt={related.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-[#1E2B24] mb-2">
                      {related.name}
                    </h3>
                    <p className="text-2xl font-bold text-[#2E5E4E]">
                      ${related.price}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
