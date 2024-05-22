import { BadRequestException, Inject, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { AddProductsDto } from './dto/add-wishlist.dto';
import { Wishlist, WishlistDocument } from './schemas/wishlist.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UserSingleton } from 'src/user/UserSingleton';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class WishlistService implements OnModuleInit {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Wishlist.name) private wishlistModel: Model<WishlistDocument>,
        private readonly userSingleton: UserSingleton,
        @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    ) {}

    async onModuleInit() {
        const topics = [
            'get.product.price', 'get.product.mat', 'get.product.type',
            'get.product.dimm', 'get.product.qua', 'get.product.name',
            'get.product.pricee', 'get.product.matt', 'get.product.typee',
            'get.product.dimmm', 'get.product.quaa', 'get.product.namee',
        ];

        topics.forEach(topic => this.kafkaClient.subscribeToResponseOf(topic));
        await this.kafkaClient.connect();
    }

    private async fetchProductInfo(topic: string, productId: string) {
        try {
            return await this.kafkaClient.send(topic, { productId }).toPromise();
        } catch (error) {
            console.error(`Error fetching product info from ${topic}:`, error);
            throw new BadRequestException('Error fetching product info');
        }
    }

    async getProductQuantity(productId: string): Promise<number> {
        try {
            const response = await this.fetchProductInfo('get.product.qua', productId);
            return response.quantity;
        } catch (error) {
            const response = await this.fetchProductInfo('get.product.quaa', productId);
            return response.quantity;
        }
    }

    async getProductName(productId: string): Promise<string> {
        try {
            const response = await this.fetchProductInfo('get.product.name', productId);
            return response.name;
        } catch (error) {
            const response = await this.fetchProductInfo('get.product.namee', productId);
            return response.name;
        }
    }

    async getProductPrice(productId: string): Promise<number> {
        try {
            const response = await this.fetchProductInfo('get.product.price', productId);
            return response.price;
        } catch (error) {
            const response = await this.fetchProductInfo('get.product.pricee', productId);
            return response.price;
        }
    }

    async getProductType(productId: string): Promise<string> {
        try {
            const response = await this.fetchProductInfo('get.product.type', productId);
            return response.type;
        } catch (error) {
            const response = await this.fetchProductInfo('get.product.typee', productId);
            return response.type;
        }
    }

    async getProductMaterial(productId: string): Promise<string> {
        try {
            const response = await this.fetchProductInfo('get.product.mat', productId);
            return response.material;
        } catch (error) {
            const response = await this.fetchProductInfo('get.product.matt', productId);
            return response.material;
        }
    }

    async getProductDimensions(productId: string): Promise<string> {
        try {
            const response = await this.fetchProductInfo('get.product.dimm', productId);
            return response.dimensions;
        } catch (error) {
            const response = await this.fetchProductInfo('get.product.dimmm', productId);
            return response.dimensions;
        }
    }

    private async getProductInfo(productId: string) {
        const [price, quantity, type, material, dimensions, name] = await Promise.all([
            this.getProductPrice(productId),
            this.getProductQuantity(productId),
            this.getProductType(productId),
            this.getProductMaterial(productId),
            this.getProductDimensions(productId),
            this.getProductName(productId),  // Added name to the promise array
        ]);

        return { productId, price, quantity, type, material, dimensions, name };
    }

    async getAllWishlists(): Promise<any[]> {
        try {
            const wishlists = await this.wishlistModel.find().exec();
            const wishlistsWithProductInfo = await Promise.all(
                wishlists.map(async (wishlist) => {
                    const productsWithInfo = await Promise.all(
                        wishlist.ProductID.map((productId) => this.getProductInfo(productId))
                    );
                    return { ...wishlist.toObject(), products: productsWithInfo };
                })
            );
            return wishlistsWithProductInfo;
        } catch (error) {
            console.error('Error occurred while fetching all wishlists:', error);
            throw new BadRequestException(error.message);
        }
    }

    async createOrUpdateWishlist(addProductsDto: AddProductsDto): Promise<WishlistDocument> {
        try {
            const userId = this.userSingleton.getCurrentUser()?._id;
            if (!userId) {
                throw new Error('User not found with this ID');
            }

            const user = await this.userModel.findById(userId);
            if (!user) {
                throw new NotFoundException('User not found');
            }

            let wishlist = await this.wishlistModel.findOne({ User_id: userId });

            if (!wishlist) {
                wishlist = await this.wishlistModel.create({
                    ProductID: addProductsDto.ProductID,
                    User_id: userId,
                });
            } else {
                const newProductIds = addProductsDto.ProductID;
                const existingProductIds = wishlist.ProductID;

                for (let id of newProductIds) {
                    if (existingProductIds.includes(id)) {
                        throw new BadRequestException(`Product ${id} is already in the wishlist.`);
                    }
                }

                wishlist.ProductID.push(...newProductIds);
                await wishlist.save();
            }

            return wishlist;
        } catch (error) {
            console.error('Error occurred while handling wishlist:', error);
            throw new BadRequestException(error.message);
        }
    }

    async removeProductFromWishlist(productId: string): Promise<any> {
        const userId = this.userSingleton.getCurrentUser()?._id;
        if (!userId) {
            throw new NotFoundException('User ID not available');
        }

        const wishlist = await this.wishlistModel.findOne({ User_id: userId });
        if (!wishlist) {
            throw new NotFoundException('Wishlist not found for the user');
        }

        const index = wishlist.ProductID.indexOf(productId);
        if (index > -1) {
            wishlist.ProductID.splice(index, 1);
            if (wishlist.ProductID.length === 0) {
                return await this.deleteWishlist(wishlist._id); // Adjusted to direct function call
            } else {
                return await wishlist.save();
            }
        } else {
            throw new NotFoundException('Product not found in wishlist');
        }
    }
    async deleteWishlist(wishlistId: string): Promise<WishlistDocument | null> {
        return this.wishlistModel.findByIdAndDelete(wishlistId).exec();
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
