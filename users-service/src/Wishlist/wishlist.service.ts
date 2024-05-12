import { Injectable, NotFoundException } from '@nestjs/common';
import { AddProductsDto } from './dto/add-wishlist.dto';
import { Wishlist, WishlistDocument } from './schemas/wishlist.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UserSingleton } from 'src/user/UserSingleton';

@Injectable()
export class WishlistService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Wishlist.name) private wishlistModel: Model<WishlistDocument>,
        private readonly userSingleton: UserSingleton, // Inject UserSingleton
    ) {}

    async createWishlist(addProductsDto: AddProductsDto): Promise<Wishlist> {
        try {
            const userId = this.userSingleton.getCurrentUser()?._id;
            if (!userId) {
                throw new Error('User not found with this ID');
            }

            const user = await this.userModel.findById(userId);
            if (!user) {
                throw new NotFoundException('User not found');
            }

            const newWishlist = await this.create({
                ProductID: addProductsDto.ProductID,
                User_id: userId,
            });

            return newWishlist;
        } catch (error) {
            console.error('Error occurred while creating wishlist:', error);
            throw error;
        }
    }

    async addProductsToWishlist(wishlistId: string, productIds: string[]): Promise<WishlistDocument> {
        const wishlist = await this.findWishlistById(wishlistId);
        if (!wishlist) {
            throw new NotFoundException('Wishlist not found');
        }
        return this.addProducts(wishlistId, productIds);
    }

    async removeProductFromWishlist(wishlistId: string, productId: string): Promise<any> {
        const wishlist = await this.findWishlistById(wishlistId);
        if (!wishlist) {
            throw new NotFoundException('Wishlist not found');
        }

        const index = wishlist.ProductID.indexOf(productId);
        if (index > -1) {
            wishlist.ProductID.splice(index, 1);
            if (wishlist.ProductID.length === 0) {
                return await this.deleteWishlistById(wishlistId);
            } else {
                return await this.updateWishlist(wishlist);
            }
        } else {
            throw new NotFoundException('Product not found in wishlist');
        }
    }

    async findUserById(): Promise<User | null> {
        const userId = this.userSingleton.getCurrentUser()?._id;
        if (!userId) {
            throw new Error('User not found with this ID');
        }

        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async create(wishlistDto: Partial<Wishlist>): Promise<Wishlist> {
        const createdWishlist = new this.wishlistModel(wishlistDto);
        return createdWishlist.save();
    }

    async findWishlistById(wishlistId: string): Promise<WishlistDocument | null> {
        return this.wishlistModel.findById(wishlistId).exec();
    }

    async addProducts(wishlistId: string, productIds: string[]): Promise<WishlistDocument> {
        return this.wishlistModel.findByIdAndUpdate(wishlistId,
            { $addToSet: { ProductID: { $each: productIds } } },
            { new: true }).exec();
    }

    async deleteWishlistById(wishlistId: string): Promise<WishlistDocument | null> {
        return this.wishlistModel.findByIdAndDelete(wishlistId).exec();
    }

    async updateWishlist(wishlist: WishlistDocument): Promise<WishlistDocument> {
        return wishlist.save();
    }
}
