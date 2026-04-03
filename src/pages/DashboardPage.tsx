import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import BottomNav from '@/components/BottomNav';
import { Shield, MapPin, Car, Eye, Moon, ChevronRight, Bell } from 'lucide-react';

export default function DashboardPage() {
  const { userName, safetyStatus, guardianMode, setGuardianMode, alerts } = useApp();
  const navigate = useNavigate();
  const activeAlerts = alerts.filter(a => a.status === 'active').length;

  const statusConfig = {
    safe: { label: 'PROTECTED', color: 'text-safe', glow: 'glow-safe', ring: 'border-safe/30' },
    alert: { label: 'ALERT ACTIVE', color: 'text-warning', glow: '', ring: 'border-warning/30' },
    danger: { label: 'EMERGENCY', color: 'text-danger', glow: 'glow-pink', ring: 'border-danger/30' },
  };
  const status = statusConfig[safetyStatus];

  const actions = [
    { icon: Car, label: 'Ride Shield', desc: 'Monitor your ride', path: '/ride', color: 'from-primary/20 to-accent/20' },
    { icon: MapPin, label: 'Share Location', desc: 'Send live location', path: '/map', color: 'from-secondary/20 to-primary/20' },
    { icon: Eye, label: 'Guardian Mode', desc: guardianMode ? 'Active' : 'Activate', path: '', color: 'from-accent/20 to-secondary/20' },
  ];

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-muted-foreground text-sm">Good evening,</p>
          <h1 className="text-2xl font-bold">{userName} 👋</h1>
        </div>
        <button onClick={() => navigate('/alerts')} className="relative p-3 glass-card rounded-xl">
          <Bell size={20} />
          {activeAlerts > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-danger text-[10px] font-bold flex items-center justify-center">
              {activeAlerts}
            </span>
          )}
        </button>
      </div>

      {/* Status Card */}
      <div className={`glass-card p-8 text-center mb-8 ${status.ring} border-2`}>
        <div className="relative inline-flex items-center justify-center mb-4">
          <div className={`w-24 h-24 rounded-full border-2 ${status.ring} flex items-center justify-center ${status.glow}`}>
            <Shield size={40} className={status.color} />
          </div>
          {safetyStatus === 'safe' && (
            <>
              <div className="absolute w-24 h-24 rounded-full border border-safe/20 animate-radar" />
              <div className="absolute w-24 h-24 rounded-full border border-safe/10 animate-radar" style={{ animationDelay: '0.7s' }} />
            </>
          )}
        </div>
        <h2 className={`text-2xl font-extrabold ${status.color}`}>{status.label}</h2>
        <p className="text-muted-foreground text-sm mt-2">All systems active • AI monitoring on</p>
      </div>

      {/* Quick Actions */}
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 gap-3 mb-8">
        {actions.map(action => (
          <button
            key={action.label}
            onClick={() => {
              if (action.label === 'Guardian Mode') {
                setGuardianMode(!guardianMode);
              } else {
                navigate(action.path);
              }
            }}
            className="glass-card p-4 flex items-center gap-4 hover:bg-white/10 transition-all active:scale-[0.98]"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center`}>
              <action.icon size={22} className="text-primary" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold">{action.label}</p>
              <p className="text-sm text-muted-foreground">{action.desc}</p>
            </div>
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Night Guardian */}
      <div className="glass-card p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
          <Moon size={22} className="text-secondary" />
        </div>
        <div className="flex-1">
          <p className="font-semibold">Night Guardian</p>
          <p className="text-sm text-muted-foreground">Extra protection after dark</p>
        </div>
        <button onClick={() => navigate('/settings')} className="text-primary text-sm font-semibold">
          Configure
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
