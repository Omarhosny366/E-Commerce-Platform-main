import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";

import { SellerRentProduct, SellerRentProductDocument } from "./schemas/product.schema";

@Injectable()
export class SellerProductRentRepository {
    constructor(@InjectModel(SellerRentProduct.name) private productRentModel: Model<SellerRentProductDocument>) {}

    async findOne(productFilterQuery: FilterQuery<SellerRentProduct>): Promise<SellerRentProduct> {
        return this.productRentModel.findOne(productFilterQuery);
    }

    async find(productsFilterQuery: FilterQuery<SellerRentProduct>): Promise<SellerRentProduct[]> {
        return this.productRentModel.find(productsFilterQuery)
    }

    async create(product: SellerRentProduct): Promise<SellerRentProduct> {
        const newProduct = new this.productRentModel(product);
        return newProduct.save()
    }

    async deleteProduct(id: string): Promise<void> {
        await this.productRentModel.findByIdAndDelete(id).exec();
    }

    async findOneAndUpdate(productFilterQuery: FilterQuery<SellerRentProduct>, product: Partial<SellerRentProduct>): Promise<SellerRentProduct> {
        return this.productRentModel.findOneAndUpdate(productFilterQuery, product, { new: true });
    }

    async findByIdAndUpdate(id: string, product: Partial<SellerRentProduct>): Promise<SellerRentProduct> {
        return this.productRentModel.findByIdAndUpdate(id, product, { new: true });
    }
}

export default SellerProductRentRepository;