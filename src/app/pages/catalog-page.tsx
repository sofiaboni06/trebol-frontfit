import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Slider } from "../components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Heart, ShoppingCart, SlidersHorizontal } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import productService from "../../services/product.service";

export function CatalogPage() {
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar productos del backend
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getProducts();
        setProducts(Array.isArray(data) ? data : data.data || []);
        setError(null);
      } catch (err) {
        console.error('Error cargando productos:', err);
        setError('Error al cargar productos');
        // Mantener datos vacíos en caso de error
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Datos mock como fallback (por si el backend no está disponible)
  const fallbackProducts = [
    {
      id: 1,
      name: "Monstera Deliciosa",
      price: 890,
      category: "Interior",
      light: "Indirecta",
      image:
        "https://images.unsplash.com/photo-1525498128493-380d1990a112?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbmRvb3IlMjBtb25zdGVyYSUyMHBsYW50fGVufDF8fHx8MTc3OTk3NzU4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 2,
      name: "Ficus Lyrata",
      price: 1290,
      category: "Interior",
      light: "Brillante",
      image:
        "https://images.unsplash.com/photo-1531875985735-f135dac5f230?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZWQlMjBmaWRkbGUlMjBsZWFmJTIwZmlnJTIwdHJlZXxlbnwxfHx8fDE3Nzk5Nzc1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 3,
      name: "Sansevieria",
      price: 490,
      category: "Interior",
      light: "Baja",
      image:
        "https://images.unsplash.com/photo-1687552212914-03a30c82053c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmFrZSUyMHBsYW50JTIwc2Fuc2V2aWVyaWElMjBtb2Rlcm58ZW58MXx8fHwxNzc5OTc3NTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 4,
      name: "Pothos",
      price: 390,
      category: "Interior",
      light: "Indirecta",
      image:
        "https://images.unsplash.com/photo-1598880940080-ff9a29891b85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Rob3MlMjBoYW5naW5nJTIwcGxhbnQlMjBpbmRvb3J8ZW58MXx8fHwxNzc5OTc3NTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 5,
      name: "Palmera Tropical",
      price: 1590,
      category: "Exterior",
      light: "Directa",
      image:
        "https://images.unsplash.com/photo-1506634064465-7dab4de896ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMHBhbG0lMjBpbmRvb3IlMjBwbGFudHxlbnwxfHx8fDE3Nzk5Nzc1ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 6,
      name: "Suculentas Mix",
      price: 290,
      category: "Interior",
      light: "Brillante",
      image:
        "https://images.unsplash.com/photo-1459156212016-c812468e2115?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjdWxlbnQlMjBwbGFudHMlMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc3OTk3NzU4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 7,
      name: "Maceta Cerámica",
      price: 450,
      category: "Decoración",
      light: "-",
      image:
        "https://images.unsplash.com/photo-1721328004336-c19ee38adcd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcGxhbnQlMjBwb3RzJTIwbWluaW1hbGlzdHxlbnwxfHx8fDE3Nzk5Nzc1ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 8,
      name: "Kit Herramientas",
      price: 690,
      category: "Herramientas",
      light: "-",
      image:
        "https://images.unsplash.com/photo-1773430272849-5fa19c6f2c1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW5pbmclMjB0b29scyUyMHdvb2RlbiUyMGhhbmRsZXxlbnwxfHx8fDE3Nzk5Nzc1ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#1E2B24] mb-2">
            Catálogo de Plantas
          </h1>
          <p className="text-gray-600">
            Descubre nuestra selección premium de plantas y accesorios
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-24 backdrop-blur-sm bg-white/80 border-white/40 p-6">
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal className="w-5 h-5 text-[#2E5E4E]" />
                <h2 className="text-lg font-semibold text-[#1E2B24]">
                  Filtros
                </h2>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-[#1E2B24] mb-3">
                  Categoría
                </h3>
                <div className="space-y-2">
                  {[
                    "Plantas de Interior",
                    "Plantas de Exterior",
                    "Macetas",
                    "Fertilizantes",
                    "Herramientas",
                    "Decoración",
                  ].map((category) => (
                    <div key={category} className="flex items-center gap-2">
                      <Checkbox id={category} />
                      <label
                        htmlFor={category}
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold text-[#1E2B24] mb-3">
                  Rango de precio
                </h3>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={0}
                  max={5000}
                  step={100}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Light Requirements */}
              <div className="mb-6">
                <h3 className="font-semibold text-[#1E2B24] mb-3">
                  Nivel de luz
                </h3>
                <div className="space-y-2">
                  {["Baja", "Indirecta", "Brillante", "Directa"].map(
                    (light) => (
                      <div key={light} className="flex items-center gap-2">
                        <Checkbox id={light} />
                        <label
                          htmlFor={light}
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          {light}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>

              <Button className="w-full bg-[#2E5E4E] hover:bg-[#1E2B24] text-white rounded-full">
                Aplicar filtros
              </Button>
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sort & View Options */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">{products.length} productos</p>
              <Select defaultValue="featured">
                <SelectTrigger className="w-48 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Destacados</SelectItem>
                  <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                  <SelectItem value="price-high">
                    Precio: Mayor a Menor
                  </SelectItem>
                  <SelectItem value="name">Nombre A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 bg-white"
                >
                  <Link to={`/producto/${product.id}`}>
                    <div className="relative aspect-square overflow-hidden">
                      <ImageWithFallback
                        src={product.imagenPrincipal}
                        alt={product.nombre}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 flex gap-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(product.id);
                          }}
                          className="w-10 h-10 rounded-full backdrop-blur-md bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              favorites.includes(product.id)
                                ? "fill-red-500 text-red-500"
                                : "text-gray-700"
                            }`}
                          />
                        </button>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <span className="px-3 py-1 rounded-full backdrop-blur-md bg-white/80 text-xs font-semibold text-[#1E2B24]">
                          {product.categoria?.nombre || "Sin categoría"}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="p-5">
                    <Link to={`/producto/${product.id}`}>
                      <h3 className="text-lg font-semibold text-[#1E2B24] mb-1 group-hover:text-[#2E5E4E] transition-colors">
                        {product.nombre}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-3">
                      {product.descripcion ? product.descripcion.substring(0, 50) + "..." : "Producto disponible"}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-[#2E5E4E]">
                        ${parseFloat(product.precio).toFixed(0)}
                      </p>
                      <Button
                        size="sm"
                        className="bg-[#2E5E4E] hover:bg-[#1E2B24] text-white rounded-full"
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Agregar
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
