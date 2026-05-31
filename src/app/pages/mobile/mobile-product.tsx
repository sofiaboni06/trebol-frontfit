import { useState } from "react";
import { useParams } from "react-router";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  Heart,
  Share2,
  ShoppingCart,
  Sun,
  Droplets,
  ArrowLeft,
  Minus,
  Plus,
} from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Link } from "react-router";

export function MobileProduct() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const product = {
    name: "Monstera Deliciosa",
    price: 890,
    rating: 4.8,
    reviews: 124,
    image:
      "https://images.unsplash.com/photo-1525498128493-380d1990a112?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbmRvb3IlMjBtb25zdGVyYSUyMHBsYW50fGVufDF8fHx8MTc3OTk3NzU4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description:
      "Planta tropical perfecta para interiores con hojas perforadas únicas.",
    care: {
      light: "Indirecta brillante",
      water: "Cada 7-10 días",
      temperature: "18-24°C",
    },
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] pb-32">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white p-4 flex items-center justify-between shadow-sm">
        <Link to="/mobile">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Share2 className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Heart className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Image */}
      <div className="aspect-square">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Badge className="mb-3 bg-[#7BAE7F] text-white">
          Interior
        </Badge>
        <h1 className="text-2xl font-bold text-[#1E2B24] mb-2">
          {product.name}
        </h1>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl">⭐ {product.rating}</span>
          <span className="text-gray-600">({product.reviews} reseñas)</span>
        </div>

        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-3xl font-bold text-[#2E5E4E]">
            ${product.price}
          </span>
        </div>

        <p className="text-gray-700 mb-6">{product.description}</p>

        {/* Care Requirements */}
        <Card className="p-4 mb-6 bg-white/80">
          <h3 className="font-semibold text-[#1E2B24] mb-4">
            Cuidados básicos
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#7BAE7F]/20 flex items-center justify-center">
                <Sun className="w-5 h-5 text-[#2E5E4E]" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Luz</p>
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
                <p className="text-xs text-gray-600">Riego</p>
                <p className="font-semibold text-[#1E2B24]">
                  {product.care.water}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="details" className="mb-6">
          <TabsList className="w-full">
            <TabsTrigger value="details" className="flex-1">
              Detalles
            </TabsTrigger>
            <TabsTrigger value="care" className="flex-1">
              Cuidados
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex-1">
              Reseñas
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="p-4">
            <p className="text-gray-700">
              La Monstera Deliciosa es perfecta para dar un toque tropical a
              cualquier espacio interior.
            </p>
          </TabsContent>
          <TabsContent value="care" className="p-4">
            <p className="text-gray-700">
              Mantén el suelo ligeramente húmedo y proporciona luz indirecta
              brillante.
            </p>
          </TabsContent>
          <TabsContent value="reviews" className="p-4">
            <p className="text-gray-700">124 clientes recomiendan este producto</p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-20 left-0 right-0 bg-white p-4 shadow-lg border-t">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#F4F1EA] rounded-full px-3 py-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-7 h-7 p-0 rounded-full"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="font-semibold w-6 text-center">{quantity}</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setQuantity(quantity + 1)}
              className="w-7 h-7 p-0 rounded-full"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <Button className="flex-1 bg-[#2E5E4E] hover:bg-[#1E2B24] text-white rounded-full">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Agregar ${product.price * quantity}
          </Button>
        </div>
      </div>
    </div>
  );
}
