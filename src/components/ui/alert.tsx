import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { AlertCircle, CheckCircle, Info, XCircle, AlertTriangle } from 'lucide-react'

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 pl-4 pr-8 text-sm [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-0 [&>svg~*]:+mt-0.5',
  {
    variants: {
      variant: {
        default: 'bg-surface text-foreground border-border',
        success: 'bg-success/10 border-success/30 text-success [&>svg]:text-success',
        warning: 'bg-warning/10 border-warning/30 text-warning [&>svg]:text-warning',
        danger: 'bg-danger/10 border-danger/30 text-danger [&>svg]:text-danger',
        info: 'bg-info/10 border-info/30 text-info [&>svg]:text-info',
        restaurant: 'bg-restaurant-accent/10 border-restaurant-accent/30 text-restaurant-accent [&>svg]:text-restaurant-accent',
        club: 'bg-club-accent/10 border-club-accent/30 text-club-accent [&>svg]:text-club-accent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const alertIcons = {
  default: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  danger: XCircle,
  info: Info,
  restaurant: AlertCircle,
  club: AlertCircle,
}

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string
  icon?: boolean
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', title, icon = true, children, ...props }, ref) => {
    const Icon = alertIcons[variant || 'default']
    
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {icon && <Icon className="h-4 w-4" />}
        {title && <h5 className="mb-1 font-semibold leading-none tracking-tight">{title}</h5>}
        {children}
      </div>
    )
  }
)
Alert.displayName = 'Alert'

// Convenience components for common alert types
function AlertSuccess({ title, children, className, ...props }: React.ComponentProps<typeof Alert>) {
  return <Alert variant="success" title={title} {...props}>{children}</Alert>
}

function AlertWarning({ title, children, className, ...props }: React.ComponentProps<typeof Alert>) {
  return <Alert variant="warning" title={title} {...props}>{children}</Alert>
}

function AlertDanger({ title, children, className, ...props }: React.ComponentProps<typeof Alert>) {
  return <Alert variant="danger" title={title} {...props}>{children}</Alert>
}

function AlertInfo({ title, children, className, ...props }: React.ComponentProps<typeof Alert>) {
  return <Alert variant="info" title={title} {...props}>{children}</Alert>
}

export { Alert, AlertSuccess, AlertWarning, AlertDanger, AlertInfo }
