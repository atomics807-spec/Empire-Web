'use client'

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'

export interface CartItem {
  id: string
  menuItemId: string
  name: { en: string; fr: string }
  price: number
  quantity: number
  instructions?: string
}

interface CartContextType {
  items: CartItem[]
  itemCount: number
  subtotal: number
  addItem: (item: Omit<CartItem, 'id' | 'quantity'>) => void
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  clearCart: () => void
  isInCart: (menuItemId: string) => boolean
  getItemQuantity: (menuItemId: string) => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'empire-restaurant-cart'

function generateId(): string {
  return `cart_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setItems(parsed)
        }
      }
    } catch (error) {
      console.error('Failed to load cart from storage:', error)
    }
    setIsHydrated(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
      } catch (error) {
        console.error('Failed to save cart to storage:', error)
      }
    }
  }, [items, isHydrated])

  const addItem = useCallback((item: Omit<CartItem, 'id' | 'quantity'>) => {
    setItems(currentItems => {
      // Check if item already exists
      const existingItem = currentItems.find(i => i.menuItemId === item.menuItemId)
      
      if (existingItem) {
        // Increment quantity
        return currentItems.map(i =>
          i.id === existingItem.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      
      // Add new item
      return [
        ...currentItems,
        {
          ...item,
          id: generateId(),
          quantity: 1,
        },
      ]
    })
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(currentItems => currentItems.filter(item => item.id !== id))
    } else {
      setItems(currentItems =>
        currentItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      )
    }
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const isInCart = useCallback((menuItemId: string) => {
    return items.some(item => item.menuItemId === menuItemId)
  }, [items])

  const getItemQuantity = useCallback((menuItemId: string) => {
    const item = items.find(i => i.menuItemId === menuItemId)
    return item?.quantity ?? 0
  }, [items])

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        isInCart,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
