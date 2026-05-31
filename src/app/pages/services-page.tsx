import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Calendar } from "../components/ui/calendar";
import {
  Leaf,
  Scissors,
  Sparkles,
  Building2,
  MessageCircle,
  Calendar as CalendarIcon,
  Star,
  Check,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function ServicesPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const services = [
    {
      id: 1,
      name: "Diseño de Jardines",
      description:
        "Creamos espacios verdes únicos que reflejan tu personalidad y estilo de vida.",
      price: "Desde $5,000",
      icon: Leaf,
      features: [
        "Diseño personalizado 3D",
        "Selección de plantas",
        "Plan de instalación",
        "Seguimiento post-instalación",
      ],
      image:
        "https://images.unsplash.com/photo-1633330948542-0b3bdeefcdb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsYW5kc2NhcGUlMjBnYXJkZW4lMjBkZXNpZ258ZW58MXx8fHwxNzc5OTc3NTgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 2,
      name: "Mantenimiento",
      description:
        "Mantén tu jardín siempre perfecto con nuestro servicio de cuidado continuo.",
      price: "Desde $1,500/mes",
      icon: Scissors,
      features: [
        "Poda profesional",
        "Fertilización",
        "Control de plagas",
        "Limpieza general",
      ],
      image:
        "https://images.unsplash.com/photo-1714576578629-6cf5459bcaf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwb3V0ZG9vciUyMGdhcmRlbiUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3Nzk5Nzc1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 3,
      name: "Decoración Verde",
      description:
        "Transforma tus espacios interiores con plantas estratégicamente seleccionadas.",
      price: "Desde $3,000",
      icon: Sparkles,
      features: [
        "Selección de plantas",
        "Diseño de espacios",
        "Instalación completa",
        "Macetas premium incluidas",
      ],
      image:
        "https://images.unsplash.com/photo-1525498128493-380d1990a112?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbmRvb3IlMjBtb25zdGVyYSUyMHBsYW50fGVufDF8fHx8MTc3OTk3NzU4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 4,
      name: "Paisajismo Corporativo",
      description:
        "Crea un ambiente profesional y acogedor en tu oficina o negocio.",
      price: "Desde $8,000",
      icon: Building2,
      features: [
        "Diseño corporativo",
        "Plantas de bajo mantenimiento",
        "Instalación completa",
        "Mantenimiento mensual",
      ],
      image:
        "https://images.unsplash.com/photo-1731116392376-145c38f75bcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6ZW4lMjBnYXJkZW4lMjBtZWRpdGF0aW9uJTIwbWluaW1hbGlzdHxlbnwxfHx8fDE3Nzk5Nzc1ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 5,
      name: "Consultoría Personalizada",
      description:
        "Asesoría experta combinada con tecnología IA para el cuidado de tus plantas.",
      price: "$800/sesión",
      icon: MessageCircle,
      features: [
        "Evaluación de espacios",
        "Recomendaciones personalizadas",
        "Plan de cuidados",
        "Seguimiento IA",
      ],
      image:
        "https://images.unsplash.com/photo-1459156212016-c812468e2115?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjdWxlbnQlMjBwbGFudHMlMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc3OTk3NzU4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const testimonials = [
    {
      name: "Laura Martínez",
      service: "Diseño de Jardines",
      content:
        "El equipo de Trebol transformó mi patio en un oasis. El diseño 3D me ayudó a visualizar todo antes de comenzar.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1633330948542-0b3bdeefcdb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsYW5kc2NhcGUlMjBnYXJkZW4lMjBkZXNpZ258ZW58MXx8fHwxNzc5OTc3NTgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      name: "Roberto Silva",
      service: "Paisajismo Corporativo",
      content:
        "Nuestras oficinas lucen increíbles. Los clientes siempre comentan sobre el ambiente natural y relajante.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1731116392376-145c38f75bcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6ZW4lMjBnYXJkZW4lMjBtZWRpdGF0aW9uJTIwbWluaW1hbGlzdHxlbnwxfHx8fDE3Nzk5Nzc1ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F1EA]">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1714576578629-6cf5459bcaf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwb3V0ZG9vciUyMGdhcmRlbiUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3Nzk5Nzc1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Landscaping services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E2B24]/90 to-[#2E5E4E]/70" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Servicios de Paisajismo Profesional
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Transformamos espacios con diseño, tecnología y cuidado experto
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1E2B24] mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-gray-600">
              Soluciones integrales para cada necesidad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card
                key={service.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white"
              >
                <div className="aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2E5E4E] to-[#7BAE7F] flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1E2B24] mb-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="mb-4">
                    <Badge className="bg-[#7BAE7F] text-white">
                      {service.price}
                    </Badge>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <Check className="w-4 h-4 text-[#7BAE7F]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-[#2E5E4E] hover:bg-[#1E2B24] text-white rounded-full">
                    Solicitar servicio
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-[#2E5E4E]" />
            <h2 className="text-4xl font-bold text-[#1E2B24] mb-4">
              Agenda una consulta
            </h2>
            <p className="text-xl text-gray-600">
              Nuestros expertos están listos para ayudarte
            </p>
          </div>

          <Card className="p-8 backdrop-blur-sm bg-white/80 border-white/40">
            <Tabs defaultValue="info">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="info">Información</TabsTrigger>
                <TabsTrigger value="date">Fecha y Hora</TabsTrigger>
              </TabsList>
              <TabsContent value="info" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input id="name" placeholder="Juan Pérez" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="juan@ejemplo.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      placeholder="+52 55 1234 5678"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="service">Servicio de interés</Label>
                    <Input
                      id="service"
                      placeholder="Diseño de jardines"
                      className="mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="message">Mensaje</Label>
                    <Textarea
                      id="message"
                      placeholder="Cuéntanos sobre tu proyecto..."
                      className="mt-1 min-h-32"
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="date">
                <div className="flex justify-center mb-6">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-xl border"
                  />
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"].map(
                    (time) => (
                      <Button
                        key={time}
                        variant="outline"
                        className="hover:bg-[#7BAE7F] hover:text-white hover:border-[#7BAE7F]"
                      >
                        {time}
                      </Button>
                    )
                  )}
                </div>
              </TabsContent>
            </Tabs>
            <Button
              size="lg"
              className="w-full mt-8 bg-[#2E5E4E] hover:bg-[#1E2B24] text-white rounded-full"
            >
              Confirmar cita
            </Button>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[#1E2B24] mb-12 text-center">
            Casos de éxito
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="overflow-hidden backdrop-blur-sm bg-white/80"
              >
                <div className="aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={testimonial.image}
                    alt={testimonial.service}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-[#7BAE7F] text-[#7BAE7F]"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-[#1E2B24]">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600">{testimonial.service}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
