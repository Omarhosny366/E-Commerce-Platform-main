export class ProductSingleton {
    private static instance: ProductSingleton;
    private currentProduct: any;
  
    private constructor() {}
  
    public static getInstance(): ProductSingleton {
      if (!ProductSingleton.instance) {
        ProductSingleton.instance = new ProductSingleton();
      }
      return ProductSingleton.instance;
    }
  
    public setCurrentProduct(product: any) {
      this.currentProduct = product;
    }
  
    public getCurrentProduct(): any {
      return this.currentProduct;
    }
  }
  