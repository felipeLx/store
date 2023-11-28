import { create } from "zustand";
import {type ProductDocument} from "../types/product";

interface State {
    cart: ProductDocument[];
    totalItems: number;
    totalPrice: number;
    showCart: boolean;
}

interface Actions {
    addToCart: (Item: ProductDocument) => void;
    removeFromCart: (Item: ProductDocument) => void;
    toggleCart: () => void;}

export const useLove = create<State & Actions>((set, get) => ({
    cart: [],
    totalItems: 0,
    totalPrice: 0,
    showCart: false,
    addToCart: (product: ProductDocument) => {
      const cart = get().cart
      const cartItem = cart.find((item) => item.sku === product.sku)

      if (cartItem) {
        const updateCart = cart.map((item)=> item.sku === product.sku ? {...item, quantity: item.quantity + 1} : item)     
    set((state) => ({cart: updateCart,
    totalItems: state.totalItems + 1,
    totalPrice: state.totalPrice + product.price,
      }),
    ); }
    else {
        const updatedCart = [...cart, {...product, quantity: 1}];
        set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.price,
        }));
    }
    },
    removeFromCart: (product: ProductDocument) => {
        set((state) => ({
            cart: state.cart.filter((item) => item.sku !== product.sku),
            totalItems: state.totalItems - 1,
            totalPrice: state.totalPrice - product.price,
            }))
    },
    toggleCart: () => 
        set((state) => ({
                showCart: !state.showCart,
            })),          
    })
);