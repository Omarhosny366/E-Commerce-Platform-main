import { Injectable, NotFoundException } from '@nestjs/common';
import { CustPurchaseProduct } from './schemas/cust-purchase-product.schema';
import { CreateCustPurchaseProductDto } from './dto/create-cust-purchase-product.dto';
import { UpdateCustPurchaseProductDto } from './dto/update-cust-purchase-product.dto';
import { CustPurchaseProductRepository } from './cust-purchase-product.repository';

@Injectable()
export class CustPurchaseProductService {
    
    constructor(private readonly custPurchaseProductRepository: CustPurchaseProductRepository) {}
    
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
}
