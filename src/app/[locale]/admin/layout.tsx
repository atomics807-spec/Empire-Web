'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, Utensils, Calendar, Users, CreditCard, Ticket, 
  Settings, BarChart3, Bell, ClipboardList, Shield, ChevronLeft, LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'

const adminNavItems = [
  { href: '', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/restaurant/orders', label: 'Restaurant Orders', icon: Utensils },
  { href: '/restaurant/menu', label: 'Menu Management', icon: Utensils },
  { href: '/restaurant/categories', label: 'Categories', icon: Utensils },
  { href: '/restaurant/tables', label: 'Restaurant Tables', icon: Utensils },
  { href: '/events', label: 'Events', icon: Calendar },
  { href: '/tickets', label: 'Tickets', icon: Ticket },
  { href: '/reservations', label: 'Reservations', icon: Users },
  { href: '/guest-list', label: 'Guest List', icon: Users },
  { href: '/club/floor', label: 'Floor Plan', icon: LayoutDashboard },
  { href: '/check-in', label: 'Check-In', icon: Shield },
  { href: '/customers', label: 'Customers', icon: Users },
  { href: '/staff', label: 'Staff', icon: Shield },
  { href: '/reports', label: 'Reports', icon: BarChart3 },
  { href: '/notifications', label: 'Notifications', icon: Bell },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/audit', label: 'Audit Logs', icon: ClipboardList },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-surface hidden lg:block">
        <div className="p-4 border-b border-border">
          <Link href="/en" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Site</span>
          </Link>
        </div>
        <nav className="p-4 space-y-1">
          {adminNavItems.map((item) => {
            const Icon = item.icon
            const href = `/en/admin${item.href}`
            const isActive = pathname === href || (item.href === '' && pathname === '/en/admin')
            
            return (
              <Link
                key={item.href}
                href={href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-surface-elevated'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t border-border">
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-danger hover:bg-danger/10 w-full">
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
