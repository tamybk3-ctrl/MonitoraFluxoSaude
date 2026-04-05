import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Search, Filter, Heart, Activity, MapPin, Navigation } from "lucide-react";
import { LocationCard } from "../components/LocationCard";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { QuickPollDialog, QuickPollAnswers } from "../components/QuickPollDialog";
import { mockLocations } from "../data/mockData";
import { Location } from "../types/location";
import { toast } from "sonner";
import { useGeolocation, isNearLocation } from "../hooks/useGeolocation";
import { Alert, AlertDescription } from "../components/ui/alert";

export function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [quickPollOpen, setQuickPollOpen] = useState(false);
  const [selectedLocationForPoll, setSelectedLocationForPoll] = useState<Location | null>(null);
  const { latitude, longitude, error: geoError, loading: geoLoading } = useGeolocation();
  
  const categories = Array.from(new Set(mockLocations.map(loc => loc.category)));

  // Verifica se o usuário está próximo de alguma unidade
  const nearbyLocation = mockLocations.find(loc => 
    isNearLocation(latitude, longitude, loc.coordinates.lat, loc.coordinates.lng, 100)
  );

  // Exibe pergunta rápida quando detectar que está próximo
  useEffect(() => {
    if (nearbyLocation && !quickPollOpen) {
      setSelectedLocationForPoll(nearbyLocation);
      setQuickPollOpen(true);
    }
  }, [nearbyLocation]);

  const handleQuickPollSubmit = (answers: QuickPollAnswers) => {
    // Aqui você processaria as respostas
    console.log("Respostas da enquete:", answers);
  };

  const filteredLocations = mockLocations.filter((location) => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || location.category === categoryFilter;
    const matchesEmergency = !emergencyOnly || location.acceptsEmergency;
    return matchesSearch && matchesCategory && matchesEmergency;
  });

  const sortedLocations = [...filteredLocations].sort((a, b) => a.currentWaitTime - b.currentWaitTime);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-blue-600 fill-blue-600" />
            <div>
              <h1 className="text-xl font-bold">MonitoraFluxoSaúde</h1>
              <p className="text-sm text-gray-600">Tempo de espera em tempo real</p>
            </div>
          </div>

          {/* Geolocation Status */}
          {geoLoading && (
            <Alert className="mb-3">
              <Navigation className="h-4 w-4 animate-pulse" />
              <AlertDescription>
                Solicitando permissão de localização...
              </AlertDescription>
            </Alert>
          )}

          {nearbyLocation && (
            <Alert className="mb-3 bg-blue-50 border-blue-200">
              <MapPin className="h-4 w-4 text-blue-600" />
              <AlertDescription>
                Você está próximo de <strong>{nearbyLocation.name}</strong>
              </AlertDescription>
            </Alert>
          )}

          {geoError && (
            <Alert className="mb-3 bg-yellow-50 border-yellow-200">
              <AlertDescription className="text-sm">
                📍 Ative a localização para receber perguntas rápidas quando estiver nas unidades
              </AlertDescription>
            </Alert>
          )}

          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar unidade de saúde..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-gray-500" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Emergency Filter */}
          <Button
            variant={emergencyOnly ? "default" : "outline"}
            size="sm"
            className="w-full"
            onClick={() => setEmergencyOnly(!emergencyOnly)}
          >
            <Activity className="w-4 h-4 mr-2" />
            {emergencyOnly ? "Mostrando apenas emergências" : "Filtrar por atendimento de emergência"}
          </Button>
        </div>
      </div>

      {/* Locations List */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-4 text-sm text-gray-600">
          {sortedLocations.length} {sortedLocations.length === 1 ? 'unidade encontrada' : 'unidades encontradas'}
        </div>

        {sortedLocations.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Nenhuma unidade encontrada</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedLocations.map((location) => (
              <LocationCard
                key={location.id}
                location={location}
                onClick={() => navigate(`/location/${location.id}`)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedLocationForPoll && (
        <QuickPollDialog
          locationName={selectedLocationForPoll.name}
          open={quickPollOpen}
          onOpenChange={setQuickPollOpen}
          onSubmit={handleQuickPollSubmit}
        />
      )}
    </div>
  );
}