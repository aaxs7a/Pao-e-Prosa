import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<any[]>([]);

  // Adiciona item e avisa o usuário
  const addToCart = (product: any) => {
    setItems((current) => [...current, product]);
  };

  // Remove um item específico (se precisar)
  const removeFromCart = (index: number) => {
    setItems((current) => current.filter((_, i) => i !== index));
  };

  // Cálculo automático do valor total
  const total = items.reduce((acc, item) => {
    const precoNum = parseFloat(item.preco.replace('R$ ', '').replace(',', '.'));
    return acc + precoNum;
  }, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);