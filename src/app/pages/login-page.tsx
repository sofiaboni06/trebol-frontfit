import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/auth.schema";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Mail, Lock, AlertCircle, Loader } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { correo: "", password: "" },
  });

  const handleLogin = async (data) => {
    try {
      setLoading(true);
      setError("");

      const response = await login(data.correo, data.password);

      if (response && response.token) {
        navigate("/perfil");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.mensaje ||
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Error en la autenticación";
      setError(errorMessage);
      console.error("Error de login:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginErrors = (formErrors) => {
    const message =
      formErrors.correo?.message ||
      formErrors.password?.message ||
      "Por favor completa todos los campos";
    setError(String(message));
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] flex items-center justify-center py-12">
      <div className="w-full max-w-md px-6">
        <Card className="bg-white p-8 rounded-2xl shadow-lg">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-[#1E2B24] mb-2">
              Bienvenido
            </h1>
            <p className="text-gray-600">
              Inicia sesión en tu cuenta
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form
            onSubmit={handleSubmit(handleLogin, handleLoginErrors)}
            className="space-y-5"
          >
            {/* Email Input */}
            <div>
              <label htmlFor="correo" className="block text-sm font-medium text-[#1E2B24] mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="correo"
                  type="email"
                  {...register("correo")}
                  placeholder="tu@email.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E5E4E] focus:border-transparent transition"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#1E2B24] mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E5E4E] focus:border-transparent transition"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2E5E4E] hover:bg-[#1E2B24] text-white font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2"
            >
              {loading && <Loader className="w-4 h-4 animate-spin" />}
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              ¿No tienes cuenta?{" "}
              <button
                onClick={() => navigate("/registro")}
                className="text-[#2E5E4E] font-semibold hover:underline"
              >
                Regístrate aquí
              </button>
            </p>
          </div>

          {/* Info Message */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-700">
              <strong>Demo:</strong> Para pruebas, usa tus credenciales del servidor.
              El token se guarda automáticamente en localStorage.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
