import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CustPurchaseProduct, CustPurchaseProductDocument } from './schemas/cust-purchase-product.schema';

@Injectable()
export class CustPurchaseProductRepository {
    constructor(@InjectModel(CustPurchaseProduct.name) private custPurchaseProductModel: Model<CustPurchaseProductDocument>) {}

    async findOne(productFilterQuery: FilterQuery<CustPurchaseProduct>): Promise<CustPurchaseProduct> {
        return this.custPurchaseProductModel.findOne(productFilterQuery);
    }
    async findById(id: string): Promise<CustPurchaseProduct | null> {
        return this.custPurchaseProductModel.findById(id);
      }
    async find(productsFilterQuery: FilterQuery<CustPurchaseProduct>): Promise<CustPurchaseProduct[]> {
        return this.custPurchaseProductModel.find(productsFilterQuery);
    }

    async create(product: CustPurchaseProduct): Promise<CustPurchaseProduct> {
        const newProduct = new this.custPurchaseProductModel(product);
        return newProduct.save();
    }

    async deleteProduct(id: string): Promise<void> {
        await this.custPurchaseProductModel.findByIdAndDelete(id).exec();
    }

    async findOneAndUpdate(productFilterQuery: FilterQuery<CustPurchaseProduct>, product: Partial<CustPurchaseProduct>): Promise<CustPurchaseProduct> {
        return this.custPurchaseProductModel.findOneAndUpdate(productFilterQuery, product, { new: true });
    }

    async save(product: CustPurchaseProduct): Promise<CustPurchaseProduct> {
        const newProduct = new this.custPurchaseProductModel(product);
        return newProduct.save();
    }
}