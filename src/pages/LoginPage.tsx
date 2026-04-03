import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Phone, Mail, Eye, EyeOff } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import logo from '@/assets/hershield-logo.png';

export default function LoginPage() {
  const [mode, setMode] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const { setLoggedIn } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'phone' && !showOtp) {
      setShowOtp(true);
      return;
    }
    setLoggedIn(true);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-10">
          <img src={logo} alt="HerShield" width={72} height={72} className="mb-4" />
          <h1 className="text-2xl font-bold gradient-text">Welcome Back</h1>
          <p className="text-muted-foreground mt-1">Sign in to stay protected</p>
        </div>

        {/* Mode Toggle */}
        <div className="glass-card p-1 flex mb-8">
          <button
            onClick={() => { setMode('phone'); setShowOtp(false); }}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${mode === 'phone' ? 'gradient-primary' : 'text-muted-foreground'}`}
          >
            <Phone size={16} /> Phone
          </button>
          <button
            onClick={() => { setMode('email'); setShowOtp(false); }}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${mode === 'email' ? 'gradient-primary' : 'text-muted-foreground'}`}
          >
            <Mail size={16} /> Email
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'phone' ? (
            <>
              <div className="glass-card px-4 py-3">
                <label className="text-xs text-muted-foreground">Phone Number</label>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-muted-foreground">+91</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    className="bg-transparent flex-1 outline-none text-foreground placeholder:text-muted-foreground/40"
                  />
                </div>
              </div>
              {showOtp && (
                <div className="glass-card px-4 py-3 animate-slide-up">
                  <label className="text-xs text-muted-foreground">Enter OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    placeholder="6-digit OTP"
                    maxLength={6}
                    className="w-full bg-transparent mt-1 outline-none text-foreground text-2xl tracking-[0.5em] placeholder:text-muted-foreground/40 placeholder:text-base placeholder:tracking-normal"
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <div className="glass-card px-4 py-3">
                <label className="text-xs text-muted-foreground">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent mt-1 outline-none text-foreground placeholder:text-muted-foreground/40"
                />
              </div>
              <div className="glass-card px-4 py-3">
                <label className="text-xs text-muted-foreground">Password</label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-transparent flex-1 outline-none text-foreground placeholder:text-muted-foreground/40"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="text-muted-foreground">
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </>
          )}

          <button type="submit" className="w-full gradient-primary py-4 rounded-2xl font-bold text-lg transition-transform hover:scale-[1.02] active:scale-95">
            {mode === 'phone' ? (showOtp ? 'Verify & Login' : 'Send OTP') : 'Sign In'}
          </button>
        </form>

        {/* Google Sign In */}
        <button
          onClick={() => { setLoggedIn(true); navigate('/dashboard'); }}
          className="w-full glass-card py-4 rounded-2xl font-semibold mt-4 flex items-center justify-center gap-3 hover:bg-white/10 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continue with Google
        </button>

        <p className="text-center text-muted-foreground text-sm mt-6">
          Don't have an account?{' '}
          <button onClick={() => { setLoggedIn(true); navigate('/dashboard'); }} className="gradient-text font-semibold">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
