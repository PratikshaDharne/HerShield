import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import BottomNav from '@/components/BottomNav';
import { User, Users, Settings, Shield, LogOut, ChevronRight, Phone, Heart, Star } from 'lucide-react';
import logo from '@/assets/hershield-logo.png';

export default function ProfilePage() {
  const { userName, contacts, removeContact, setLoggedIn } = useApp();
  const [showAddContact, setShowAddContact] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const { addContact } = useApp();
  const navigate = useNavigate();

  const handleAdd = () => {
    if (newName && newPhone) {
      addContact({
        id: Date.now().toString(),
        name: newName,
        phone: newPhone,
        relation: 'Contact',
        priority: contacts.length + 1,
      });
      setNewName('');
      setNewPhone('');
      setShowAddContact(false);
    }
  };

  const relationIcons: Record<string, typeof Heart> = {
    'Mother': Heart,
    'Father': Heart,
    'Best Friend': Star,
  };

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      {/* Profile Header */}
      <div className="glass-card p-6 flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-2xl font-bold">
          {userName[0]}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold">{userName}</h2>
          <p className="text-sm text-muted-foreground">+91 98765 43210</p>
        </div>
        <img src={logo} alt="" width={32} height={32} className="opacity-40" />
      </div>

      {/* Trusted Contacts */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Users size={14} /> Trusted Contacts
        </h3>
        <button onClick={() => setShowAddContact(!showAddContact)} className="text-primary text-sm font-semibold">
          + Add
        </button>
      </div>

      {showAddContact && (
        <div className="glass-card p-4 mb-4 space-y-3 animate-slide-up">
          <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Name"
            className="w-full glass px-4 py-3 rounded-xl bg-transparent outline-none text-foreground placeholder:text-muted-foreground/40" />
          <input value={newPhone} onChange={e => setNewPhone(e.target.value)} placeholder="Phone number"
            className="w-full glass px-4 py-3 rounded-xl bg-transparent outline-none text-foreground placeholder:text-muted-foreground/40" />
          <button onClick={handleAdd} className="w-full gradient-primary py-3 rounded-xl font-semibold">Add Contact</button>
        </div>
      )}

      <div className="space-y-3 mb-8">
        {contacts.map((c, i) => {
          const RelIcon = relationIcons[c.relation] || Phone;
          return (
            <div key={c.id} className="glass-card p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="font-semibold flex items-center gap-2">
                  {c.name} <RelIcon size={14} className="text-secondary" />
                </p>
                <p className="text-sm text-muted-foreground">{c.phone}</p>
              </div>
              <button onClick={() => removeContact(c.id)} className="text-muted-foreground hover:text-danger text-xs">
                Remove
              </button>
            </div>
          );
        })}
      </div>

      {/* Menu */}
      <div className="space-y-2">
        <button onClick={() => navigate('/settings')}
          className="glass-card p-4 flex items-center gap-4 w-full hover:bg-white/10 transition-all">
          <Settings size={20} className="text-primary" />
          <span className="flex-1 text-left font-medium">Settings</span>
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>
        <button onClick={() => { setLoggedIn(false); navigate('/'); }}
          className="glass-card p-4 flex items-center gap-4 w-full hover:bg-white/10 transition-all">
          <LogOut size={20} className="text-danger" />
          <span className="flex-1 text-left font-medium text-danger">Logout</span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
