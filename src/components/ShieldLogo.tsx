import { Shield } from 'lucide-react';

export default function ShieldLogo({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <div className="absolute inset-0 rounded-full gradient-primary opacity-30 blur-xl" />
      <Shield size={size} className="relative z-10" strokeWidth={2} />
    </div>
  );
}
