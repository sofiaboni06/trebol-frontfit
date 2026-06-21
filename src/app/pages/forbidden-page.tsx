import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router";
import { ShieldAlert } from "lucide-react";

export function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-[#F4F1EA] flex items-center justify-center py-12 px-4">
      <Card className="max-w-2xl w-full p-10 rounded-3xl shadow-2xl border border-gray-200 bg-white">
        <div className="flex flex-col items-center text-center gap-6">
          <ShieldAlert className="w-14 h-14 text-[#2E5E4E]" />
          <div>
            <h1 className="text-4xl font-bold text-[#1E2B24]">403</h1>
            <p className="mt-2 text-lg text-gray-600">
              No tienes permisos para acceder a esta sección.
            </p>
          </div>
          <div className="space-x-3">
            <Link to="/admin">
              <Button variant="secondary">Volver al panel</Button>
            </Link>
            <Link to="/login">
              <Button>Iniciar sesión</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
