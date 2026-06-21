import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import authService from "../services/auth.service";

/**
 * Hook personalizado para manejar autenticación
 * Proporciona acceso al estado de autenticación en cualquier componente
 */
export function useAuth() {
  const [user, setUser] = useState(() => authService.getUser());
  const [token, setToken] = useState(() => authService.getToken());
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedToken = authService.getToken();
    const storedUser = authService.getUser();
    return authService.isTokenValid(storedToken) && !!storedUser;
  });
  const [loading, setLoading] = useState(false);

  // Verificar autenticación al montar el componente
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedToken = authService.getToken();
        const storedUser = authService.getUser();

        if (storedToken && storedUser && authService.isTokenValid(storedToken)) {
          setToken(storedToken);
          setUser(storedUser);
          setIsAuthenticated(true);
        } else {
          authService.clearSession();
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error al verificar autenticación:", error);
        authService.clearSession();
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Escuchar eventos de logout disparados globalmente (por ejemplo, interceptor 401)
  useEffect(() => {
    const handleExternalLogout = () => {
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
    };

    const storageHandler = (e) => {
      if (e.key === 'token' && e.newValue == null) {
        handleExternalLogout();
      }
      if (e.key === 'usuario' && e.newValue == null) {
        handleExternalLogout();
      }
    };

    window.addEventListener('auth:logout', handleExternalLogout);
    window.addEventListener('storage', storageHandler);

    return () => {
      window.removeEventListener('auth:logout', handleExternalLogout);
      window.removeEventListener('storage', storageHandler);
    };
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authService.login(email, password);

      const storedToken = authService.getToken();
      const storedUser = authService.getUser();

      const authenticated = storedToken && storedUser && authService.isTokenValid(storedToken);
      setToken(authenticated ? storedToken : null);
      setUser(authenticated ? storedUser : null);
      setIsAuthenticated(authenticated);

      if (!authenticated) {
        authService.clearSession();
      }

      return response;
    } catch (error) {
      setIsAuthenticated(false);
      authService.clearSession();
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authService.register(userData);

      const storedToken = authService.getToken();
      const storedUser = authService.getUser();

      const authenticated = storedToken && storedUser && authService.isTokenValid(storedToken);
      setToken(authenticated ? storedToken : null);
      setUser(authenticated ? storedUser : null);
      setIsAuthenticated(authenticated);

      if (!authenticated) {
        authService.clearSession();
      }

      return response;
    } catch (error) {
      setIsAuthenticated(false);
      authService.clearSession();
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  const logout = async () => {
    try {
      // Intentar notificar al backend y limpiar sesión
      await authService.logout();
    } catch (err) {
      // Si el servicio logout es sync o falla, continuar limpiando localmente
      console.warn("Logout error (continuando limpieza local):", err?.message || err);
    } finally {
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      // Redirigir al login
      try {
        navigate("/login");
      } catch (navErr) {
        // ignore navigation errors
      }
    }
  };

  const normalizeRoleName = (roleName) =>
    roleName?.toString().toUpperCase().replace(/^ROLE_/, "") || "";

  const hasRole = (roleName) => {
    const normalizedRoleName = normalizeRoleName(roleName);

    return !!user?.roles?.some((role) => {
      const storedRoleName = normalizeRoleName(role?.nombre);
      return storedRoleName === normalizedRoleName;
    });
  };

  const isAdmin = () => hasRole("ADMIN");

  const isSuperAdmin = () => hasRole("SUPER_ADMIN");

  const isCliente = () => hasRole("CLIENTE");

  return {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    hasRole,
    isAdmin,
    isSuperAdmin,
    isCliente,
  };
}
