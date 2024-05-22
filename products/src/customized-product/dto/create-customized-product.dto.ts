export class CreateCustomizedProductDto {
    readonly type: string;
    readonly dimensions?: string;
    readonly color?: string;
    readonly material?: string;
    readonly price: number;
    readonly quantity: number;
    readonly downPayment: number;
    readonly customizing_status: string;
    readonly user_id: string; // customer
    readonly review: number;
}
