import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-surface-elevated text-foreground',
        primary: 'bg-primary/20 text-primary border border-primary/30',
        secondary: 'bg-secondary/20 text-secondary border border-secondary/30',
        success: 'bg-success/20 text-success border border-success/30',
        warning: 'bg-warning/20 text-warning border border-warning/30',
        danger: 'bg-danger/20 text-danger border border-danger/30',
        info: 'bg-info/20 text-info border border-info/30',
        restaurant: 'bg-restaurant-accent/20 text-restaurant-accent border border-restaurant-accent/30',
        club: 'bg-club-accent/20 text-club-accent border border-club-accent/30',
        vip: 'bg-vip-gold/20 text-vip-gold border border-vip-gold/30',
        outline: 'border border-border text-foreground bg-transparent',
      },
      size: {
        default: 'px-3 py-1 text-xs',
        sm: 'px-2 py-0.5 text-[10px]',
        lg: 'px-4 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode
}

function Badge({ className, variant, size, icon, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </div>
  )
}

// Status-specific badges
function StatusBadge({ status }: { status: string }) {
  const statusConfig: Record<string, { variant: VariantProps<typeof badgeVariants>['variant']; label: string }> = {
    // Order statuses
    draft: { variant: 'default', label: 'Draft' },
    pending_payment: { variant: 'warning', label: 'Pending Payment' },
    paid: { variant: 'success', label: 'Paid' },
    preparing: { variant: 'info', label: 'Preparing' },
    ready: { variant: 'success', label: 'Ready' },
    completed: { variant: 'default', label: 'Completed' },
    cancelled: { variant: 'danger', label: 'Cancelled' },
    refunded: { variant: 'warning', label: 'Refunded' },
    // Reservation statuses
    confirmed: { variant: 'success', label: 'Confirmed' },
    checked_in: { variant: 'primary', label: 'Checked In' },
    expired: { variant: 'danger', label: 'Expired' },
    // Payment statuses
    initiated: { variant: 'default', label: 'Initiated' },
    pending: { variant: 'warning', label: 'Pending' },
    successful: { variant: 'success', label: 'Successful' },
    failed: { variant: 'danger', label: 'Failed' },
    // Pass statuses
    active: { variant: 'success', label: 'Active' },
    revoked: { variant: 'danger', label: 'Revoked' },
  }

  const config = statusConfig[status] || { variant: 'default', label: status }
  
  return <Badge variant={config.variant}>{config.label}</Badge>
}

export { Badge, badgeVariants, StatusBadge }
