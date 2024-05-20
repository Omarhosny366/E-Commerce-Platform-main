import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { CustRentProduct, CustRentProductDocument } from "./schemas/cust-rent-product.schema";

@Injectable()
export class CustRentProductRepository {
    constructor(@InjectModel(CustRentProduct.name) private custRentProductModel: Model<CustRentProductDocument>) {}

    async findById(id: string): Promise<CustRentProduct | null> {
        return this.custRentProductModel.findById(id);
      }

    async findOne(productFilterQuery: FilterQuery<CustRentProduct>): Promise<CustRentProduct> {
        return this.custRentProductModel.findOne(productFilterQuery);
    }

    async find(productsFilterQuery: FilterQuery<CustRentProduct>): Promise<CustRentProduct[]> {
        return this.custRentProductModel.find(productsFilterQuery)
    }

    async create(product: CustRentProduct): Promise<CustRentProduct> {
        const newProduct = new this.custRentProductModel(product);
        return newProduct.save()
    }

    async deleteProduct(id: string): Promise<void> {
        await this.custRentProductModel.findByIdAndDelete(id).exec();
    }

    async findOneAndUpdate(productFilterQuery: FilterQuery<CustRentProduct>, product: Partial<CustRentProduct>): Promise<CustRentProduct> {
        return this.custRentProductModel.findOneAndUpdate(productFilterQuery, product, { new: true });
    }

    async findByIdAndUpdate(id: string, product: Partial<CustRentProduct>): Promise<CustRentProduct> {
        return this.custRentProductModel.findByIdAndUpdate(id, product, { new: true });
    }

    async save(product: CustRentProduct): Promise<CustRentProduct> {
        const newProduct = new this.custRentProductModel(product);
        return newProduct.save();
      }
}

export default CustRentProductRepository;
