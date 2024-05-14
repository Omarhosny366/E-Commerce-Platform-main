import { Controller, Get, Post, Delete, Param, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddAddressDto } from './dto/add-address.dto';
import { Address } from './schemas/address.schema';

@Controller('addresses')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    async addAddress(@Body() addAddressDto: AddAddressDto): Promise<{ message: string }> {
        return await this.addressService.addAddress(addAddressDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllAddressesByUserId(): Promise<Address[]> {
        return await this.addressService.getAllAddressesByUserId();
    }

    @Delete(':addressId')
    @HttpCode(HttpStatus.OK)
    async deleteAddressIdFromUser(@Param('addressId') addressId: string): Promise<void> {
        await this.addressService.deleteAddressIdFromUser(addressId);
    }

    @Get(':addressId/belongsToUser')
    @HttpCode(HttpStatus.OK)
    async addressBelongsToUser(@Param('addressId') addressId: string): Promise<boolean> {
        return await this.addressService.addressBelongsToUser(addressId);
    }
}
