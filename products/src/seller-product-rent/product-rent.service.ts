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
    private readonly sellerProductRentRepository: SellerProductRentRepository,
  ) {}

  async create(createSellerRentProductDto: CreateSellerRentProductDto): Promise<SellerRentProduct> {
    const createdProduct = await this.sellerProductRentRepository.create(createSellerRentProductDto);
    return createdProduct;
  }
  
  async delete(id: string): Promise<void> {
    const product = await this.sellerProductRentRepository.deleteProduct(id);
    if (product === null) {
      throw new NotFoundException('Product not found');
    }
  }

  async update(id: string, updateSellerRentProductDto: CreateSellerRentProductDto): Promise<SellerRentProduct> {
    const existingProduct = await this.sellerProductRentRepository.findByIdAndUpdate(
      id,
      updateSellerRentProductDto,
    );

    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    return existingProduct;
  }

  async findAll(): Promise<SellerRentProduct[]> {
    return this.sellerProductRentRepository.find({});
  }

  async findOne(id: string): Promise<SellerRentProduct> {
    return this.sellerProductRentRepository.findOne({ _id: id });
  }

  async save(product: SellerRentProduct): Promise<SellerRentProduct> {
    const newProduct = new this.sellerRentProductModel(product);
    return newProduct.save();
  }
  

  async remove(id: string): Promise<any> {
    return this.sellerProductRentRepository.deleteProduct(id);
  }
}
