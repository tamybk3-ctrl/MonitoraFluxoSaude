import { useState } from "react";
import { ThumbsUp, Users, Clock, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface QuickPollDialogProps {
  locationName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (answers: QuickPollAnswers) => void;
}

export interface QuickPollAnswers {
  isHere: boolean;
  waitTime?: number;
  crowdLevel?: 'vazio' | 'tranquilo' | 'movimento' | 'lotado' | 'muito-lotado';
}

export function QuickPollDialog({ locationName, open, onOpenChange, onSubmit }: QuickPollDialogProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuickPollAnswers>({ isHere: true });

  const handleWaitTimeSelect = (minutes: number) => {
    setAnswers({ ...answers, waitTime: minutes });
    setStep(3);
  };

  const handleCrowdLevelSelect = (level: QuickPollAnswers['crowdLevel']) => {
    const finalAnswers = { ...answers, crowdLevel: level };
    setAnswers(finalAnswers);
    onSubmit(finalAnswers);
    toast.success("Obrigado pela contribuição!", {
      description: "Sua resposta ajuda outros usuários"
    });
    resetAndClose();
  };

  const resetAndClose = () => {
    setStep(1);
    setAnswers({ isHere: true });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) resetAndClose();
      else onOpenChange(open);
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <DialogTitle className="text-lg">Pergunta Rápida</DialogTitle>
          </div>
          <p className="text-sm text-gray-600">{locationName}</p>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4 py-4">
            <p className="text-center font-medium">Você está nesta unidade agora?</p>
            <div className="grid grid-cols-2 gap-3">
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  toast.info("Obrigado pela resposta!");
                  resetAndClose();
                }}
                className="h-20"
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">👎</div>
                  <div className="text-sm">Não</div>
                </div>
              </Button>
              <Button
                size="lg"
                onClick={() => setStep(2)}
                className="h-20"
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">👍</div>
                  <div className="text-sm">Sim</div>
                </div>
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <p className="text-center font-medium">Quanto tempo está esperando?</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleWaitTimeSelect(5)}
                className="h-16 flex-col"
              >
                <div className="text-lg font-bold text-green-600">0-10 min</div>
                <div className="text-xs text-gray-500">Rápido</div>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleWaitTimeSelect(20)}
                className="h-16 flex-col"
              >
                <div className="text-lg font-bold text-yellow-600">10-30 min</div>
                <div className="text-xs text-gray-500">Moderado</div>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleWaitTimeSelect(45)}
                className="h-16 flex-col"
              >
                <div className="text-lg font-bold text-orange-600">30-60 min</div>
                <div className="text-xs text-gray-500">Demorado</div>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleWaitTimeSelect(90)}
                className="h-16 flex-col"
              >
                <div className="text-lg font-bold text-red-600">+60 min</div>
                <div className="text-xs text-gray-500">Muito longo</div>
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <p className="text-center font-medium">Como está a lotação?</p>
            </div>
            <div className="space-y-2">
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleCrowdLevelSelect('vazio')}
                className="w-full h-14 justify-start"
              >
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-green-600" />
                  <div className="text-left">
                    <div className="font-medium">Vazio</div>
                    <div className="text-xs text-gray-500">Poucas pessoas na sala de espera</div>
                  </div>
                </div>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleCrowdLevelSelect('tranquilo')}
                className="w-full h-14 justify-start"
              >
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div className="text-left">
                    <div className="font-medium">Tranquilo</div>
                    <div className="text-xs text-gray-500">Algumas pessoas esperando</div>
                  </div>
                </div>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleCrowdLevelSelect('movimento')}
                className="w-full h-14 justify-start"
              >
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-yellow-600" />
                  <div className="text-left">
                    <div className="font-medium">Movimento Normal</div>
                    <div className="text-xs text-gray-500">Sala de espera com boa ocupação</div>
                  </div>
                </div>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleCrowdLevelSelect('lotado')}
                className="w-full h-14 justify-start"
              >
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-orange-600" />
                  <div className="text-left">
                    <div className="font-medium">Lotado</div>
                    <div className="text-xs text-gray-500">Muitas pessoas aguardando</div>
                  </div>
                </div>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleCrowdLevelSelect('muito-lotado')}
                className="w-full h-14 justify-start"
              >
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-red-600" />
                  <div className="text-left">
                    <div className="font-medium">Muito Lotado</div>
                    <div className="text-xs text-gray-500">Sala de espera cheia</div>
                  </div>
                </div>
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
