export class UpdateCustomizedProductDto {
    readonly type?: string;
    readonly dimensions?: string;
    readonly color?: string;
    readonly material?: string;
    readonly price?: number;
    readonly quantity?: number;
    readonly downPayment?: number;
    readonly customizing_status?: string;
    // readonly seller_user_id?: string;
    readonly review?: number;
    readonly name?: string;

}
