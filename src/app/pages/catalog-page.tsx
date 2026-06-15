import { useState, useEffect, useMemo } from "react";
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
  // Estado de productos
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  // Estado de filtros
  const [selectedCategories, setSelectedCategories] = useState<(string | number)[]>([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState("featured");
  const [searchTerm, setSearchTerm] = useState("");

  // Atributos dinámicos para filtros
  const [filterAttributes, setFilterAttributes] = useState<any>({
    tiposProducto: [],
    priceRange: { min: 0, max: 5000 },
  });

  // Extraer categorías dinámicas de los productos sin duplicados
  const dynamicCategories = useMemo(() => {
    if (!allProducts.length) return [];
    
    const categoryMap = new Map();
    allProducts.forEach((product: any) => {
      if (product.categoria?.nombre) {
        const key = product.categoria.nombre;
        if (!categoryMap.has(key)) {
          categoryMap.set(key, {
            id: product.categoria.id,
            nombre: product.categoria.nombre,
            descripcion: product.categoria.descripcion,
            imagen: product.categoria.imagen,
          });
        }
      }
    });
    return Array.from(categoryMap.values());
  }, [allProducts]);

  // Cargar productos del backend
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getProducts();
        const productsArray = Array.isArray(data) ? data : data.data || [];
        
        setAllProducts(productsArray);

        // Extraer atributos dinámicos para los filtros
        const attributes = productService.getFilterAttributes(productsArray);
        setFilterAttributes(attributes);

        // Inicializar rango de precio con valores calculados
        if (attributes.priceRange.max > 0) {
          setPriceRange([
            attributes.priceRange.min,
            Math.ceil(attributes.priceRange.max),
          ]);
        }

        setError(null);
      } catch (err) {
        console.error("Error cargando productos:", err);
        setError("Error al cargar productos");
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Aplicar filtros cada vez que cambien
  useEffect(() => {
    const filters = {
      categories: selectedCategories,
      priceMin: priceRange[0],
      priceMax: priceRange[1],
      search: searchTerm,
      sortBy: sortBy,
    };

    const filtered = productService.filterAndSort(allProducts, filters);
    setFilteredProducts(filtered);
  }, [allProducts, selectedCategories, priceRange, searchTerm, sortBy]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const toggleCategory = (categoryId: string | number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((cat) => cat !== categoryId)
        : [...prev, categoryId]
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([filterAttributes.priceRange.min, filterAttributes.priceRange.max]);
    setSearchTerm("");
    setSortBy("featured");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F1EA] py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E5E4E] mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando catálogo...</p>
        </div>
      </div>
    );
  }

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
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-[#2E5E4E]" />
                  <h2 className="text-lg font-semibold text-[#1E2B24]">
                    Filtros
                  </h2>
                </div>
                {(selectedCategories.length > 0 || searchTerm) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="text-xs text-[#2E5E4E] hover:bg-[#2E5E4E]/10"
                  >
                    Limpiar
                  </Button>
                )}
              </div>

              {/* Search */}
              <div className="mb-6">
                <h3 className="font-semibold text-[#1E2B24] mb-3">Buscar</h3>
                <input
                  type="text"
                  placeholder="Nombre del producto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5E4E]"
                />
              </div>

              {/* Category Filter - Dinámico */}
              {dynamicCategories.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-[#1E2B24] mb-3">
                    Categoría
                  </h3>
                  <div className="space-y-2">
                    {dynamicCategories.map((category: any) => (
                      <div key={category.id || category.nombre} className="flex items-center gap-2">
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => toggleCategory(category.id)}
                        />
                        <label
                          htmlFor={`category-${category.id}`}
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          {category.nombre}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold text-[#1E2B24] mb-3">
                  Rango de precio
                </h3>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={filterAttributes.priceRange.min}
                  max={filterAttributes.priceRange.max}
                  step={50}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${Math.floor(priceRange[0])}</span>
                  <span>${Math.floor(priceRange[1])}</span>
                </div>
              </div>

              <Button
                className="w-full bg-[#2E5E4E] hover:bg-[#1E2B24] text-white rounded-full"
                onClick={resetFilters}
              >
                Resetear filtros
              </Button>
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sort & View Options */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {filteredProducts.length} de {allProducts.length} productos
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
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
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product: any) => (
                  <Card
                    key={product.id}
                    className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 bg-white"
                  >
                    <Link to={`/producto/${product.id}`}>
                      <div className="relative w-full h-[260px] overflow-hidden bg-gray-100">
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
                        {product.descripcion
                          ? product.descripcion.substring(0, 50) + "..."
                          : "Producto disponible"}
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
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">
                  No se encontraron productos que coincidan con los filtros seleccionados.
                </p>
                <Button
                  onClick={resetFilters}
                  className="bg-[#2E5E4E] hover:bg-[#1E2B24] text-white rounded-full"
                >
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
