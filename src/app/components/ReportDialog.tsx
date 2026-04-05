import { useState } from "react";
import { Clock, Users, Send, Activity } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { toast } from "sonner";

interface ReportDialogProps {
  locationName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (waitTime: number, crowdLevel: string, userName: string, serviceType: string) => void;
}

export function ReportDialog({ locationName, open, onOpenChange, onSubmit }: ReportDialogProps) {
  const [waitTime, setWaitTime] = useState("");
  const [crowdLevel, setCrowdLevel] = useState<string>("médio");
  const [userName, setUserName] = useState("");
  const [serviceType, setServiceType] = useState<string>("consulta");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!waitTime || !userName) {
      toast.error("Preencha todos os campos");
      return;
    }

    const waitTimeNum = parseInt(waitTime);
    if (isNaN(waitTimeNum) || waitTimeNum < 0) {
      toast.error("Tempo de espera inválido");
      return;
    }

    onSubmit(waitTimeNum, crowdLevel, userName, serviceType);
    setWaitTime("");
    setCrowdLevel("médio");
    setUserName("");
    setServiceType("consulta");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reportar Tempo de Espera</DialogTitle>
          <DialogDescription>
            {locationName}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userName">Seu nome</Label>
            <Input
              id="userName"
              placeholder="Digite seu nome"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="waitTime">Tempo de espera (minutos)</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="waitTime"
                type="number"
                placeholder="Ex: 15"
                className="pl-10"
                value={waitTime}
                onChange={(e) => setWaitTime(e.target.value)}
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tipo de atendimento</Label>
            <RadioGroup value={serviceType} onValueChange={setServiceType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="consulta" id="consulta" />
                <Label htmlFor="consulta" className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-600" />
                    <span>Consulta</span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="emergência" id="emergência" />
                <Label htmlFor="emergência" className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-red-600" />
                    <span>Emergência</span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="exame" id="exame" />
                <Label htmlFor="exame" className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-purple-600" />
                    <span>Exame</span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="procedimento" id="procedimento" />
                <Label htmlFor="procedimento" className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-orange-600" />
                    <span>Procedimento</span>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Nível de lotação</Label>
            <RadioGroup value={crowdLevel} onValueChange={setCrowdLevel}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="baixo" id="baixo" />
                <Label htmlFor="baixo" className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-600" />
                    <span>Baixo - Poucas pessoas</span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="médio" id="médio" />
                <Label htmlFor="médio" className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-yellow-600" />
                    <span>Médio - Movimento normal</span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="alto" id="alto" />
                <Label htmlFor="alto" className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-red-600" />
                    <span>Alto - Muito cheio</span>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              <Send className="w-4 h-4 mr-2" />
              Enviar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}