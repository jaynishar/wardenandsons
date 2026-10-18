import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface RequestItem {
  id: string;
  productId: string;
  name: string;
  category: string;
  subCategory: string;
  image?: string;
  quantity: number;
  ageGroup?: string;
  size?: string;
  preferredColor?: string;
  styleNotes?: string;
}

interface CartStore {
  items: RequestItem[];
  isOpen: boolean;
  addItem: (item: {
    productId: string;
    name: string;
    category: string;
    subCategory: string;
    image?: string;
    ageGroup?: string;
    size?: string;
    preferredColor?: string;
    styleNotes?: string;
  }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateItemDetails: (
    id: string,
    details: Partial<Pick<RequestItem, 'ageGroup' | 'size' | 'preferredColor' | 'styleNotes'>>,
  ) => void;
  clearCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  toggleCart: () => void;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: newItem => {
        set(state => {
          // If identical item exists without custom notes, increment quantity
          const existingIndex = state.items.findIndex(
            item =>
              item.productId === newItem.productId &&
              !item.size &&
              !item.preferredColor &&
              !item.styleNotes,
          );

          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex].quantity += 1;
            return { items: updated, isOpen: true };
          }

          const uniqueId = `${newItem.productId}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
          return {
            items: [
              ...state.items,
              {
                id: uniqueId,
                productId: newItem.productId,
                name: newItem.name,
                category: newItem.category,
                subCategory: newItem.subCategory,
                image: newItem.image,
                quantity: 1,
                ageGroup: newItem.ageGroup || '',
                size: newItem.size || '',
                preferredColor: newItem.preferredColor || '',
                styleNotes: newItem.styleNotes || '',
              },
            ],
            isOpen: true,
          };
        });
      },

      removeItem: id => {
        set(state => ({
          items: state.items.filter(item => item.id !== id && item.productId !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set(state => ({
          items: state.items.map(item =>
            item.id === id || item.productId === id ? { ...item, quantity } : item,
          ),
        }));
      },

      updateItemDetails: (id, details) => {
        set(state => ({
          items: state.items.map(item => (item.id === id ? { ...item, ...details } : item)),
        }));
      },

      // Only called upon explicit user action ("Clear Request")
      clearCart: () => {
        set({ items: [] });
      },

      setIsOpen: isOpen => set({ isOpen }),

      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'warden-request-list-storage',
    },
  ),
);
