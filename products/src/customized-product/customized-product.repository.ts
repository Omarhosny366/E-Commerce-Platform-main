import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CustomizedProduct, CustomizedProductDocument } from './schemas/customized-product.schema';

@Injectable()
export class CustomizedProductRepository {
    constructor(@InjectModel(CustomizedProduct.name) private customizedProductModel: Model<CustomizedProductDocument>) {}

    async findOne(productFilterQuery: FilterQuery<CustomizedProduct>): Promise<CustomizedProduct> {
        return this.customizedProductModel.findOne(productFilterQuery);
    }

    async find(productsFilterQuery: FilterQuery<CustomizedProduct>): Promise<CustomizedProduct[]> {
        return this.customizedProductModel.find(productsFilterQuery);
    }

    async create(product: CustomizedProduct): Promise<CustomizedProduct> {
        const newProduct = new this.customizedProductModel(product);
        return newProduct.save();
    }

    async deleteProduct(id: string): Promise<void> {
        await this.customizedProductModel.findByIdAndDelete(id).exec();
    }

    async findOneAndUpdate(productFilterQuery: FilterQuery<CustomizedProduct>, product: Partial<CustomizedProduct>): Promise<CustomizedProduct> {
        return this.customizedProductModel.findOneAndUpdate(productFilterQuery, product, { new: true });
    }

    async save(product: CustomizedProduct): Promise<CustomizedProduct> {
        const newProduct = new this.customizedProductModel(product);
        return newProduct.save();
    }
}
