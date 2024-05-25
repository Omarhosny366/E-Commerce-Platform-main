import { Controller, Get, Post, Delete, Param, HttpCode, HttpStatus, Body, NotFoundException } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddAddressDto } from './dto/add-address.dto';
import { Address } from './schemas/address.schema';
import { MessagePattern, Payload } from '@nestjs/microservices';

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
    async deleteAddressById(@Param('addressId') addressId: string): Promise<void> {
        try {
            await this.addressService.deleteAddressById(addressId);
        } catch (error) {
            throw new Error('Failed to delete address: ${error.message}');
        }
    }

    @Get(':addressId/belongsToUser')
    @HttpCode(HttpStatus.OK)
    async addressBelongsToUser(@Param('addressId') addressId: string): Promise<boolean> {
        return await this.addressService.addressBelongsToUser(addressId);
    }

    
    @MessagePattern('get.address')
    async handleAddressReq(@Payload() message: any) {
      console.log('Received message:', message); // Log the incoming message
    
      try {
        const { addressId } = message.value; // Extract addressId from message.value
    
        if (!addressId) {
          throw new Error('Invalid message format: addressId is missing');
        }
    
        const addressDetails = await this.addressService.getAddressById(addressId);
        if (!addressDetails) {
          throw new NotFoundException(`Address with id ${addressId} not found`);
        }
    
        return {
          buildingNumber: addressDetails.buildingNumber,
          buildingType: addressDetails.buildingType,
          city: addressDetails.city,
          flatNumber: addressDetails.flatNumber,
          floor: addressDetails.floor,
          street: addressDetails.street,
        };
      } catch (error) {
        console.error('Error handling address request:', error.message);
        throw error;
      }
    }
    

}
