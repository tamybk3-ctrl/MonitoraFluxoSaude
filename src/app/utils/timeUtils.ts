export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

  if (diffInMinutes < 1) return "agora";
  if (diffInMinutes === 1) return "há 1 minuto";
  if (diffInMinutes < 60) return `há ${diffInMinutes} minutos`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours === 1) return "há 1 hora";
  if (diffInHours < 24) return `há ${diffInHours} horas`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "há 1 dia";
  return `há ${diffInDays} dias`;
}

export function getWaitTimeColor(waitTime: number): string {
  if (waitTime <= 15) return "text-green-600";
  if (waitTime <= 30) return "text-yellow-600";
  if (waitTime <= 60) return "text-orange-600";
  return "text-red-600";
}

export function getWaitTimeBgColor(waitTime: number): string {
  if (waitTime <= 15) return "bg-green-100 border-green-300";
  if (waitTime <= 30) return "bg-yellow-100 border-yellow-300";
  if (waitTime <= 60) return "bg-orange-100 border-orange-300";
  return "bg-red-100 border-red-300";
}

export function getWaitTimeLabel(waitTime: number): string {
  if (waitTime <= 15) return "Baixa espera";
  if (waitTime <= 30) return "Espera moderada";
  if (waitTime <= 60) return "Espera alta";
  return "Espera muito alta";
}
