import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { AddProductsDto } from './dto/add-wishlist.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('wishlist')
export class WishlistController {
    constructor(private readonly wishlistService: WishlistService) {}

    @Post('add-products')
    async addProductsToWishlist(@Body() addProductsDto: AddProductsDto) {
      try {
        const wishlist = await this.wishlistService.createOrUpdateWishlist(addProductsDto);
        return { success: true, wishlist };
      } catch (error) {
        return { success: false, message: error.message };
      }
    }

    @Delete('remove-product')
    async removeProductFromWishlist(@Body('productId') productId: string): Promise<void> {
      await this.wishlistService.removeProductFromWishlist(productId);
    }

    @Get('')
    async getAllWishlists() {
        return this.wishlistService.getAllWishlists();
    }
}
