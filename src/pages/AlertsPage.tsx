import { useApp } from '@/context/AppContext';
import BottomNav from '@/components/BottomNav';
import { Bell, AlertTriangle, Shield, MapPin, Mic, CheckCircle } from 'lucide-react';

const typeIcons = {
  sos: Shield,
  deviation: MapPin,
  fall: AlertTriangle,
  scream: Mic,
};

const typeColors = {
  sos: 'text-danger bg-danger/10',
  deviation: 'text-warning bg-warning/10',
  fall: 'text-danger bg-danger/10',
  scream: 'text-secondary bg-secondary/10',
};

export default function AlertsPage() {
  const { alerts, resolveAlert } = useApp();

  const active = alerts.filter(a => a.status === 'active');
  const past = alerts.filter(a => a.status !== 'active');

  const formatTime = (d: Date) => {
    const diff = Date.now() - d.getTime();
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return d.toLocaleDateString();
  };

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Bell size={24} className="text-primary" /> Alerts
      </h1>

      {active.length > 0 && (
        <>
          <h3 className="text-sm font-semibold text-danger uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-danger animate-pulse" /> Active Alerts
          </h3>
          <div className="space-y-3 mb-8">
            {active.map(alert => {
              const Icon = typeIcons[alert.type];
              return (
                <div key={alert.id} className="glass-card p-4 border border-danger/20 animate-slide-up">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${typeColors[alert.type]}`}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{alert.message}</p>
                      {alert.location && <p className="text-sm text-muted-foreground mt-1">📍 {alert.location}</p>}
                      <p className="text-xs text-muted-foreground mt-1">{formatTime(alert.timestamp)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => resolveAlert(alert.id)}
                    className="mt-3 w-full glass py-2 rounded-xl text-sm font-semibold text-safe flex items-center justify-center gap-1 hover:bg-white/10 transition-colors"
                  >
                    <CheckCircle size={14} /> Mark as Resolved
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}

      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">History</h3>
      <div className="space-y-3">
        {past.length === 0 ? (
          <div className="glass-card p-8 text-center text-muted-foreground">
            <Shield size={32} className="mx-auto mb-2 opacity-30" />
            <p>No past alerts</p>
          </div>
        ) : (
          past.map(alert => {
            const Icon = typeIcons[alert.type];
            return (
              <div key={alert.id} className="glass-card p-4 opacity-60">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${typeColors[alert.type]}`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{alert.message}</p>
                    {alert.location && <p className="text-sm text-muted-foreground mt-1">📍 {alert.location}</p>}
                    <p className="text-xs text-muted-foreground mt-1">{formatTime(alert.timestamp)}</p>
                  </div>
                  <span className="text-xs text-safe font-medium">Resolved</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      <BottomNav />
    </div>
  );
}
