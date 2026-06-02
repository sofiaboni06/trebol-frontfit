import { z } from "zod";

export const loginSchema = z.object({
  correo: z.string().nonempty("Por favor completa todos los campos"),
  password: z.string().nonempty("Por favor completa todos los campos"),
});

export const registerSchema = z.object({
  nombre: z.string().nonempty("Por favor completa todos los campos obligatorios"),
  apellido: z.string().nonempty("Por favor completa todos los campos obligatorios"),
  correo: z.string().email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: z.string().nonempty("Por favor completa todos los campos obligatorios"),
  telefono: z.string().optional(),
  direccion: z.string().optional(),
});

export const LoginFormData = loginSchema;
export const RegisterFormData = registerSchema;
