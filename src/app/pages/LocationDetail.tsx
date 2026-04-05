import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Clock, MapPin, Users, TrendingUp, Bell, Share2, MessageSquare, Activity, Stethoscope, CheckCircle, Navigation } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Alert, AlertDescription } from "../components/ui/alert";
import { ReportDialog } from "../components/ReportDialog";
import { QuickPollDialog, QuickPollAnswers } from "../components/QuickPollDialog";
import { mockLocations, mockReports } from "../data/mockData";
import { getRelativeTime, getWaitTimeColor, getWaitTimeBgColor, getWaitTimeLabel } from "../utils/timeUtils";
import { toast } from "sonner";
import { WaitTimeReport } from "../types/location";
import { useGeolocation, isNearLocation } from "../hooks/useGeolocation";

export function LocationDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [quickPollOpen, setQuickPollOpen] = useState(false);
  const [reports, setReports] = useState<WaitTimeReport[]>(mockReports);
  const { latitude, longitude, error: geoError } = useGeolocation();
  
  const location = mockLocations.find(loc => loc.id === id);

  // Verifica se o usuário está próximo desta unidade
  const isNearby = location ? isNearLocation(
    latitude,
    longitude,
    location.coordinates.lat,
    location.coordinates.lng,
    100 // raio de 100 metros
  ) : false;

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Local não encontrado</p>
          <Button onClick={() => navigate("/")}>Voltar</Button>
        </div>
      </div>
    );
  }

  const locationReports = reports.filter(r => r.locationId === id);

  const handleReportSubmit = (waitTime: number, crowdLevel: string, userName: string, serviceType: string) => {
    const newReport: WaitTimeReport = {
      id: `r${Date.now()}`,
      locationId: id!,
      waitTime,
      reportedBy: userName,
      reportedAt: new Date(),
      crowdLevel: crowdLevel as 'baixo' | 'médio' | 'alto',
      serviceType: serviceType as 'consulta' | 'emergência' | 'exame' | 'procedimento',
    };

    setReports([newReport, ...reports]);
    toast.success("Relato enviado com sucesso!", {
      description: "Obrigado por ajudar a comunidade!"
    });
  };

  const handleQuickPollSubmit = (answers: QuickPollAnswers) => {
    if (answers.waitTime !== undefined) {
      const crowdLevelMap: Record<string, 'baixo' | 'médio' | 'alto'> = {
        'vazio': 'baixo',
        'tranquilo': 'baixo',
        'movimento': 'médio',
        'lotado': 'alto',
        'muito-lotado': 'alto',
      };

      const newReport: WaitTimeReport = {
        id: `r${Date.now()}`,
        locationId: id!,
        waitTime: answers.waitTime,
        reportedBy: "Usuário Anônimo",
        reportedAt: new Date(),
        crowdLevel: crowdLevelMap[answers.crowdLevel || 'movimento'],
        serviceType: 'consulta',
      };

      setReports([newReport, ...reports]);
    }
  };
  
  useEffect(() => {
    if (isNearby) {
      toast.info("Você está próximo a este local!");
    }
  }, [isNearby]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="mb-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-xl font-bold">{location.name}</h1>
            {location.acceptsEmergency && (
              <Badge variant="destructive" className="text-xs">
                <Activity className="w-3 h-3 mr-1" />
                Emergência
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <MapPin className="w-4 h-4" />
            <span>{location.address}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{location.category}</Badge>
            {location.specialties && location.specialties.map((specialty) => (
              <Badge key={specialty} variant="outline" className="text-xs">
                <Stethoscope className="w-3 h-3 mr-1" />
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {/* Geolocation Alert */}
        {isNearby && (
          <Alert className="bg-green-50 border-green-200">
            <Navigation className="h-4 w-4 text-green-600" />
            <AlertDescription>
              <strong>Você está aqui!</strong> Ajude outros usuários respondendo à pergunta rápida.
            </AlertDescription>
          </Alert>
        )}

        {!isNearby && !geoError && (
          <Alert className="bg-blue-50 border-blue-200">
            <MapPin className="h-4 w-4 text-blue-600" />
            <AlertDescription>
              Consultando para decidir onde ir? Confira o tempo de espera abaixo.
            </AlertDescription>
          </Alert>
        )}

        {/* Current Wait Time Card */}
        <Card className="p-6">
          <div className="text-center mb-4">
            <div className="text-sm text-gray-600 mb-2">Tempo de espera atual</div>
            <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full border-4 ${getWaitTimeBgColor(location.currentWaitTime)}`}>
              <div className="text-center">
                <div className={`text-4xl font-bold ${getWaitTimeColor(location.currentWaitTime)}`}>
                  {location.currentWaitTime}
                </div>
                <div className="text-sm text-gray-600">minutos</div>
              </div>
            </div>
            <div className={`mt-3 text-sm font-medium ${getWaitTimeColor(location.currentWaitTime)}`}>
              {getWaitTimeLabel(location.currentWaitTime)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold">{location.avgWaitTime}</div>
              <div className="text-xs text-gray-600">Média geral (min)</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold">{location.totalReports}</div>
              <div className="text-xs text-gray-600">Total de relatos</div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t text-center text-sm text-gray-500">
            Última atualização: {getRelativeTime(location.lastUpdated)} por {location.updatedBy}
          </div>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => toast.info("Funcionalidade em breve")}
          >
            <Bell className="w-4 h-4 mr-2" />
            Notificar-me
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => toast.success("Link copiado!")}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Compartilhar
          </Button>
        </div>

        {/* Recent Reports */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-gray-600" />
            <h2 className="font-semibold">Relatos recentes</h2>
          </div>

          <div className="space-y-3">
            {locationReports.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                Nenhum relato ainda. Seja o primeiro!
              </p>
            ) : (
              locationReports.slice(0, 5).map((report) => (
                <div key={report.id} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-medium text-sm">{report.reportedBy}</div>
                        <div className="text-xs text-gray-500">{getRelativeTime(report.reportedAt)}</div>
                        {report.serviceType && (
                          <Badge variant="outline" className="text-xs mt-1">
                            {report.serviceType}
                          </Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${getWaitTimeColor(report.waitTime)}`}>
                          {report.waitTime} min
                        </div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {report.crowdLevel}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Floating Report Button */}
      <div className="fixed bottom-6 left-0 right-0 px-4 max-w-4xl mx-auto">
        {isNearby ? (
          <div className="space-y-2">
            <Button
              size="lg"
              className="w-full shadow-lg bg-blue-600 hover:bg-blue-700"
              onClick={() => setQuickPollOpen(true)}
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Estou aqui - Responder pergunta rápida
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full shadow-lg bg-white"
              onClick={() => setReportDialogOpen(true)}
            >
              <Clock className="w-5 h-5 mr-2" />
              Relato detalhado
            </Button>
          </div>
        ) : (
          <Alert className="shadow-lg">
            <AlertDescription className="text-sm text-center">
              Para contribuir com informações, você precisa estar próximo desta unidade
            </AlertDescription>
          </Alert>
        )}
      </div>
      
      <QuickPollDialog
        locationName={location.name}
        open={quickPollOpen}
        onOpenChange={setQuickPollOpen}
        onSubmit={handleQuickPollSubmit}
      />

      <ReportDialog
        locationName={location.name}
        open={reportDialogOpen}
        onOpenChange={setReportDialogOpen}
        onSubmit={handleReportSubmit}
      />
    </div>
  );
}