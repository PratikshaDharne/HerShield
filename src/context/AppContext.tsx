import { useState, createContext, useContext, ReactNode } from 'react';

interface Contact {
  id: string;
  name: string;
  phone: string;
  relation: string;
  priority: number;
}

interface Alert {
  id: string;
  type: 'sos' | 'deviation' | 'fall' | 'scream';
  message: string;
  timestamp: Date;
  status: 'active' | 'resolved' | 'dismissed';
  location?: string;
}

interface RideData {
  id: string;
  vehicleNumber: string;
  driverVerified: boolean;
  startTime: Date;
  isActive: boolean;
  route: string;
}

interface AppState {
  isLoggedIn: boolean;
  hasOnboarded: boolean;
  userName: string;
  safetyStatus: 'safe' | 'alert' | 'danger';
  guardianMode: boolean;
  nightMode: boolean;
  sensitivity: number;
  contacts: Contact[];
  alerts: Alert[];
  currentRide: RideData | null;
  setLoggedIn: (v: boolean) => void;
  setOnboarded: (v: boolean) => void;
  setUserName: (v: string) => void;
  setSafetyStatus: (v: 'safe' | 'alert' | 'danger') => void;
  setGuardianMode: (v: boolean) => void;
  setNightMode: (v: boolean) => void;
  setSensitivity: (v: number) => void;
  addContact: (c: Contact) => void;
  removeContact: (id: string) => void;
  addAlert: (a: Alert) => void;
  resolveAlert: (id: string) => void;
  startRide: (r: RideData) => void;
  endRide: () => void;
  triggerSOS: () => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [hasOnboarded, setOnboarded] = useState(false);
  const [userName, setUserName] = useState('Priya');
  const [safetyStatus, setSafetyStatus] = useState<'safe' | 'alert' | 'danger'>('safe');
  const [guardianMode, setGuardianMode] = useState(false);
  const [nightMode, setNightMode] = useState(false);
  const [sensitivity, setSensitivity] = useState(70);
  const [currentRide, setCurrentRide] = useState<RideData | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'sos',
      message: 'SOS triggered near MG Road',
      timestamp: new Date(Date.now() - 3600000 * 2),
      status: 'resolved',
      location: 'MG Road, Bangalore',
    },
    {
      id: '2',
      type: 'deviation',
      message: 'Route deviation detected during ride',
      timestamp: new Date(Date.now() - 3600000 * 24),
      status: 'resolved',
      location: 'Koramangala, Bangalore',
    },
  ]);
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'Mom', phone: '+91 98765 43210', relation: 'Mother', priority: 1 },
    { id: '2', name: 'Ananya', phone: '+91 87654 32109', relation: 'Best Friend', priority: 2 },
    { id: '3', name: 'Dad', phone: '+91 76543 21098', relation: 'Father', priority: 3 },
  ]);

  const addContact = (c: Contact) => setContacts(prev => [...prev, c]);
  const removeContact = (id: string) => setContacts(prev => prev.filter(c => c.id !== id));
  const addAlert = (a: Alert) => {
    setAlerts(prev => [a, ...prev]);
    setSafetyStatus('alert');
  };
  const resolveAlert = (id: string) => setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'resolved' as const } : a));
  const startRide = (r: RideData) => setCurrentRide(r);
  const endRide = () => {
    setCurrentRide(null);
    setSafetyStatus('safe');
  };
  const triggerSOS = () => {
    const alert: Alert = {
      id: Date.now().toString(),
      type: 'sos',
      message: 'Emergency SOS activated!',
      timestamp: new Date(),
      status: 'active',
      location: 'Current Location',
    };
    addAlert(alert);
    setSafetyStatus('danger');
  };

  return (
    <AppContext.Provider value={{
      isLoggedIn, hasOnboarded, userName, safetyStatus, guardianMode, nightMode, sensitivity,
      contacts, alerts, currentRide,
      setLoggedIn, setOnboarded, setUserName, setSafetyStatus, setGuardianMode, setNightMode, setSensitivity,
      addContact, removeContact, addAlert, resolveAlert, startRide, endRide, triggerSOS,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
}
