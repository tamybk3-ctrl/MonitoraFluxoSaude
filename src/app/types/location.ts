export interface Location {
  id: string;
  name: string;
  category: string;
  type: 'hospital' | 'clinica' | 'posto' | 'laboratorio' | 'pronto-socorro' | 'upa';
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  specialties?: string[];
  currentWaitTime: number; // em minutos
  lastUpdated: Date;
  updatedBy: string;
  totalReports: number;
  avgWaitTime: number;
  acceptsEmergency?: boolean;
}

export interface WaitTimeReport {
  id: string;
  locationId: string;
  waitTime: number;
  reportedBy: string;
  reportedAt: Date;
  crowdLevel: 'baixo' | 'médio' | 'alto';
  serviceType?: 'consulta' | 'emergência' | 'exame' | 'procedimento';
}