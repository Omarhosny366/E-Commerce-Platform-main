import { IsNotEmpty } from "class-validator";

export class AddAddressDto {
    @IsNotEmpty()
    city: string;
    @IsNotEmpty()
    street: string;
    @IsNotEmpty()
    buildingNumber: string;
    @IsNotEmpty()
    floor: string;
    @IsNotEmpty()
    flatNumber: string;
    @IsNotEmpty()
    buildingType: string;
}
