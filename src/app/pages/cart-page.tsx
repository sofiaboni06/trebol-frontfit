import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Monstera Deliciosa",
      price: 890,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1525498128493-380d1990a112?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbmRvb3IlMjBtb25zdGVyYSUyMHBsYW50fGVufDF8fHx8MTc3OTk3NzU4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 2,
      name: "Ficus Lyrata",
      price: 1290,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1531875985735-f135dac5f230?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZWQlMjBmaWRkbGUlMjBsZWFmJTIwZmlnJTIwdHJlZXxlbnwxfHx8fDE3Nzk5Nzc1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 3,
      name: "Maceta Cerámica",
      price: 450,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1721328004336-c19ee38adcd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcGxhbnQlMjBwb3RzJTIwbWluaW1hbGlzdHxlbnwxfHx8fDE3Nzk5Nzc1ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 150;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F4F1EA] flex items-center justify-center py-20">
        <Card className="p-12 text-center max-w-md backdrop-blur-sm bg-white/80">
          <ShoppingBag className="w-20 h-20 mx-auto mb-6 text-gray-400" />
          <h2 className="text-2xl font-bold text-[#1E2B24] mb-4">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 mb-8">
            Descubre nuestra selección de plantas y comienza tu colección
          </p>
          <Link to="/catalogo">
            <Button className="bg-[#2E5E4E] hover:bg-[#1E2B24] text-white rounded-full px-8">
              Explorar catálogo
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F1EA] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-[#1E2B24] mb-8">
          Carrito de compras
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="p-6 bg-white">
                <div className="flex gap-6">
                  <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-[#1E2B24] mb-1">
                          {item.name}
                        </h3>
                        <p className="text-2xl font-bold text-[#2E5E4E]">
                          ${item.price}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-3 bg-[#F4F1EA] rounded-full px-4 py-2 w-fit">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 p-0 rounded-full hover:bg-white"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="font-semibold w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 p-0 rounded-full hover:bg-white"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Subtotal</p>
                    <p className="text-2xl font-bold text-[#1E2B24]">
                      ${item.price * item.quantity}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 backdrop-blur-sm bg-white/90">
              <h2 className="text-2xl font-bold text-[#1E2B24] mb-6">
                Resumen de orden
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-[#1E2B24]">
                    ${subtotal}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  <span className="font-semibold text-[#1E2B24]">
                    ${shipping}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-[#1E2B24]">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-[#2E5E4E]">
                    ${total}
                  </span>
                </div>
              </div>

              <Link to="/checkout">
                <Button
                  size="lg"
                  className="w-full bg-[#2E5E4E] hover:bg-[#1E2B24] text-white rounded-full mb-4"
                >
                  Proceder al pago
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>

              <Link to="/catalogo">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full rounded-full"
                >
                  Continuar comprando
                </Button>
              </Link>

              <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-[#7BAE7F]/10 to-[#2E5E4E]/10">
                <p className="text-sm text-gray-700">
                  🌿 <strong>Envío gratis</strong> en pedidos mayores a $2,000
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
