import BottomNav from '@/components/BottomNav';
import { MapPin, Navigation, Shield, AlertTriangle } from 'lucide-react';

const safeZones = [
  { name: 'Indiranagar', safety: 92, color: 'bg-safe' },
  { name: 'Koramangala', safety: 78, color: 'bg-safe' },
  { name: 'MG Road', safety: 85, color: 'bg-safe' },
  { name: 'Whitefield', safety: 65, color: 'bg-warning' },
  { name: 'Electronic City', safety: 45, color: 'bg-danger' },
];

export default function MapPage() {
  return (
    <div className="min-h-screen pb-24">
      {/* Simulated Map */}
      <div className="relative h-[55vh] bg-gradient-to-br from-muted/50 to-background overflow-hidden">
        {/* Grid pattern for map effect */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(hsl(258 100% 62% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(258 100% 62% / 0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Route line */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 500">
          {/* Safe route */}
          <path d="M 100 400 Q 150 300 200 250 Q 250 200 300 150 Q 350 100 320 60"
            fill="none" stroke="hsl(145 70% 50%)" strokeWidth="4" strokeDasharray="8 4" opacity="0.8" />
          {/* Risky route */}
          <path d="M 100 400 Q 80 300 120 200 Q 160 100 320 60"
            fill="none" stroke="hsl(0 84% 60%)" strokeWidth="3" strokeDasharray="8 4" opacity="0.4" />
        </svg>

        {/* Location markers */}
        <div className="absolute bottom-24 left-20 animate-float">
          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center glow-purple">
            <Navigation size={18} />
          </div>
          <div className="text-xs mt-1 glass px-2 py-1 rounded-lg font-medium">You</div>
        </div>
        <div className="absolute top-16 right-16">
          <div className="w-8 h-8 rounded-full bg-safe/20 flex items-center justify-center border border-safe/40">
            <MapPin size={16} className="text-safe" />
          </div>
          <div className="text-xs mt-1 glass px-2 py-1 rounded-lg font-medium">Destination</div>
        </div>

        {/* Risk zone */}
        <div className="absolute top-40 left-16">
          <div className="w-20 h-20 rounded-full bg-danger/10 border border-danger/20 flex items-center justify-center animate-pulse">
            <AlertTriangle size={20} className="text-danger" />
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 glass-card p-3 rounded-xl text-xs">
          <div className="flex items-center gap-2 mb-1"><span className="w-3 h-1 rounded bg-safe" /> Safe Route</div>
          <div className="flex items-center gap-2"><span className="w-3 h-1 rounded bg-danger" /> Risky Route</div>
        </div>
      </div>

      {/* Safety Scores */}
      <div className="px-4 pt-6">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
          <Shield size={14} /> Area Safety Scores
        </h3>
        <div className="space-y-3">
          {safeZones.map(zone => (
            <div key={zone.name} className="glass-card p-4 flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full ${zone.color}`} />
              <span className="flex-1 font-medium">{zone.name}</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full ${zone.color}`} style={{ width: `${zone.safety}%` }} />
                </div>
                <span className="text-sm font-semibold w-8 text-right">{zone.safety}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
