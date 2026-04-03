import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, MapPin, Bell, Users, ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const slides = [
  {
    icon: Shield,
    title: 'Smart Auto SOS',
    description: 'AI detects screams, falls, and unusual motion to automatically trigger emergency alerts.',
    color: 'from-primary to-accent',
  },
  {
    icon: MapPin,
    title: 'AI Safe Routes',
    description: 'Get the safest route recommendations with real-time risk scoring and color-coded paths.',
    color: 'from-accent to-secondary',
  },
  {
    icon: Bell,
    title: 'Ride Shield Mode',
    description: 'Monitor your rides in real-time. Detect route deviations and alert your contacts instantly.',
    color: 'from-secondary to-primary',
  },
  {
    icon: Users,
    title: 'Guardian Network',
    description: 'Your trusted contacts receive instant alerts with your live location when danger is detected.',
    color: 'from-primary to-secondary',
  },
];

export default function OnboardingPage() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const { setOnboarded } = useApp();

  const next = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      setOnboarded(true);
      navigate('/login');
    }
  };

  const slide = slides[current];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.color} opacity-5 transition-all duration-700`} />

      <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
        <div key={current} className="animate-slide-up">
          <div className="w-28 h-28 rounded-3xl gradient-primary flex items-center justify-center mb-10 glow-purple">
            <Icon size={48} className="text-primary-foreground" />
          </div>
        </div>

        <h2 key={`t-${current}`} className="text-3xl font-bold mb-4 animate-slide-up gradient-text">
          {slide.title}
        </h2>
        <p key={`d-${current}`} className="text-muted-foreground text-lg mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {slide.description}
        </p>

        {/* Dots */}
        <div className="flex gap-2 mb-10">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 gradient-primary' : 'w-2 bg-muted'}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="gradient-primary px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
        >
          {current < slides.length - 1 ? 'Next' : 'Get Started'}
          <ChevronRight size={20} />
        </button>

        {current < slides.length - 1 && (
          <button
            onClick={() => { setOnboarded(true); navigate('/login'); }}
            className="mt-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
}
