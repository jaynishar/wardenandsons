---
name: WhatsApp Commerce & Cart Architecture
description: Full specification for the Zustand persistent cart system and pre-filled WhatsApp order checkout flow (+91 9920751567) for Warden & Sons.
---

# WhatsApp Commerce & Cart Architecture

Architectural specification for the sample catalog browsing, Zustand persistent shopping bag, and 1-tap WhatsApp order checkout.

## 1. Business Logic & Shopping Flow
- **No Online Payment Gateway:** The store operates exclusively via personalized WhatsApp concierge shopping.
- Customers browse sample collections across Newborn, Boys, Girls, Men, and Women.
- Adding items to cart stores them in client-side storage via **Zustand with `persist` middleware**.
- "Checkout" triggers a small popup form (Customer Name, Delivery Preference: Pickup vs. Home Delivery).
- Upon submission, it generates the standardized WhatsApp order message and redirects to `https://wa.me/919920751567?text=...`.
- Clears the cart upon order launch.

---

## 2. Zustand Cart Interface (`src/store/cart.ts`)

```typescript
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  subCategory: string;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}
```

---

## 3. WhatsApp Order Manifest Generator

```typescript
export function generateWhatsAppOrderMessage(params: {
  items: CartItem[];
  customerName: string;
  deliveryPreference: 'Store Pickup (Kemps Corner)' | 'Home Delivery';
}): string {
  const itemList = params.items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.name} - ₹${item.price} × ${item.quantity}`
    )
    .join('\n');

  const totalItems = params.items.reduce((acc, item) => acc + item.quantity, 0);
  const estimatedTotal = params.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return [
    `Hello Warden & Sons! I'd like to place an order:`,
    ``,
    itemList,
    ``,
    `Total Items: ${totalItems}`,
    `Estimated Total: ₹${estimatedTotal}`,
    ``,
    `Name: ${params.customerName}`,
    `Delivery: ${params.deliveryPreference}`,
    ``,
    `Please share availability & photos. Thank you!`,
  ].join('\n');
}

export function openWhatsAppCheckout(
  message: string,
  phone = '919920751567'
): void {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}
```
