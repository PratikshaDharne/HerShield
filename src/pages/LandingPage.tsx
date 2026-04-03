import { useNavigate } from 'react-router-dom';
import { Shield, ChevronRight } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';
import logo from '@/assets/hershield-logo.png';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />

      {/* Animated radar rings */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-64 h-64 rounded-full border border-primary/20 animate-radar" />
        <div className="absolute inset-0 w-64 h-64 rounded-full border border-secondary/20 animate-radar" style={{ animationDelay: '0.5s' }} />
        <div className="absolute inset-0 w-64 h-64 rounded-full border border-primary/10 animate-radar" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-md">
        <div className="animate-float mb-8">
          <img src={logo} alt="HerShield" width={120} height={120} />
        </div>

        <h1 className="text-4xl font-extrabold mb-4 leading-tight">
          <span className="gradient-text">Your Safety.</span>
          <br />
          <span className="gradient-text">Your Power.</span>
          <br />
          <span className="text-foreground/90">Always Protected.</span>
        </h1>

        <p className="text-muted-foreground text-lg mb-10">
          AI-powered protection that predicts, detects, and responds to keep you safe — always.
        </p>

        <button
          onClick={() => navigate('/onboarding')}
          className="group gradient-primary px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 animate-pulse-glow transition-transform hover:scale-105 active:scale-95"
        >
          <Shield size={22} />
          Start Protection
          <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
        </button>

        <p className="text-muted-foreground/60 text-sm mt-8">Trusted by 50,000+ women across India</p>
      </div>
    </div>
  );
}
