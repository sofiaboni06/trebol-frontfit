import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Separator } from "../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Calendar } from "../components/ui/calendar";
import {
  Truck,
  Store,
  Calendar as CalendarIcon,
  CreditCard,
  MapPin,
  Check,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function CheckoutPage() {
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const cartItems = [
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
  ];

  const subtotal = 3070;
  const shipping = deliveryMethod === "delivery" ? 150 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#F4F1EA] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-[#1E2B24] mb-8">
          Finalizar compra
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Method */}
            <Card className="p-6 bg-white">
              <h2 className="text-2xl font-bold text-[#1E2B24] mb-6">
                Método de entrega
              </h2>
              <RadioGroup
                value={deliveryMethod}
                onValueChange={setDeliveryMethod}
                className="space-y-4"
              >
                <Card
                  className={`p-6 cursor-pointer transition-all ${
                    deliveryMethod === "delivery"
                      ? "border-2 border-[#2E5E4E] bg-[#7BAE7F]/5"
                      : "border-2 border-transparent"
                  }`}
                  onClick={() => setDeliveryMethod("delivery")}
                >
                  <div className="flex items-start gap-4">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Truck className="w-5 h-5 text-[#2E5E4E]" />
                        <Label htmlFor="delivery" className="text-lg font-semibold cursor-pointer">
                          Envío a domicilio
                        </Label>
                      </div>
                      <p className="text-gray-600">
                        Entrega en 3-5 días hábiles
                      </p>
                      <p className="text-[#2E5E4E] font-semibold mt-1">
                        $150
                      </p>
                    </div>
                  </div>
                </Card>

                <Card
                  className={`p-6 cursor-pointer transition-all ${
                    deliveryMethod === "pickup"
                      ? "border-2 border-[#2E5E4E] bg-[#7BAE7F]/5"
                      : "border-2 border-transparent"
                  }`}
                  onClick={() => setDeliveryMethod("pickup")}
                >
                  <div className="flex items-start gap-4">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Store className="w-5 h-5 text-[#2E5E4E]" />
                        <Label htmlFor="pickup" className="text-lg font-semibold cursor-pointer">
                          Recoger en tienda
                        </Label>
                      </div>
                      <p className="text-gray-600">
                        Disponible en 24 horas
                      </p>
                      <p className="text-[#2E5E4E] font-semibold mt-1">
                        Gratis
                      </p>
                    </div>
                  </div>
                </Card>
              </RadioGroup>
            </Card>

            {/* Shipping Address */}
            {deliveryMethod === "delivery" && (
              <Card className="p-6 bg-white">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-5 h-5 text-[#2E5E4E]" />
                  <h2 className="text-2xl font-bold text-[#1E2B24]">
                    Dirección de envío
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input id="firstName" placeholder="Juan" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input id="lastName" placeholder="Pérez" className="mt-1" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input
                      id="address"
                      placeholder="Calle Principal #123"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">Ciudad</Label>
                    <Input id="city" placeholder="Ciudad de México" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Código Postal</Label>
                    <Input id="postalCode" placeholder="03100" className="mt-1" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      placeholder="+52 55 1234 5678"
                      className="mt-1"
                    />
                  </div>
                </div>
              </Card>
            )}

            {/* Installation Date */}
            <Card className="p-6 bg-white">
              <div className="flex items-center gap-3 mb-6">
                <CalendarIcon className="w-5 h-5 text-[#2E5E4E]" />
                <h2 className="text-2xl font-bold text-[#1E2B24]">
                  Fecha de entrega/instalación
                </h2>
              </div>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-xl border"
                />
              </div>
            </Card>

            {/* Payment Method */}
            <Card className="p-6 bg-white">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-5 h-5 text-[#2E5E4E]" />
                <h2 className="text-2xl font-bold text-[#1E2B24]">
                  Método de pago
                </h2>
              </div>
              <Tabs defaultValue="card">
                <TabsList className="mb-6">
                  <TabsTrigger value="card">Tarjeta</TabsTrigger>
                  <TabsTrigger value="transfer">Transferencia</TabsTrigger>
                  <TabsTrigger value="cash">Efectivo</TabsTrigger>
                </TabsList>
                <TabsContent value="card">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Número de tarjeta</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Vencimiento</Label>
                        <Input id="expiry" placeholder="MM/AA" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" className="mt-1" />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="transfer">
                  <div className="p-6 bg-[#F4F1EA] rounded-xl">
                    <p className="text-gray-700">
                      Transferir a la cuenta bancaria que se proporcionará después
                      de confirmar el pedido.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="cash">
                  <div className="p-6 bg-[#F4F1EA] rounded-xl">
                    <p className="text-gray-700">
                      Paga en efectivo al momento de recibir tu pedido.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 backdrop-blur-sm bg-white/90">
              <h2 className="text-2xl font-bold text-[#1E2B24] mb-6">
                Resumen de orden
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1E2B24] text-sm">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Cantidad: {item.quantity}
                      </p>
                      <p className="font-semibold text-[#2E5E4E]">
                        ${item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-[#1E2B24]">
                    ${subtotal}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  <span className="font-semibold text-[#1E2B24]">
                    {shipping === 0 ? "Gratis" : `$${shipping}`}
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

              <Button
                size="lg"
                className="w-full bg-[#2E5E4E] hover:bg-[#1E2B24] text-white rounded-full mb-4"
              >
                <Check className="mr-2 w-5 h-5" />
                Confirmar pedido
              </Button>

              <div className="p-4 rounded-xl bg-gradient-to-br from-[#7BAE7F]/10 to-[#2E5E4E]/10">
                <p className="text-sm text-gray-700 text-center">
                  🌿 Compra 100% segura
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
