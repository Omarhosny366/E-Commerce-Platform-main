import { Injectable, NotFoundException } from '@nestjs/common';
import { AddAddressDto } from './dto/add-address.dto';
import { User, UserDocument } from '../user/schemas/user.schema';
import { Address, AddressDocument } from './schemas/address.schema';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSingleton } from '../user/UserSingleton';

@Injectable()
export class AddressService {
    constructor(
        @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly userSingleton: UserSingleton, // Inject UserSingleton
    ) {}

    async addAddress(addAddressDto: AddAddressDto): Promise<{ message: string }> {
        const userId = this.userSingleton.getCurrentUser()?._id;
        if (!userId) {
            throw new Error('User not found with this ID');
        }
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const address = await this.addressModel.create({
            ...addAddressDto,
            User_id: userId,
        });
        user.address_Id = user.address_Id || [];
        user.address_Id.push(address._id);
        await user.save();
        return { message: "Address added successfully and user updated." };
    }

    async getAllAddressesByUserId(): Promise<Address[]> {
        const userId = this.userSingleton.getCurrentUser()?._id;
        if (!userId) {
            throw new Error('User not found with this ID');
        }
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const addresses = await this.addressModel.find({ User_id: userId }).exec();
        if (addresses.length === 0) {
            throw new NotFoundException(`No addresses found for this user`);
        }
        return addresses;
    }

    async deleteAddressIdFromUser(addressId: string): Promise<void> {
        const userId = this.userSingleton.getCurrentUser()?._id;
        if (!userId) {
            throw new Error('User not found with this ID');
        }
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const index = user.address_Id.indexOf(addressId);
        if (index !== -1) {
            user.address_Id.splice(index, 1);
            await user.save();
        }
    }

    async addressBelongsToUser(addressId: string): Promise<boolean> {
        const userId = this.userSingleton.getCurrentUser()?._id;
        if (!userId) {
            throw new Error('User not found with this ID');
        }
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const address = await this.addressModel.findOne({ _id: addressId, User_id: userId }).exec();
        return !!address;
    }
    async getAddressById(addressId: string): Promise<Address> {
        const address = await this.addressModel.findById(addressId).exec();
        if (!address) {
          throw new NotFoundException(`Address with id ${addressId} not found`);
        }
        return address;
      }
}
