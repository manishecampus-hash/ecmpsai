'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, GitCompare, Briefcase, User } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/search?q=', label: 'Search', icon: Search },
  { href: '/compare', label: 'Compare', icon: GitCompare },
  { href: '/search?q=careers', label: 'Careers', icon: Briefcase },
  { href: '/search?q=profile', label: 'Profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 safe-area-inset-bottom">
      <div className="flex items-stretch justify-around h-16">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/' && pathname.startsWith(href.split('?')[0]));
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center gap-0.5 px-3 py-2 flex-1 transition-colors ${
                isActive
                  ? 'text-[#4F46E5] dark:text-[#818CF8]'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] font-medium leading-none">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
