import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import BottomNav from '@/components/BottomNav';
import { Shield, Phone, X } from 'lucide-react';

export default function SOSPage() {
  const { triggerSOS, safetyStatus, setSafetyStatus } = useApp();
  const [triggered, setTriggered] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const navigate = useNavigate();

  const handleTrigger = () => {
    triggerSOS();
    setTriggered(true);
  };

  const handleCancel = () => {
    setSafetyStatus('safe');
    setTriggered(false);
  };

  return (
    <div className="min-h-screen pb-24 flex flex-col items-center justify-center px-6">
      {!triggered ? (
        <div className="flex flex-col items-center text-center">
          <p className="text-muted-foreground mb-8">Press and hold to activate emergency SOS</p>

          <div className="relative">
            {/* Pulse rings */}
            <div className="absolute inset-0 w-48 h-48 rounded-full border-2 border-danger/30 animate-radar" />
            <div className="absolute inset-0 w-48 h-48 rounded-full border-2 border-danger/20 animate-radar" style={{ animationDelay: '0.5s' }} />

            <button
              onMouseDown={() => {
                let p = 0;
                const interval = setInterval(() => {
                  p += 2;
                  setHoldProgress(p);
                  if (p >= 100) {
                    clearInterval(interval);
                    handleTrigger();
                  }
                }, 30);
                const up = () => {
                  clearInterval(interval);
                  setHoldProgress(0);
                  window.removeEventListener('mouseup', up);
                  window.removeEventListener('touchend', up);
                };
                window.addEventListener('mouseup', up);
                window.addEventListener('touchend', up);
              }}
              onTouchStart={() => {
                let p = 0;
                const interval = setInterval(() => {
                  p += 2;
                  setHoldProgress(p);
                  if (p >= 100) {
                    clearInterval(interval);
                    handleTrigger();
                  }
                }, 30);
                const up = () => {
                  clearInterval(interval);
                  setHoldProgress(0);
                  window.removeEventListener('touchend', up);
                };
                window.addEventListener('touchend', up);
              }}
              className="relative w-48 h-48 rounded-full bg-gradient-to-br from-destructive to-secondary flex items-center justify-center transition-transform active:scale-95 select-none"
              style={{
                boxShadow: `0 0 ${holdProgress}px hsl(0 84% 60% / ${holdProgress / 100})`,
              }}
            >
              {/* Progress ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" fill="none" stroke="hsl(0 0% 100% / 0.1)" strokeWidth="3" />
                <circle
                  cx="50" cy="50" r="46" fill="none" stroke="hsl(0 0% 100% / 0.8)" strokeWidth="3"
                  strokeDasharray={`${holdProgress * 2.89} 289`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="flex flex-col items-center">
                <Shield size={48} className="mb-2" />
                <span className="text-xl font-extrabold">SOS</span>
              </div>
            </button>
          </div>

          <p className="text-muted-foreground/60 text-sm mt-8">Hold for 1.5 seconds to activate</p>

          {/* Quick call */}
          <button
            onClick={handleTrigger}
            className="mt-6 glass-card px-6 py-3 rounded-xl flex items-center gap-3 text-danger font-semibold hover:bg-white/10 transition-colors"
          >
            <Phone size={18} />
            Quick Emergency Call
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center animate-slide-up">
          <div className="w-32 h-32 rounded-full bg-danger/20 flex items-center justify-center mb-6 animate-pulse-glow">
            <Shield size={56} className="text-danger" />
          </div>
          <h2 className="text-3xl font-extrabold text-danger mb-2">SOS ACTIVATED</h2>
          <p className="text-muted-foreground mb-8">
            Emergency alerts sent to all trusted contacts. Live location sharing active.
          </p>

          <div className="glass-card p-4 rounded-xl mb-6 w-full max-w-xs">
            <p className="text-sm text-muted-foreground mb-2">Sending alerts to:</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-safe" /> Mom — SMS Sent ✓</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-safe" /> Ananya — SMS Sent ✓</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-warning animate-pulse" /> Dad — Sending...</div>
            </div>
          </div>

          <button
            onClick={handleCancel}
            className="glass-card px-8 py-3 rounded-xl flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={18} />
            Cancel SOS
          </button>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
