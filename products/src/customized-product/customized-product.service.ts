import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomizedProduct } from './schemas/customized-product.schema';
import { CreateCustomizedProductDto } from './dto/create-customized-product.dto';
import { UpdateCustomizedProductDto } from './dto/update-customized-product.dto';
import { CustomizedProductRepository } from './customized-product.repository';

@Injectable()
export class CustomizedProductService {
    constructor(private readonly customizedProductRepository: CustomizedProductRepository) {}

    async create(createCustomizedProductDto: CreateCustomizedProductDto): Promise<CustomizedProduct> {
        return this.customizedProductRepository.create(createCustomizedProductDto);
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
