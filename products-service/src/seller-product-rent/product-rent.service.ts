import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SellerRentProduct, SellerRentProductDocument } from './schemas/product.schema';
import { CreateSellerRentProductDto } from './dto/create-product-rent.dto';
import { SellerProductRentRepository } from './product-rent.repository';

@Injectable()
export class SellerRentProductService {
  constructor(
    @InjectModel(SellerRentProduct.name) private sellerRentProductModel: Model<SellerRentProductDocument>,
  private readonly sellerProductRentRepository: SellerProductRentRepository, // Add this line
) {}

  async create(createSellerRentProductDto: CreateSellerRentProductDto): Promise<SellerRentProduct> {
    const createdSellerRentProduct = new this.sellerRentProductModel(createSellerRentProductDto);
    return createdSellerRentProduct.save();
  }
  
  async delete(id: string): Promise<void> {
    const product = await this.sellerProductRentRepository.deleteProduct(id);
    if (product === null) {
      throw new NotFoundException('Product not found');
    }
  }

  async update(id: string, updateSellerRentProductDto: CreateSellerRentProductDto): Promise<SellerRentProduct> {
    const existingProduct = await this.sellerRentProductModel.findByIdAndUpdate(
      id,
      updateSellerRentProductDto,
      { new: true },
    ).exec();

    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    return existingProduct;
  }

  async findAll(): Promise<SellerRentProduct[]> {
    return this.sellerRentProductModel.find().exec();
  }

  async findOne(id: string): Promise<SellerRentProduct> {
    return this.sellerRentProductModel.findById(id).exec();
  }

  async remove(id: string): Promise<any> {
    return this.sellerRentProductModel.findByIdAndDelete(id).exec();
  }
}
