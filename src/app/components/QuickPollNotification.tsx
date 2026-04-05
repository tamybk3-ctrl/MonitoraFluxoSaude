import { MapPin, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface QuickPollNotificationProps {
  locationName: string;
  onAnswer: () => void;
  onDismiss: () => void;
}

export function QuickPollNotification({ locationName, onAnswer, onDismiss }: QuickPollNotificationProps) {
  return (
    <Card className="fixed bottom-6 left-4 right-4 max-w-md mx-auto shadow-xl border-2 border-blue-500 bg-white z-50 animate-in slide-in-from-bottom">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-2 flex-1">
            <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm mb-1">Você está aqui?</p>
              <p className="text-xs text-gray-600">{locationName}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="h-6 w-6 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <Button
          className="w-full"
          onClick={onAnswer}
        >
          Responder pergunta rápida (5 seg)
        </Button>
      </div>
    </Card>
  );
}
