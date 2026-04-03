import { useApp } from '@/context/AppContext';
import BottomNav from '@/components/BottomNav';
import { ArrowLeft, Moon, Shield, Volume2, Vibrate, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {
  const { nightMode, setNightMode, sensitivity, setSensitivity, guardianMode, setGuardianMode } = useApp();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 glass-card rounded-xl">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="space-y-4">
        {/* Detection Sensitivity */}
        <div className="glass-card p-5">
          <h3 className="font-semibold mb-1 flex items-center gap-2">
            <Volume2 size={18} className="text-primary" /> Detection Sensitivity
          </h3>
          <p className="text-sm text-muted-foreground mb-4">How sensitive the AI detection should be</p>
          <input
            type="range"
            min={10}
            max={100}
            value={sensitivity}
            onChange={e => setSensitivity(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Low</span>
            <span className="font-semibold text-primary">{sensitivity}%</span>
            <span>High</span>
          </div>
        </div>

        {/* Toggles */}
        {[
          { icon: Moon, label: 'Night Guardian Mode', desc: 'Enhanced protection from 8 PM to 6 AM', value: nightMode, set: setNightMode },
          { icon: Shield, label: 'Guardian Mode', desc: 'Allow trusted contacts to monitor you', value: guardianMode, set: setGuardianMode },
        ].map(item => (
          <div key={item.label} className="glass-card p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <item.icon size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">{item.label}</p>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
            <button
              onClick={() => item.set(!item.value)}
              className={`w-12 h-7 rounded-full transition-all ${item.value ? 'gradient-primary' : 'bg-muted'} relative`}
            >
              <div className={`w-5 h-5 rounded-full bg-foreground absolute top-1 transition-all ${item.value ? 'left-6' : 'left-1'}`} />
            </button>
          </div>
        ))}

        {/* Alert Preferences */}
        <div className="glass-card p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Bell size={18} className="text-primary" /> Alert Preferences
          </h3>
          {['SMS Alerts', 'Sound Alarm', 'Vibration Alert', 'Flash Light'].map(pref => (
            <div key={pref} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
              <span className="text-sm">{pref}</span>
              <div className="w-10 h-6 rounded-full gradient-primary relative">
                <div className="w-4 h-4 rounded-full bg-foreground absolute top-1 left-5" />
              </div>
            </div>
          ))}
        </div>

        {/* Demo Mode */}
        <div className="glass-card p-5 border border-secondary/20">
          <h3 className="font-semibold mb-1 gradient-text">🎮 Demo Mode</h3>
          <p className="text-sm text-muted-foreground mb-3">Simulate safety scenarios for testing</p>
          <div className="grid grid-cols-2 gap-2">
            <button className="glass py-2 rounded-xl text-xs font-semibold hover:bg-white/10 transition-colors">
              Simulate Fall
            </button>
            <button className="glass py-2 rounded-xl text-xs font-semibold hover:bg-white/10 transition-colors">
              Simulate Scream
            </button>
            <button className="glass py-2 rounded-xl text-xs font-semibold hover:bg-white/10 transition-colors">
              Route Deviation
            </button>
            <button className="glass py-2 rounded-xl text-xs font-semibold hover:bg-white/10 transition-colors">
              Full SOS Test
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
