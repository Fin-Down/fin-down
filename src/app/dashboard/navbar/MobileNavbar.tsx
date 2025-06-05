'use client'
import React, { useState } from 'react';
import { Home, Check, BarChart2, User } from 'lucide-react';

type NavItem = 'home' | 'check' | 'stats' | 'profile';

const MobileNavbar: React.FC = () => {
  const [active, setActive] = useState<NavItem>('home');

  const navItems: { id: NavItem; icon: React.ReactNode }[] = [
    { id: 'home', icon: <Home /> },
    { id: 'check', icon: <Check /> },
    { id: 'stats', icon: <BarChart2 /> },
    { id: 'profile', icon: <User /> },
  ];

  return (
    <nav className="fixed bottom-0 w-full flex justify-around bg-white border-t p-2">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          className={`p-2 rounded-2xl transition ${
            active === item.id ? 'bg-gray-300' : ''
          }`}
        >
          {item.icon}
        </button>
      ))}
    </nav>
  );
};

export default MobileNavbar;