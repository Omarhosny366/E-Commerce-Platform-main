import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomizedProduct } from './schemas/customized-product.schema';
import { CreateCustomizedProductDto } from './dto/create-customized-product.dto';
import { UpdateCustomizedProductDto } from './dto/update-customized-product.dto';
import { CustomizedProductRepository } from './customized-product.repository';
import { UserSingleton } from './userSingleton';

@Injectable()
export class CustomizedProductService {
  constructor(private readonly customizedProductRepository: CustomizedProductRepository) {}
  
  async getAllProducts(): Promise<CustomizedProduct[]> {
    return this.customizedProductRepository.find({});
}



  async updateProductQuantity(productId: string, quantity: number): Promise<void> {
    try {
      const product = await this.customizedProductRepository.findById(productId);
      if (!product) {
        throw new NotFoundException(`Product with id ${productId} not found`);
      }

      product.quantity = quantity;
      await this.customizedProductRepository.save(product);
      console.log(`Updated product quantity for ID: ${productId} to ${quantity}`);
    } catch (error) {
      console.error(`Error updating product quantity for ID: ${productId}`, error);
      throw new Error('Failed to update product quantity');
    }
  }

  private getCurrentUserId(): string {
    const userSingleton = UserSingleton.getInstance();
    const currentUser = userSingleton.getCurrentUser();
    if (!currentUser) {
      throw new Error('User not logged in');
    }
    return currentUser.id;
  }

  async getProductDetails(productId: string): Promise<CustomizedProduct | null> {
    return this.customizedProductRepository.findById(productId);
  }

  async create(createCustomizedProductDto: CreateCustomizedProductDto): Promise<CustomizedProduct> {
    const userId = this.getCurrentUserId();
    let finalPrice = 0;

    if (createCustomizedProductDto.color) {
      finalPrice += 50;
    }

    if (createCustomizedProductDto.material) {
      finalPrice += 50;
    }

    if (createCustomizedProductDto.dimensions) {
      finalPrice += 50;
    }

    const customizedProduct = {
      ...createCustomizedProductDto,
      price: finalPrice,
      userId: userId,
      type: "customized",
      name:"customized Product",
      customizing_status:"Preparing",
      downpayment:finalPrice*0.3
    };

    return this.customizedProductRepository.create(customizedProduct);
  }

  async delete(id: string): Promise<void> {
    await this.customizedProductRepository.deleteProduct(id);
  }

  async update(id: string, updateCustomizedProductDto: UpdateCustomizedProductDto): Promise<CustomizedProduct> {
    const existingProduct = await this.customizedProductRepository.findOneAndUpdate(
      { _id: id },
      updateCustomizedProductDto,
    );

    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    return existingProduct;
  }

  async findAll(): Promise<CustomizedProduct[]> {
    return this.customizedProductRepository.find({});
  }

  async findOne(id: string): Promise<CustomizedProduct> {
    const product = await this.customizedProductRepository.findOne({ _id: id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async save(product: CustomizedProduct): Promise<CustomizedProduct> {
    return this.customizedProductRepository.save(product);
  }
}
