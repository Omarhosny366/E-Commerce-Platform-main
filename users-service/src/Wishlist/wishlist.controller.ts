import { Body, Controller, HttpCode, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { AddProductsDto } from './dto/add-wishlist.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('wishlist')
export class WishlistController {
    constructor(private readonly wishlistService: WishlistService) {}

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async createWishlist(@Body() addProductsDto: AddProductsDto) {
        try {
            return await this.wishlistService.createWishlist(addProductsDto);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('add-products/:wishlistId')
    @HttpCode(HttpStatus.OK)
    async addProductsToWishlist(@Param('wishlistId') wishlistId: string, @Body() productIds: string[]) {
        try {
            return await this.wishlistService.addProductsToWishlist(wishlistId, productIds);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('remove-product/:wishlistId')
    @HttpCode(HttpStatus.OK)
    async removeProductFromWishlist(@Param('wishlistId') wishlistId: string, @Body() productId: string) {
        try {
            return await this.wishlistService.removeProductFromWishlist(wishlistId, productId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
