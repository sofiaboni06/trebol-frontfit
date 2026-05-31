import { useState } from "react";
import { useNavigate } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Mail, Lock, User, Phone, AlertCircle, Loader } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
    confirmPassword: "",
    telefono: "",
    direccion: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { register } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!formData.nombre || !formData.apellido || !formData.correo || !formData.password || !formData.confirmPassword) {
      setError("Por favor completa todos los campos obligatorios");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Estructura exacta del backend: nombre, apellido, correo, password, telefono?, direccion?
      const registerData = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        correo: formData.correo,
        password: formData.password,
      };

      // Agregar campos opcionales si están rellenos
      if (formData.telefono) {
        registerData.telefono = formData.telefono;
      }
      if (formData.direccion) {
        registerData.direccion = formData.direccion;
      }

      // Usar el hook de auth para registrar y sincronizar estado global
      const response = await register(registerData);

      // Si el registro fue exitoso, redirigir a perfil
      if (response && response.token) {
        navigate("/perfil");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.mensaje ||
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Error en el registro";
      setError(errorMessage);
      console.error("Error de registro:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] flex items-center justify-center py-12">
      <div className="w-full max-w-md px-6">
        <Card className="bg-white p-8 rounded-2xl shadow-lg">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-[#1E2B24] mb-2">
              Crear cuenta
            </h1>
            <p className="text-gray-600">
              Únete a nuestra comunidad
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Register Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Nombre Input */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-[#1E2B24] mb-2">
                Nombre
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="nombre"
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Juan"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E5E4E] focus:border-transparent transition"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Apellido Input */}
            <div>
              <label htmlFor="apellido" className="block text-sm font-medium text-[#1E2B24] mb-2">
                Apellido
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="apellido"
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Pérez"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E5E4E] focus:border-transparent transition"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Correo Input */}
            <div>
              <label htmlFor="correo" className="block text-sm font-medium text-[#1E2B24] mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="correo"
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E5E4E] focus:border-transparent transition"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#1E2B24] mb-2">
                Confirmar contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E5E4E] focus:border-transparent transition"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Teléfono Input (Opcional) */}
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-[#1E2B24] mb-2">
                Teléfono <span className="text-gray-500">(Opcional)</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="telefono"
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="+57 300 1234567"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E5E4E] focus:border-transparent transition"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Dirección Input (Opcional) */}
            <div>
              <label htmlFor="direccion" className="block text-sm font-medium text-[#1E2B24] mb-2">
                Dirección <span className="text-gray-500">(Opcional)</span>
              </label>
              <input
                id="direccion"
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                placeholder="Calle 123 #45-67"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E5E4E] focus:border-transparent transition"
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2E5E4E] hover:bg-[#1E2B24] text-white font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2 mt-6"
            >
              {loading && <Loader className="w-4 h-4 animate-spin" />}
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </Button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              ¿Ya tienes cuenta?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-[#2E5E4E] font-semibold hover:underline"
              >
                Inicia sesión aquí
              </button>
            </p>
          </div>

          {/* Info Message */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-700">
              <strong>Demo:</strong> Completa los campos obligatorios.
              Los campos de teléfono y dirección son opcionales.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
