'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, GitCompare, Briefcase, User } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/compare', label: 'Compare', icon: GitCompare },
  { href: '/careers', label: 'Careers', icon: Briefcase },
  { href: '/login', label: 'Profile', icon: User },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-effect border-t border-white/10">
      <div className="flex items-stretch justify-around h-16">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center gap-0.5 px-3 py-2 flex-1 transition-colors ${
                isActive
                  ? 'text-indigo-400'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-semibold leading-none">{label}</span>
              {isActive && (
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
