'use client'
import React from 'react';
import { Home, Check, BarChart2, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = 'home' | 'check' | 'stats' | 'profile';

const MobileNavbar: React.FC = () => {
  const pathname = usePathname();

  const navItems: { 
    id: NavItem; 
    icon: React.ReactNode;
    path: string 
  }[] = [
    { id: 'home', icon: <Home />, path: '/dashboard/home' },
    { id: 'check', icon: <Check />, path: '/dashboard/tasks' },
    { id: 'stats', icon: <BarChart2 />, path: '/dashboard/statistic' },
    { id: 'profile', icon: <User />, path: '/dashboard/profile' },
  ];

  // Проверяем, активен ли текущий путь
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 w-full flex justify-around bg-white shadow-gray-800 shadow-2xl p-4">
      {navItems.map((item) => (
        <Link
          key={item.id}
          href={item.path}
          className={`p-2 rounded-2xl transition ${
            isActive(item.path) ? 'bg-gray-300' : ''
          }`}
        >
          {item.icon}
        </Link>
      ))}
    </nav>
  );
};

export default MobileNavbar; 