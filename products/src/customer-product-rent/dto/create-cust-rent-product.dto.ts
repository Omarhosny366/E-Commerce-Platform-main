export class CreateCustRentProductDto {
    readonly type: string;
    readonly dimensions: string;
    readonly color: string;
    readonly material: string;
    readonly price: number;
    readonly quantity: number;
    readonly start_date: Date;
    readonly duration: number;
    readonly end_date: Date;
    readonly review: number;
  }
  