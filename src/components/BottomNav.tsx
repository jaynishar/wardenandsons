'use client';

import Link from 'next/link';
import { Home, Search, ShoppingBag, User, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Search', href: '/search', icon: Search },
    { name: 'Menu', href: '/menu', icon: Menu },
    { name: 'Cart', href: '/cart', icon: ShoppingBag },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 z-50 pb-safe">
      <ul className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <li key={item.name} className="flex-1">
              <Link
                href={item.href}
                className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                  isActive ? 'text-black' : 'text-gray-400 hover:text-black'
                }`}
              >
                <Icon strokeWidth={isActive ? 2.5 : 2} className="w-6 h-6" />
                <span className="text-[10px] uppercase font-bold tracking-wider">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
