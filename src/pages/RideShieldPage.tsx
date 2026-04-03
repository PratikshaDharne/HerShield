import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import BottomNav from '@/components/BottomNav';
import { Car, Camera, Shield, AlertTriangle, CheckCircle, Clock, X } from 'lucide-react';

export default function RideShieldPage() {
  const { currentRide, startRide, endRide, addAlert, setSafetyStatus } = useApp();
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [driverOtp, setDriverOtp] = useState('');
  const [verified, setVerified] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [deviation, setDeviation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentRide?.isActive) return;
    const timer = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(timer);
  }, [currentRide?.isActive]);

  // Simulate deviation after 15 seconds
  useEffect(() => {
    if (elapsed === 15 && currentRide?.isActive) {
      setDeviation(true);
      setSafetyStatus('alert');
      addAlert({
        id: Date.now().toString(),
        type: 'deviation',
        message: 'Route deviation detected! Driver took an unexpected turn.',
        timestamp: new Date(),
        status: 'active',
        location: 'Near Silk Board Junction',
      });
    }
  }, [elapsed]);

  const handleStart = () => {
    startRide({
      id: Date.now().toString(),
      vehicleNumber: vehicleNumber || 'KA 01 AB 1234',
      driverVerified: verified,
      startTime: new Date(),
      isActive: true,
      route: 'Home → Office',
    });
  };

  const handleVerify = () => {
    setVerified(true);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  if (currentRide?.isActive) {
    return (
      <div className="min-h-screen pb-24 px-4 pt-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Car size={22} className="text-primary" /> Ride Shield Active
          </h1>
          <button onClick={() => { endRide(); setDeviation(false); setElapsed(0); }}
            className="glass-card px-4 py-2 rounded-xl text-sm text-danger font-semibold flex items-center gap-1">
            <X size={14} /> End Ride
          </button>
        </div>

        {/* Timer */}
        <div className={`glass-card p-8 text-center mb-6 border-2 ${deviation ? 'border-danger/40' : 'border-safe/20'}`}>
          <p className="text-muted-foreground text-sm mb-2">Ride Duration</p>
          <p className="text-5xl font-extrabold font-mono">{formatTime(elapsed)}</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className={`w-2 h-2 rounded-full ${deviation ? 'bg-danger animate-pulse' : 'bg-safe'}`} />
            <span className={`text-sm font-medium ${deviation ? 'text-danger' : 'text-safe'}`}>
              {deviation ? 'Route Deviation Detected!' : 'On Route • Monitoring Active'}
            </span>
          </div>
        </div>

        {/* Deviation Alert */}
        {deviation && (
          <div className="glass-card p-4 border border-danger/30 mb-6 animate-slide-up">
            <div className="flex items-start gap-3">
              <AlertTriangle size={24} className="text-danger mt-0.5" />
              <div>
                <p className="font-semibold text-danger">Route Deviation Alert</p>
                <p className="text-sm text-muted-foreground mt-1">
                  The driver deviated from the expected route near Silk Board Junction. 
                  Alerts have been sent to your trusted contacts.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Ride Details */}
        <div className="glass-card p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground text-sm">Vehicle</span>
            <span className="font-semibold">{currentRide.vehicleNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground text-sm">Driver Verified</span>
            <span className={`font-semibold flex items-center gap-1 ${currentRide.driverVerified ? 'text-safe' : 'text-warning'}`}>
              {currentRide.driverVerified ? <><CheckCircle size={14} /> Yes</> : <><AlertTriangle size={14} /> No</>}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground text-sm">Route</span>
            <span className="font-semibold">{currentRide.route}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground text-sm">Contacts Notified</span>
            <span className="font-semibold text-safe">3 contacts</span>
          </div>
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
        <Car size={24} className="text-primary" /> Ride Shield
      </h1>
      <p className="text-muted-foreground mb-8">Monitor your ride in real-time</p>

      <div className="space-y-4">
        <div className="glass-card px-4 py-3">
          <label className="text-xs text-muted-foreground">Vehicle Number</label>
          <input
            type="text"
            value={vehicleNumber}
            onChange={e => setVehicleNumber(e.target.value.toUpperCase())}
            placeholder="KA 01 AB 1234"
            className="w-full bg-transparent mt-1 outline-none text-foreground placeholder:text-muted-foreground/40 text-lg font-semibold tracking-wider"
          />
        </div>

        <button className="glass-card p-4 flex items-center gap-4 w-full hover:bg-white/10 transition-all">
          <Camera size={22} className="text-primary" />
          <div className="text-left">
            <p className="font-semibold">Capture Vehicle Photo</p>
            <p className="text-sm text-muted-foreground">Take a photo for safety records</p>
          </div>
        </button>

        {/* Driver Verification */}
        <div className="glass-card p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Shield size={16} className="text-primary" /> Driver Verification
          </h3>
          {!verified ? (
            <div className="space-y-3">
              <div className="glass px-4 py-3 rounded-xl">
                <label className="text-xs text-muted-foreground">Driver OTP</label>
                <input
                  type="text"
                  value={driverOtp}
                  onChange={e => setDriverOtp(e.target.value)}
                  placeholder="Enter 4-digit OTP"
                  maxLength={4}
                  className="w-full bg-transparent mt-1 outline-none text-foreground tracking-[0.3em] text-xl"
                />
              </div>
              <button onClick={handleVerify} className="w-full gradient-primary py-3 rounded-xl font-semibold transition-transform active:scale-95">
                Verify Driver
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-safe">
              <CheckCircle size={20} />
              <span className="font-semibold">Driver Verified ✓</span>
            </div>
          )}
        </div>

        <button
          onClick={handleStart}
          className="w-full gradient-primary py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-95 glow-purple"
        >
          <Shield size={22} />
          Start Ride Shield
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
