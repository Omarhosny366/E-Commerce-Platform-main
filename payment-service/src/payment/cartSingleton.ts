export class CartSingleton {
  private static instance: CartSingleton;
  private currentCart: any;

  private constructor() {}

  static getInstance(): CartSingleton {
    if (!CartSingleton.instance) {
      CartSingleton.instance = new CartSingleton();
    }
    return CartSingleton.instance;
  }

  setCurrentCart(cart: any) {
    this.currentCart = cart;
  }

  getCurrentCart(): any {
    return this.currentCart;
  }
}
