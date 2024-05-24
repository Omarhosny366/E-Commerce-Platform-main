import { Injectable, NotFoundException } from '@nestjs/common';
import { CustPurchaseProduct } from './schemas/cust-purchase-product.schema';
import { CreateCustPurchaseProductDto } from './dto/create-cust-purchase-product.dto';
import { UpdateCustPurchaseProductDto } from './dto/update-cust-purchase-product.dto';
import { CustPurchaseProductRepository } from './cust-purchase-product.repository';

@Injectable()
export class CustPurchaseProductService {
    
    constructor(private readonly custPurchaseProductRepository: CustPurchaseProductRepository) {}
    
    async getAllProducts(): Promise<CustPurchaseProduct[]> {
        return this.custPurchaseProductRepository.find({});
    }
    
    async getProductDetails(productId: string): Promise<CustPurchaseProduct | null> {
        return this.custPurchaseProductRepository.findById(productId)   ;
      }
 

    async create(createCustPurchaseProductDto: CreateCustPurchaseProductDto): Promise<CustPurchaseProduct> {
        return this.custPurchaseProductRepository.create(createCustPurchaseProductDto);
    }

    async delete(id: string): Promise<void> {
        await this.custPurchaseProductRepository.deleteProduct(id);
    }

    async update(id: string, updateCustPurchaseProductDto: UpdateCustPurchaseProductDto): Promise<CustPurchaseProduct> {
        const existingProduct = await this.custPurchaseProductRepository.findOneAndUpdate(
            { _id: id },
            updateCustPurchaseProductDto,
        );

        if (!existingProduct) {
            throw new NotFoundException('Product not found');
        }

        return existingProduct;
    }

    async findAll(): Promise<CustPurchaseProduct[]> {
        return this.custPurchaseProductRepository.find({});
    }

    async findOne(id: string): Promise<CustPurchaseProduct> {
        const product = await this.custPurchaseProductRepository.findOne({ _id: id });
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }

    async save(product: CustPurchaseProduct): Promise<CustPurchaseProduct> {
        return this.custPurchaseProductRepository.save(product);
    }
    async updateProductQuantity(productId: string, quantity: number): Promise<void> {
        try {
          const product = await this.custPurchaseProductRepository.findById(productId);
          if (!product) {
            throw new NotFoundException(`Product with id ${productId} not found`);
          }
    
          product.quantity = quantity;
          await this.custPurchaseProductRepository.save(product);
          console.log(`Updated product quantity for ID: ${productId} to ${quantity}`);
        } catch (error) {
          console.error(`Error updating product quantity for ID: ${productId}`, error);
          throw new Error('Failed to update product quantity');
        }
      }
}