import { Clock, MapPin, Users, TrendingUp, Activity } from "lucide-react";
import { Location } from "../types/location";
import { getRelativeTime, getWaitTimeColor, getWaitTimeBgColor } from "../utils/timeUtils";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface LocationCardProps {
  location: Location;
  onClick: () => void;
}

export function LocationCard({ location, onClick }: LocationCardProps) {
  return (
    <Card 
      className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold truncate">{location.name}</h3>
            {location.acceptsEmergency && (
              <Activity className="w-4 h-4 text-red-500 flex-shrink-0" title="Atende emergência" />
            )}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-2">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{location.address}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-2">
            <Badge variant="secondary" className="text-xs">
              {location.category}
            </Badge>
            {location.specialties && location.specialties.length > 0 && (
              <Badge variant="outline" className="text-xs">
                {location.specialties[0]}
                {location.specialties.length > 1 && ` +${location.specialties.length - 1}`}
              </Badge>
            )}
          </div>
        </div>

        <div className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg border-2 ${getWaitTimeBgColor(location.currentWaitTime)} min-w-[80px]`}>
          <Clock className={`w-5 h-5 mb-1 ${getWaitTimeColor(location.currentWaitTime)}`} />
          <div className={`text-2xl font-bold ${getWaitTimeColor(location.currentWaitTime)}`}>
            {location.currentWaitTime}
          </div>
          <div className="text-xs text-gray-600">min</div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5" />
          <span>{location.totalReports} relatos</span>
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Média: {location.avgWaitTime} min</span>
        </div>
        <div className="text-gray-400">
          {getRelativeTime(location.lastUpdated)}
        </div>
      </div>
    </Card>
  );
}