import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Map, Shield, Bell, User } from 'lucide-react';

const tabs = [
  { path: '/dashboard', icon: Home, label: 'Home' },
  { path: '/map', icon: Map, label: 'Map' },
  { path: '/sos', icon: Shield, label: 'SOS' },
  { path: '/alerts', icon: Bell, label: 'Alerts' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/10">
      <div className="flex items-center justify-around max-w-md mx-auto py-2">
        {tabs.map(tab => {
          const active = pathname === tab.path || (tab.path === '/dashboard' && pathname.startsWith('/ride'));
          const isSOS = tab.label === 'SOS';
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                isSOS
                  ? 'relative -mt-6'
                  : active
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              {isSOS ? (
                <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center glow-purple animate-pulse-glow">
                  <tab.icon size={24} />
                </div>
              ) : (
                <tab.icon size={22} />
              )}
              <span className={`text-[10px] font-medium ${isSOS ? 'mt-1' : ''}`}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
