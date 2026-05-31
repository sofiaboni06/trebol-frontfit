import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";
import { Badge } from "../components/ui/badge";
import {
  Sparkles,
  Send,
  Bot,
  User,
  Leaf,
  Droplets,
  Sun,
  Bug,
  MessageCircle,
  TrendingUp,
} from "lucide-react";

export function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "¡Hola! Soy tu asistente inteligente de Trebol Paisajismo. Puedo ayudarte con recomendaciones de plantas, cuidados, diagnóstico de enfermedades y mucho más. ¿En qué puedo asistirte hoy?",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);
  const [input, setInput] = useState("");

  const suggestions = [
    {
      icon: Leaf,
      text: "¿Qué planta recomiendas para mi sala?",
    },
    {
      icon: Droplets,
      text: "¿Con qué frecuencia debo regar mi Monstera?",
    },
    {
      icon: Sun,
      text: "Plantas que necesitan poca luz",
    },
    {
      icon: Bug,
      text: "Mi planta tiene manchas marrones",
    },
  ];

  const quickActions = [
    {
      icon: Leaf,
      title: "Recomendador de Plantas",
      description: "Encuentra la planta perfecta para tu espacio",
      gradient: "from-[#2E5E4E] to-[#1E2B24]",
    },
    {
      icon: Droplets,
      title: "Guía de Riego",
      description: "Aprende cuándo y cómo regar tus plantas",
      gradient: "from-[#7BAE7F] to-[#2E5E4E]",
    },
    {
      icon: Bug,
      title: "Diagnóstico de Plagas",
      description: "Identifica y trata problemas de salud",
      gradient: "from-[#1E2B24] to-[#2E5E4E]",
    },
    {
      icon: TrendingUp,
      title: "Plan de Fertilización",
      description: "Nutrientes ideales para cada planta",
      gradient: "from-[#2E5E4E] to-[#7BAE7F]",
    },
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user" as const,
      content: input,
      timestamp: new Date(),
    };

    const assistantResponse = {
      role: "assistant" as const,
      content:
        "Basándome en tu consulta, te recomiendo plantas como la Monstera Deliciosa o el Pothos. Estas plantas prosperan en luz indirecta y son perfectas para interiores. ¿Te gustaría saber más sobre sus cuidados específicos?",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage, assistantResponse]);
    setInput("");
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="min-h-screen bg-[#1E2B24] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2E5E4E]/20 to-transparent" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#7BAE7F]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#2E5E4E]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 mb-6">
              <Sparkles className="w-5 h-5 text-[#7BAE7F]" />
              <span className="text-sm">Potenciado por IA avanzada</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-[#7BAE7F] bg-clip-text text-transparent">
              Asistente Inteligente
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Obtén recomendaciones personalizadas, diagnósticos precisos y
              consejos expertos impulsados por inteligencia artificial
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className={`group relative overflow-hidden backdrop-blur-md bg-gradient-to-br ${action.gradient} border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer hover:-translate-y-1`}
              >
                <div className="p-6 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {action.title}
                  </h3>
                  <p className="text-sm text-white/70">{action.description}</p>
                </div>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Card>
            ))}
          </div>

          {/* Chat Interface */}
          <Card className="backdrop-blur-xl bg-white/5 border-white/10 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[600px]">
              {/* Chat Area */}
              <div className="lg:col-span-2 flex flex-col">
                {/* Messages */}
                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-6">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex gap-4 ${
                          message.role === "user" ? "flex-row-reverse" : ""
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.role === "user"
                              ? "bg-gradient-to-br from-[#7BAE7F] to-[#2E5E4E]"
                              : "bg-gradient-to-br from-[#2E5E4E] to-[#1E2B24]"
                          }`}
                        >
                          {message.role === "user" ? (
                            <User className="w-5 h-5 text-white" />
                          ) : (
                            <Bot className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div
                          className={`flex-1 ${
                            message.role === "user" ? "text-right" : ""
                          }`}
                        >
                          <div
                            className={`inline-block px-6 py-4 rounded-2xl ${
                              message.role === "user"
                                ? "bg-gradient-to-br from-[#7BAE7F] to-[#2E5E4E]"
                                : "backdrop-blur-md bg-white/10 border border-white/20"
                            }`}
                          >
                            <p className="text-white">{message.content}</p>
                          </div>
                          <p className="text-xs text-white/40 mt-2">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-6 border-t border-white/10">
                  <div className="flex gap-3">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Escribe tu pregunta..."
                      className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 rounded-full px-6"
                    />
                    <Button
                      onClick={handleSend}
                      size="icon"
                      className="rounded-full bg-gradient-to-br from-[#7BAE7F] to-[#2E5E4E] hover:from-[#2E5E4E] hover:to-[#1E2B24] w-12 h-12"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="border-l border-white/10 p-6 bg-white/5">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Preguntas sugeridas
                </h3>
                <div className="space-y-3">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion.text)}
                      className="w-full text-left p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#7BAE7F]/20 flex items-center justify-center group-hover:bg-[#7BAE7F]/30 transition-colors">
                          <suggestion.icon className="w-4 h-4 text-[#7BAE7F]" />
                        </div>
                        <span className="text-sm text-white/90">
                          {suggestion.text}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-[#2E5E4E]/30 to-[#7BAE7F]/30 border border-white/20">
                  <Sparkles className="w-8 h-8 text-[#7BAE7F] mb-3" />
                  <h4 className="font-semibold text-white mb-2">
                    Consejo del día
                  </h4>
                  <p className="text-sm text-white/70">
                    Las plantas tropicales como la Monstera prefieren ambientes
                    húmedos. Considera usar un humidificador o rociar las hojas
                    regularmente.
                  </p>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-white/70 mb-3">
                    Temas populares
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Riego",
                      "Luz solar",
                      "Fertilización",
                      "Plagas",
                      "Trasplante",
                    ].map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-white/10 text-white border-white/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Capacidades de IA
          </h2>
          <p className="text-xl text-white/70">
            Tecnología avanzada al servicio de tus plantas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Recomendaciones Personalizadas",
              description:
                "Sugerencias basadas en tu espacio, clima y experiencia",
              icon: Sparkles,
            },
            {
              title: "Diagnóstico Inteligente",
              description:
                "Identifica problemas y recibe soluciones específicas",
              icon: Bug,
            },
            {
              title: "Planificación de Cuidados",
              description:
                "Calendarios y recordatorios personalizados para cada planta",
              icon: TrendingUp,
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="p-8 backdrop-blur-md bg-white/5 border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#7BAE7F] to-[#2E5E4E] flex items-center justify-center mb-4">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/70">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
