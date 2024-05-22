import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CustRentProduct } from './schemas/cust-rent-product.schema';
import { CreateCustRentProductDto } from './dto/create-cust-rent-product.dto';
import { UpdateCustRentProductDto } from './dto/update-cust-rent-product.dto';
import { CustRentProductRepository } from './cust-rent-product.repository';
import { ClientKafka } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class CustRentProductService {
    constructor(private readonly custRentProductRepository: CustRentProductRepository,
        @InjectModel(CustRentProduct.name) private readonly productModel: Model<CustRentProduct>,
        @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka) { }
     
        async onModuleInit() {
            this.kafkaClient.subscribeToResponseOf('get.product.details');
            await this.kafkaClient.connect();
          }
          
          async updateProductQuantity(productId: string, quantity: number): Promise<void> {
            try {
              const product = await this.custRentProductRepository.findById(productId);
              if (!product) {
                throw new NotFoundException(`Product with id ${productId} not found`);
              }
        
              product.quantity = quantity;
              await this.custRentProductRepository.save(product);
              console.log(`Updated product quantity for ID: ${productId} to ${quantity}`);
            } catch (error) {
              console.error(`Error updating product quantity for ID: ${productId}`, error);
              throw new Error('Failed to update product quantity');
            }
          }
          async getProductDetails(productId: string): Promise<CustRentProduct | null> {
            return this.productModel.findById(productId).exec();
          }

    async create(createCustRentProductDto: CreateCustRentProductDto): Promise<CustRentProduct> {
        return this.custRentProductRepository.create(createCustRentProductDto);
    }

    async delete(id: string): Promise<void> {
        await this.custRentProductRepository.deleteProduct(id);
    }

    async update(id: string, updateCustRentProductDto: UpdateCustRentProductDto): Promise<CustRentProduct> {
        const existingProduct = await this.custRentProductRepository.findOneAndUpdate(
            { _id: id },
            updateCustRentProductDto,
        );

        if (!existingProduct) {
            throw new NotFoundException('Product not found');
        }

        return existingProduct;
    }

    async findAll(): Promise<CustRentProduct[]> {
        return this.custRentProductRepository.find({});
    }

    async findOne(id: string): Promise<CustRentProduct> {
        const product = await this.custRentProductRepository.findOne({ _id: id });
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }

    async save(product: CustRentProduct): Promise<CustRentProduct> {
        return this.custRentProductRepository.save(product);
    }
}
